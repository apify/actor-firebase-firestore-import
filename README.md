# Apify Firestore Import Actor

The **Apify Firestore Import Actor** is a powerful tool designed to simplify the process of transferring data from an Apify dataset into a Firebase Firestore collection. This actor streamlines the task by seamlessly converting each item in your dataset into a new document within your specified Firestore collection. Whether you're working with a small dataset or a massive one, this actor offers a convenient solution for efficiently importing and organizing your data.

## Getting Started 🏁

To use the Apify Firestore Import Actor, you need to provide the necessary configuration parameters, such as your Firebase credentials and the target Firestore collection. Once configured, the actor will handle the data transformation and import process automatically. This allows you to focus on your data analysis and application development, rather than spending time on manual data migration.

## What is Firebase? 🔥

**Firebase** is a comprehensive mobile and web application development platform powered by Google. It offers a wide range of tools and services to help developers build high-quality apps, including authentication, real-time database, cloud storage, and more. Firebase is known for its scalability, reliability, and ease of use, making it a popular choice for building modern applications.

## What is Firestore? 📝

**Firestore** is a NoSQL cloud-based database service provided by Firebase. It is designed to store and manage data in a flexible, scalable, and secure manner. Firestore offers real-time data synchronization, offline support, and automatic scaling, making it an excellent choice for applications that require dynamic and responsive data handling. Firestore's document-oriented data model, combined with its seamless integration with Firebase, makes it a powerful tool for developers to build real-time, collaborative applications.


## Input settings

The actor accepts the following input settings:

| **Field Name**                 | **Description**                                                                                                                                                                                                                                                                                                        |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apiKey`                       | Your API key to Firebase. It can be found in Firebase console under **Project settings** -> **General** -> **Web API key**.                                                                                                                                                                                            |
| `authDomain`                   | Your auth domain to Firebase. It can be found in Firebase console under **Project settings** -> **Add app** -> **Web app** -> **Register app** -> **Code snippet** -> **Code snippet**.                                                                                                                                |
| `projectId`                    | Your project ID to Firebase. It can be found in Firebase console under **Project settings** -> **General** -> **Project ID**.                                                                                                                                                                                          |
| `firestoreCollectionId`        | Firestore collection ID to import data to. It can be found in Firebase console under **Firestore Database** -> **Data**. Ensure that the FireStore permissions are set to allow read and write. If the collection does not exist, it will be created.                                                                  |
| `datasetId`                    | Dataset ID in Apify to import data from. It can be found in Apify console under **Storage** -> **Datasets** -> **Dataset ID**.                                                                                                                                                                                         |
| `customIdField` (optional)     | Name of the field in the dataset to use as the document ID in Firestore. If not specified, Firestore will automatically generate a unique ID for each document. Note that this field must be unique for each item in the dataset or the document will be overwritten. It is applied after the transformation function. |
| `transformFunction` (optional) | An optional custom transformation function to apply to the data before importing it. To learn more about this, see [below](#transformation-function).                                                                                                                                                                  |



## Transformation Function

You can optionally apply a custom transformation to your data before importing it. The transformation function should be written in TypeScript or JavaScript and should accept a single parameter (the data item) and return the transformed value. Here are some examples:

```typescript
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

# How to Use the Firebase Firestore Import Actor 🌟

To unleash the power of the **Firebase Firestore Import Actor**, follow these straightforward steps:

1. 🔹 Click on "Try for Free" to kickstart your journey with this actor.
2. 📝 Enter your Firebase API key, authentication domain, project ID, Firestore collection ID, and Apify dataset ID in the input settings.
3. ⚙️ Optionally, provide a custom transformation function if needed or specify a custom ID field to serve as the document ID in Firestore.
4. 🏃‍♂️ Click on "Run" to initiate the import process.
5. 🎉 That's it! Sit back and relax while the actor works its magic. Once the actor finishes processing the data, you can view the data in your Firestore collection.

## Results 📦

The Firebase Firestore Import Actor will import each item in the Apify dataset as a new document within the specified Firestore collection. The exact structure of these resulting documents will depend on the data in the dataset and any custom transformations applied. The IDs of the documents will be automatically generated by Firestore, unless a custom ID field is specified.

## Tips for Maximizing the Firebase Firestore Import Actor 🚀

- 💡 **Tip 1**: Ensure you've configured the necessary permissions and credentials in Firebase to access the Firestore collection and perform the import.
- 💡 **Tip 2**: Prior to running the actor on your entire dataset, test it with a small dataset or a subset of your data to confirm everything works like a charm.
- 💡 **Tip 3**: Elevate your automation game by integrating this actor with another (e.g., via [Apify's Webhooks](https://docs.apify.com/platform/integrations/webhooks)) to streamline the process.



