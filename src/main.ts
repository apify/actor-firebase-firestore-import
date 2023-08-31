// Apify SDK - toolkit for building Apify Actors (Read more at https://docs.apify.com/sdk/js/)
import { Actor } from "apify";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';

// Input interface describes shape of input data that actor expects
interface IInput extends Record<string, any>{
    apiKey: string;
    authDomain: string;
    projectId: string;
    firestoreCollectionId: string;
    datasetId: string;
    transformFunction?: string;
} 

// Batch size for adding items to Firestore collection
const BATCH_SIZE = 1000;

// The init() call configures the Actor for its environment. It's recommended to start every Actor with an init()
await Actor.init();

// Get input of the actor
const input = await Actor.getInput<IInput>();
if(!input){
    await Actor.exit();
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

// Get dataset
console.log(`Opening dataset: ${datasetId}`);
const dataset = await Actor.openDataset(datasetId, { forceCloud: true });
const datasetInfo = await dataset.getInfo();
if(!datasetInfo){
    await Actor.exit();
    throw new Error('Dataset info is missing!');
} 
const datesetSize = datasetInfo.itemCount;

// Get Firestore collection reference
console.log(`Opening Firestore collection: ${firestoreCollectionId}`);
const collectionRef = collection(db, firestoreCollectionId);

// Prepare and check transform function
const transformFunctionEvaluated = transformFunction && eval(transformFunction);
// Check if transform function is correctly defined
if (typeof transformFunctionEvaluated != 'function') {
    await Actor.exit();
    throw new Error('Transform function is not correctly defined! The specification of the transform function is available in the README.');
}

console.log(`Importing ${datesetSize} items to Firestore collection`);
// Add all items from dataset to Firestore collection in batches
for (let i = 0; i < datesetSize; i += BATCH_SIZE) {
    // load batch of items from dataset
    const datasetData = await dataset.getData({
        offset: i,
        limit: BATCH_SIZE,
    })

    // add batch of items to Firestore collection
    for (let item of datasetData.items) {
        // transform item if transform function is defined
        if (transformFunctionEvaluated) {
            item = await transformFunctionEvaluated(item);
        }
        await addDoc(collectionRef, item);
    }
}

console.log(`Import finished successfully ✅`);

await Actor.exit();