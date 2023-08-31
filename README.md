# Firebase Firestore import

Imports data from Apify dataset to Firebase Firestore collection.
Each items is imported as a new document in the collection.

## Input settings
- **apiKey**:string - Firebase API key
- **authDomain**:string - Firebase auth domain
- **projectId**:string - Firebase project ID
- **firestoreCollectionId**:string - Firestore collection ID
- **datasetId**:string - Apify dataset ID
- **transformFunction**:string (optional) - Function code in TypeScript/JavaScript that transforms the data before import. It must be an anonymous function that accepts a single parameter and returns the transformed value. See [example] ( 
```javascript
(data) => {
    data.newField = 'new value';
    return data;
}
```
or
```javascript
function(data) {
    data.newField = 'new value';
    return data;
}
```
) for more details.










