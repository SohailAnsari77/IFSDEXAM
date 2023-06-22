import React, { useState } from 'react';

const Animal = class {
  constructor(birthRate, deathRate) {
    this.birthRate = birthRate;
    this.deathRate = deathRate;
  }
};

const Zoo = class {
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
};

const AnimalWidget = () => {
  const [numberOfAnimals, setNumberOfAnimals] = useState(0);
  const [animalDetails, setAnimalDetails] = useState([]);
  const [years, setYears] = useState(0);
  const [estimatedPopulation, setEstimatedPopulation] = useState(0);

  const handleNumberOfAnimalsChange = (e) => {
    const value = parseInt(e.target.value);
    setNumberOfAnimals(value);
    setAnimalDetails(Array(value).fill({ birthRate: 0, deathRate: 0 }));
  };

  const handleAnimalDetailsChange = (index, field, value) => {
    const updatedDetails = [...animalDetails];
    updatedDetails[index][field] = parseFloat(value);
    setAnimalDetails(updatedDetails);
  };

  const handleYearsChange = (e) => {
    const value = parseInt(e.target.value);
    setYears(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const zoo = new Zoo();
    animalDetails.forEach((detail) => {
      const { birthRate, deathRate } = detail;
      const animal = new Animal(birthRate, deathRate);
      zoo.addAnimal(animal);
    });

    const estimatedPopulation = zoo.calculatePopulationAfterYears(years);
    setEstimatedPopulation(estimatedPopulation);
  };

  return (
    <div>
      <h2>Animal Widget</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Number of Animal Types:
          <input type="number" value={numberOfAnimals} onChange={handleNumberOfAnimalsChange} />
        </label>
        <br />
        {animalDetails.map((detail, index) => (
          <div key={index}>
            <h3>Animal {index + 1}</h3>
            <label>
              Birth Rate:
              <input
                type="number"
                value={detail.birthRate}
                onChange={(e) => handleAnimalDetailsChange(index, 'birthRate', e.target.value)}
              />
            </label>
            <br />
            <label>
              Death Rate:
              <input
                type="number"
                value={detail.deathRate}
                onChange={(e) => handleAnimalDetailsChange(index, 'deathRate', e.target.value)}
              />
            </label>
            <br />
          </div>
        ))}
        <label>
          Number of Years:
          <input type="number" value={years} onChange={handleYearsChange} />
        </label>
        <br />
        <button type="submit">Calculate</button>
      </form>
      <h3>Estimated Population: {estimatedPopulation}</h3>
    </div>
  );
};

export default AnimalWidget;
