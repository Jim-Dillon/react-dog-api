import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Dropdown from './Dropdown';
import DogImage from './DogImage';
import './App.css';

const fetchBreeds = async () => {
  const response = await fetch('https://dog.ceo/api/breeds/list/all');
  if (!response.ok) {
    throw new Error('Failed to fetch breeds');
  }
  const data = await response.json();
  return Object.keys(data.message);
};

const fetchDogImage = async ({ queryKey }) => {
  const breed = queryKey[1];
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
  if (!response.ok) {
    throw new Error('Failed to fetch dog image');
  }
  const data = await response.json();
  return data.message;
};

const App = () => {
  const [selectedBreed, setSelectedBreed] = useState('');

  const { data: breeds, error: breedsError, isLoading: isBreedsLoading } = useQuery({
    queryKey: ['breeds'],
    queryFn: fetchBreeds
  });

  const { data: dogImage, error: dogImageError, refetch: refetchDogImage } = useQuery({
    queryKey: ['dogImage', selectedBreed],
    queryFn: fetchDogImage,
    enabled: !!selectedBreed
  });

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
