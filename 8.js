const express = require('express');
const app = express();
app.use(express.json());

class Animal {
  constructor(name, birthRate, deathRate, averageAge) {
    this.name = name;
    this.birthRate = birthRate;
    this.deathRate = deathRate;
    this.averageAge = averageAge;
  }
}

class Zoo {
  constructor() {
    this.animals = [];
  }

  addAnimal(animal) {
    this.animals.push(animal);
  }

  calculatePopulationAfterYears(years) {
    let totalPopulation = 0;

    for (const animal of this.animals) {
      let currentPopulation = 1; // Assuming starting with one animal of each type

      for (let i = 0; i < years; i++) {
        const births = currentPopulation * animal.birthRate;
        const deaths = currentPopulation * animal.deathRate;
        currentPopulation += births - deaths;
      }

      totalPopulation += currentPopulation;
    }

    return totalPopulation;
  }

  calculateAverageAge() {
    let totalAge = 0;
    let totalAnimals = this.animals.length;

    for (const animal of this.animals) {
      totalAge += animal.averageAge;
    }

    return totalAge / totalAnimals;
  }
}

// Create a new Zoo instance
const zoo = new Zoo();

// Add animal types to the zoo
app.post('/animals', (req, res) => {
  const { name, birthRate, deathRate, averageAge } = req.body;
  const animal = new Animal(name, birthRate, deathRate, averageAge);
  zoo.addAnimal(animal);
  res.status(201).json({ message: 'Animal added to the zoo.' });
});

// Calculate the estimated population after n years
app.get('/population', (req, res) => {
  const years = parseInt(req.query.years);
  const estimatedPopulation = zoo.calculatePopulationAfterYears(years);
  res.json({ population: estimatedPopulation });
});

// Calculate the average age of animals in the zoo
app.get('/average-age', (req, res) => {
  const averageAge = zoo.calculateAverageAge();
  res.json({ averageAge: averageAge });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
