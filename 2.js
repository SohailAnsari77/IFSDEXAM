const { MongoClient } = require('mongodb');
const prompt = require('prompt-sync')();

// MongoDB connection URI
const uri = 'mongodb+srv://sohailabsc22:12345@sohail.tbxptv3.mongodb.net/see?retryWrites=true&w=majority';

// Database and collection names
const databaseName = 'see';
const collectionName = 'exam';

// Function to connect to MongoDB
async function connectToMongoDB() {
  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);
    return collection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Function to close the MongoDB connection
async function closeMongoDBConnection(client) {
  try {
    await client.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
}

// Function to create an animal document
async function createAnimal(animal) {
  const collection = await connectToMongoDB();
  try {
    const result = await collection.insertOne(animal);
    console.log('Animal created:', result.insertedId);
  } catch (error) {
    console.error('Error creating animal:', error);
  } finally {
    await closeMongoDBConnection(collection.client);
  }
}

// Function to read all animal documents
async function readAnimals() {
  const collection = await connectToMongoDB();
  try {
    const animals = await collection.find({}).toArray();
    console.log('Animals:');
    console.log(animals);
  } catch (error) {
    console.error('Error reading animals:', error);
  } finally {
    await closeMongoDBConnection(collection.client);
  }
}

// Function to update an animal document
async function updateAnimal(id, updatedAnimal) {
  const collection = await connectToMongoDB();
  try {
    const result = await collection.updateOne({ _id: id }, { $set: updatedAnimal });
    console.log('Animal updated:', result.modifiedCount);
  } catch (error) {
    console.error('Error updating animal:', error);
  } finally {
    await closeMongoDBConnection(collection.client);
  }
}

// Function to delete an animal document
async function deleteAnimal(id) {
  const collection = await connectToMongoDB();
  try {
    const result = await collection.deleteOne({ _id: id });
    console.log('Animal deleted:', result.deletedCount);
  } catch (error) {
    console.error('Error deleting animal:', error);
  } finally {
    await closeMongoDBConnection(collection.client);
  }
}

// Function to prompt user for animal data
function promptForAnimalData() {
  const name = prompt('Enter the animal name: ');
  const species = prompt('Enter the animal species: ');
  const age = parseInt(prompt('Enter the animal age: '));

  return { name, species, age };
}

// Example usage:

async function run() {
  while (true) {
    console.log('Select an operation:');
    console.log('1. Create an animal');
    console.log('2. Read all animals');
    console.log('3. Update an animal');
    console.log('4. Delete an animal');
    console.log('5. Exit');
    const operation = parseInt(prompt('Enter the operation number: '));

    switch (operation) {
      case 1:
        const newAnimal = promptForAnimalData();
        await createAnimal(newAnimal);
        break;
      case 2:
        await readAnimals();
        break;
      case 3:
        const animalIdToUpdate = prompt('Enter the ID of the animal to update: ');
        const updatedAnimal = promptForAnimalData();
        await updateAnimal(animalIdToUpdate, updatedAnimal);
        break;
      case 4:
        const animalIdToDelete = prompt('Enter the ID of the animal to delete: ');
        await deleteAnimal(animalIdToDelete);
        break;
      case 5:
        return; // Exit the program
      default:
        console.log('Invalid operation number. Please try again.');
        break;
    }
  }
}

run();
