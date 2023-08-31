
# 🔥 Firebase Firestore Data Import  

Import data from your Apify dataset into your Firebase Firestore collection! Each item will be transformed into a new document within the specified collection.

## 🛠️ Input Settings

List of input settings for the actor. You can also look into the input tab.
- **apiKey**: Your Firebase API key 🔑
- **authDomain**: Your Firebase authentication domain 🔒
- **projectId**: Your Firebase project ID 🏢
- **firestoreCollectionId**: The ID of the Firestore collection where you want to import the data 🗂️
- **datasetId**: The ID of the Apify dataset you're importing from 📊
- **transformFunction**: An optional custom transformation function, see [below 👇](#transformation-function) 

### Transformation Function 
You can optionally apply a transformation to your data before importing it. Use TypeScript/JavaScript to mold your data exactly how you need it! It must be an anonymous function that accepts a single parameter and returns the transformed value. Here are some examples:
```javascript
function(data) {
    // Customize your data transformation
    data.newField = 'new value';
    return data;
}
```
or
```javascript
(data) => {
    // Another example of data transformation using arrow function
    data.newField = 'new value';
    return data;
}
```

## 🚀 Let's Get Started!
With these settings, your data will seamlessly flow from your Apify dataset into your Firebase Firestore collection. Use it manually or integrate it with another actor (for example via [Apify's Webhooks](https://docs.apify.com/platform/integrations/webhooks)) to automate the process).




