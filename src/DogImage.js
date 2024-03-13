import React from 'react';

const DogImage = ({ imageUrl }) => {
  return (
    <div className='dog-image'>
      {imageUrl && <img src={imageUrl} alt="Dog" />}
    </div>
  );
}

export default DogImage;