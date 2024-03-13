import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import DogImage from './DogImage';
import './App.css'

const App = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [dogImage, setDogImage] = useState('');

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(response => response.json())
      .then(data => {
        const breedsArray = Object.keys(data.message);
        setBreeds(breedsArray);
      })
      .catch(error => console.error('Error fetching breeds:', error));
  }, []);

  const handleBreedChange = async (event) => {
    const selectedBreed = event.target.value;
    setSelectedBreed(selectedBreed);

    try {
      const response = await fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`);
      const data = await response.json();
      setDogImage(data.message);
    } catch (error) {
      console.error('Error fetching dog image:', error);
    }
  };

  return (
    <div className='container'>
      <div className='content'>
        <div className='dog-card__row1'>
          <h1>Find a Dog</h1>
          <p>Are the kids hassling you for a dog but you can't tell a labrador from a doberman? Scroll through the list of options below for a look at each of the breeds.</p>
          <p className='disclaimer'>Photos courtesy of <a href='https://dog.ceo/dog-api/'>Dog Ceo API</a>.</p>
          <Dropdown breeds={breeds} selectedBreed={selectedBreed} onBreedChange={handleBreedChange} />
        </div>
        <DogImage imageUrl={dogImage} />
      </div>
    </div>
  );
}

export default App;
