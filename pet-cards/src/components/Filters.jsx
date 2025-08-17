import React from 'react';

const SidebarFilter = ({
  selectedAnimalType,
  setSelectedAnimalType,
  selectedBreed,
  setSelectedBreed,
  selectedAgeRange,
  setSelectedAgeRange,
  selectedGender,
  setSelectedGender,
  selectedStatus,
  setSelectedStatus,
  selectedLocation,
  setSelectedLocation,
  allPetsData,
  isSearchActive,
}) => {
  const animalTypes = ['All', ...new Set(allPetsData.map(pet => pet.type))];
 
  const ageRanges = ['All', 'Infant', 'Young', 'Adult'];
  const genders = ['All', 'Male', 'Female'];
  const statuses = ['All', ...new Set(allPetsData.map(pet => pet.status).filter(status => status !== 'Pending'))];
  const locations = ['All', ...new Set(allPetsData.map(pet => pet.location))].sort();

  const filteredBreedOptions = selectedAnimalType === 'All'
    ? ['All', ...new Set(allPetsData.map(pet => pet.breed))].sort()
    : ['All', ...new Set(allPetsData.filter(pet => pet.type === selectedAnimalType).map(pet => pet.breed))].sort();

  const FilterSection = ({ label, children }) => (
    <div className="mb-7">
      <label className="block text-gray-800 text-base font-bold mb-3">{label}</label>
      {children}
    </div>
  );

  const SelectInput = ({ id, value, onChange, options }) => (
    <select
      id={id}
      className="w-full p-3.5 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white appearance-none transition-colors duration-200 hover:border-gray-400"
      value={value}
      onChange={onChange}
      disabled={isSearchActive} 
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );

  return (
    <div className="w-full lg:w-68 p-7 bg-white rounded-2xl shadow-xl lg:sticky lg:top-8 self-start border border-gray-100">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-7 border-b-2 border-blue-100 pb-4">Filters</h2>

      {/* Animal Type Filter */}
      <FilterSection label="Animal Type">
        <SelectInput
          id="animalType"
          value={selectedAnimalType}
          onChange={(e) => {
            setSelectedAnimalType(e.target.value);
            setSelectedBreed('All');
            setSelectedAgeRange('All');
            setSelectedGender('All');
            setSelectedStatus('All');
            setSelectedLocation('All');
          }}
          options={animalTypes}
        />
      </FilterSection>

      {/* Breed Filter */}
      <FilterSection label="Breed">
        <SelectInput
          id="breed"
          value={selectedBreed}
          onChange={(e) => setSelectedBreed(e.target.value)}
          options={filteredBreedOptions}
        />
      </FilterSection>

      {/* Location Filter */}
      <FilterSection label="Location">
        <SelectInput
          id="location"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          options={locations}
        />
      </FilterSection>

      {/* Age Filter */}
      <FilterSection label="Age Range">
        <SelectInput
          id="ageRange"
          value={selectedAgeRange}
          onChange={(e) => setSelectedAgeRange(e.target.value)}
          options={ageRanges}
        />
      </FilterSection>

      {/* Gender Filter */}
      <FilterSection label="Gender">
        <SelectInput
          id="gender"
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          options={genders}
        />
      </FilterSection>

      {/* Status Filter */}
      <FilterSection label="Adoption Status">
        <SelectInput
          id="status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          options={statuses}
        />
      </FilterSection>

      {/* Clear Filters Button */}
      <button
        onClick={() => {
          setSelectedAnimalType('All');
          setSelectedBreed('All');
          setSelectedAgeRange('All');
          setSelectedGender('All');
          setSelectedStatus('All');
          setSelectedLocation('All'); 
        }}
        className="w-full py-3.5 px-4 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
        disabled={isSearchActive} 
      >
        Clear Filters
      </button>
    </div>
  );
};

export default SidebarFilter;