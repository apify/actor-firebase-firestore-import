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

// Batch size for adding items to Firestore collection
// const BATCH_SIZE = 1000;

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
    throw new Error(`Dataset ${datasetId} does not exist or is empty!`);
}
const datesetSize = datasetInfo.itemCount;

// Get Firestore collection reference
log.info('Opening Firestore collection', { firestoreCollectionId });
const collectionRef = collection(db, firestoreCollectionId);

// Prepare and check transform function
// eslint-disable-next-line no-eval
const transformFunctionEvaluated = transformFunction && eval(transformFunction);
// Check if transform function is correctly defined
if (typeof transformFunctionEvaluated !== 'function') {
    throw new Error('Transform function is not correctly defined! The specification of the transform function is available in the README.');
}

log.info('Importing items to Firestore collection', { datesetSize });

// 10 log indexes equaly spreded in dataset
const logIndexes = Array.from({ length: 10 }, (_, i) => Math.floor((datesetSize / 10) * i));
log.info('Log indexes', { logIndexes });

// Add all items from dataset to Firestore collection, log every 10% of items
await dataset.forEach(async (item, index) => {
    log.info('Importing item', { index });

    // apply transform function if defined
    if (transformFunctionEvaluated) {
        item = await transformFunctionEvaluated(item);
    }
    await addDoc(collectionRef, item);

    // log progress
    if (logIndexes.includes(index)) {
        const progressPercent = Math.round((index / datesetSize) * 100);
        log.info('Imported progress:', { progressPercent });
    }
});

/*
// Add all items from dataset to Firestore collection in batches
for (let i = 0; i < datesetSize; i += BATCH_SIZE) {
    // load batch of items from dataset
    const datasetData = await dataset.getData({
        offset: i,
        limit: BATCH_SIZE,
    });

    // add batch of items to Firestore collection
    for (let item of datasetData.items) {
        // transform item if transform function is defined
        if (transformFunctionEvaluated) {
            item = await transformFunctionEvaluated(item);
        }
        await addDoc(collectionRef, item);
    }
}
*/

log.info(`Import finished successfully ✅`);

await Actor.exit();
