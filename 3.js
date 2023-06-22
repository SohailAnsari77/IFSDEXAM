const mongoose = require('mongoose');
const prompt = require('prompt-sync')();

// MongoDB connection URI
const uri = 'mongodb+srv://sohailabsc22:12345@sohail.tbxptv3.mongodb.net/see?retryWrites=true&w=majority'; // Replace with your MongoDB connection URI

// Animal Schema
const animalSchema = new mongoose.Schema({
  name: String,
  species: String,
  age: Number
});

// Animal Model
const Animal = mongoose.model('Animal', animalSchema);

// Function to connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Function to create an animal document
async function createAnimal(animal) {
  try {
    const createdAnimal = await Animal.create(animal);
    console.log('Animal created:', createdAnimal);
  } catch (error) {
    console.error('Error creating animal:', error);
  }
}

// Function to read all animal documents
async function readAnimals() {
  try {
    const animals = await Animal.find();
    console.log('Animals:');
    console.log(animals);
  } catch (error) {
    console.error('Error reading animals:', error);
  }
}

// Function to update an animal document
async function updateAnimal(id, updatedAnimal) {
  try {
    const updated = await Animal.findByIdAndUpdate(id, updatedAnimal);
    console.log('Animal updated:', updated);
  } catch (error) {
    console.error('Error updating animal:', error);
  }
}

// Function to delete an animal document
async function deleteAnimal(id) {
  try {
    const deleted = await Animal.findByIdAndDelete(id);
    console.log('Animal deleted:', deleted);
  } catch (error) {
    console.error('Error deleting animal:', error);
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
  await connectToMongoDB();

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
        mongoose.disconnect();
        return; // Exit the program
      default:
        console.log('Invalid operation number. Please try again.');
        break;
    }
  }
}

run();
