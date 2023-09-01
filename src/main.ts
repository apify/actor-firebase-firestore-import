// Apify SDK - toolkit for building Apify Actors (Read more at https://docs.apify.com/sdk/js/)
import { Actor, log } from 'apify';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';

// Input interface describes shape of input data that actor expects
interface IInput extends Record<string, unknown> {
    apiKey: string;
    authDomain: string;
    projectId: string;
    firestoreCollectionId: string;
    datasetId: string;
    transformFunction?: string;
}

// The init() call configures the Actor for its environment. It's recommended to start every Actor with an init()
await Actor.init();

// Get input of the actor
const input = await Actor.getInput<IInput>();
if (!input) {
    throw new Error('Input is missing!');
}
const { apiKey, authDomain, projectId, firestoreCollectionId, datasetId, transformFunction } = input;

// Initialize firebase app
const app = initializeApp({
    apiKey,
    authDomain,
    projectId,
});

// Get Firestore instance
const db = getFirestore(app);

// Open dataset
log.info('Opening dataset', { datasetId });
const dataset = await Actor.openDataset(datasetId, { forceCloud: true });
const datasetInfo = await dataset.getInfo();

// Check if dataset exists and is not empty
if (!datasetInfo || !datasetInfo.itemCount) {
    const message = 'Dataset does not exist or is empty!';
    log.error(message, { datasetId });
    throw new Error(message);
}
const datesetSize = datasetInfo.itemCount;

// Get Firestore collection reference
log.info('Opening Firestore collection', { firestoreCollectionId });
const collectionRef = collection(db, firestoreCollectionId);

// Prepare and check transform function
// eslint-disable-next-line no-eval
const transformFunctionEvaluated = transformFunction && eval(transformFunction);
// Check if transform function is correctly defined
if (transformFunctionEvaluated && typeof transformFunctionEvaluated !== 'function') {
    const message = 'Transform function is not correctly defined! The specification of the transform function is available in the README.';
    log.error(message, { transformFunction });
    throw new Error(message);
}

// 10 log indexes equally distributed across the dataset
const logIndexes = Array.from({ length: 10 }, (_, i) => Math.floor((datesetSize / 10) * (i + 1) - 1));

log.info('Importing items to Firestore collection', { datesetSize });

// const BATCH_SIZE = 500;

// start timer
const startTime = Date.now();
/*
for (let i = 0; i < datesetSize; i += BATCH_SIZE) {
    // Add all items from dataset to Firestore collection, log every 10% of items
    await dataset.forEach(async (item, index) => {
        // apply transform function if defined
        if (transformFunctionEvaluated) {
            item = await transformFunctionEvaluated(item);
        }
        await addDoc(collectionRef, item);

        // log progress
        if (logIndexes.includes(index)) {
            const progressPercent = Math.round(((index + 1) / datesetSize) * 100);
            log.info(`Import progress: ${progressPercent}%`);
        }
    }, {
        offset: i,
        limit: BATCH_SIZE,
    });
}
*/

await dataset.forEach(async (item, index) => {
    // apply transform function if defined
    if (transformFunctionEvaluated) {
        item = await transformFunctionEvaluated(item);
    }
    await addDoc(collectionRef, item);

    // log progress
    if (logIndexes.includes(index)) {
        const progressPercent = Math.round(((index + 1) / datesetSize) * 100);
        log.info(`Import progress: ${progressPercent}%`);
    }
});

// end timer
const endTime = Date.now();
const duration = (endTime - startTime) / 1000;
log.info(`Import to Firebase Firestore finished successfully ✅`);
log.info(`Imported ${datesetSize} items in ${duration} seconds`);

await Actor.exit();
