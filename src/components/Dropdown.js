import React from "react";

const Dropdown = ({ breeds, selectedBreed, onBreedChange}) => {

    return (
        <select value={selectedBreed} onChange={onBreedChange}>
        <option value="">Select a breed</option>
        {breeds.map(breed => (
          <option key={breed} value={breed}>{breed}</option>
        ))}
      </select>
    );
}

export default Dropdown;