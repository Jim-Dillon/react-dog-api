import React, { useState } from 'react';
import { useFetchBreeds } from './hooks/useFetchBreeds';
import { useFetchDogImage } from './hooks/useFetchDogImage';
import Dropdown from './components/Dropdown';
import DogImage from './components/DogImage';
import './App.css';

const App = () => {
  const [selectedBreed, setSelectedBreed] = useState('');
  const { data: breeds, error: breedsError, isLoading: isBreedsLoading } = useFetchBreeds();
  const { data: dogImage, error: dogImageError, refetch: refetchDogImage } = useFetchDogImage(selectedBreed)

  const handleBreedChange = (event) => {
    setSelectedBreed(event.target.value);
  };

  return (
    <div className='container'>
      <div className='content'>
        <div className='dog-card__row1'>
          <h1>Find a Dog</h1>
          <p>Are the kids hassling you for a dog but you can't tell a labrador from a doberman? Scroll through the list of options below for a look at each of the breeds.</p>
          <p className='disclaimer'>Photos courtesy of <a href='https://dog.ceo/dog-api/' target="_blank" rel="noopener noreferrer">Dog Ceo API</a>.</p>
          {isBreedsLoading ? (
            <p>Loading breeds...</p>
          ) : breedsError ? (
            <p>Error loading breeds: {breedsError.message}</p>
          ) : (
            <Dropdown breeds={breeds} selectedBreed={selectedBreed} onBreedChange={handleBreedChange} />
          )}
        </div>
        {dogImageError ? (
          <div className="error-message">Sorry, we can't do that right now.</div>
        ) : (
          <DogImage imageUrl={dogImage} />
        )}
      </div>
    </div>
  );
};

export default App;
