import React, { useState, useEffect } from 'react';

import PetCard from './components/petCards.jsx';
import SidebarFilter from './components/Filters.jsx';
import PetDetailsPage from './components/petDetails.jsx';
import allPetsData from './data/petsData.jsx';
import FavoritesPage from './components/Favourites.jsx';

const App = () => {
  const [pets, setPets] = useState(allPetsData);
  const [filteredPets, setFilteredPets] = useState(allPetsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAnimalType, setSelectedAnimalType] = useState('All');
  const [selectedBreed, setSelectedBreed] = useState('All');
  const [selectedAgeRange, setSelectedAgeRange] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const [favorites, setFavorites] = useState(new Set());
  const [view, setView] = useState('list');
  const [selectedPet, setSelectedPet] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const toggleFavorite = (petId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(petId)) {
      newFavorites.delete(petId);
      showMessage('Removed from Favorites!', 'info');
    } else {
      newFavorites.add(petId);
      showMessage('Added to Favorites!', 'success');
    }
    setFavorites(newFavorites);
  };

  const handleViewDetails = (pet) => {
    setSelectedPet(pet);
    setView('details');
  };

  const handleBackToList = () => {
    setSelectedPet(null);
    setView('list');
  };

  const handleViewFavorites = () => {
    setView('favorites');
  };

  const handleBackFromFavorites = () => {
    setView('list');
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedAnimalType('All');
    setSelectedBreed('All');
    setSelectedAgeRange('All');
    setSelectedGender('All');
    setSelectedStatus('All');
    setSelectedLocation('All');
  };

  const isSearchActive = searchTerm.length > 0;

  useEffect(() => {
    let currentFilteredPets = pets;

    if (!isSearchActive) {
      if (selectedAnimalType !== 'All') {
        currentFilteredPets = currentFilteredPets.filter((pet) => pet.type === selectedAnimalType);
      }
      if (selectedBreed !== 'All') {
        currentFilteredPets = currentFilteredPets.filter((pet) => pet.breed === selectedBreed);
      }
      if (selectedLocation !== 'All') {
        currentFilteredPets = currentFilteredPets.filter((pet) => pet.location === selectedLocation);
      }
      if (selectedAgeRange !== 'All') {
        currentFilteredPets = currentFilteredPets.filter((pet) => pet.age === selectedAgeRange);
      }
      if (selectedGender !== 'All') {
        currentFilteredPets = currentFilteredPets.filter((pet) => pet.gender === selectedGender);
      }
      if (selectedStatus !== 'All') {
        currentFilteredPets = currentFilteredPets.filter((pet) => pet.status === selectedStatus);
      }
    }

    if (isSearchActive) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentFilteredPets = currentFilteredPets.filter((pet) =>
        pet.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        pet.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        pet.breed.toLowerCase().includes(lowerCaseSearchTerm) ||
        pet.location.toLowerCase().includes(lowerCaseSearchTerm) ||
        pet.type.toLowerCase().includes(lowerCaseSearchTerm) ||
        pet.gender.toLowerCase().includes(lowerCaseSearchTerm) ||
        pet.status.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    setFilteredPets(currentFilteredPets);
  }, [
    pets,
    searchTerm,
    selectedAnimalType,
    selectedBreed,
    selectedLocation,
    selectedAgeRange,
    selectedGender,
    selectedStatus
  ]);

  const renderContent = () => {
    if (view === 'details') {
      return <PetDetailsPage pet={selectedPet} onBack={handleBackToList} showMessage={showMessage} />;
    } else if (view === 'favorites') {
      const favoritePets = pets.filter(pet => favorites.has(pet.id));
      return <FavoritesPage pets={favoritePets} onBack={handleBackFromFavorites} onViewDetails={handleViewDetails} favorites={favorites} toggleFavorite={toggleFavorite} showMessage={showMessage} />;
    } else {
      return (
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          <SidebarFilter
            selectedAnimalType={selectedAnimalType}
            setSelectedAnimalType={setSelectedAnimalType}
            selectedBreed={selectedBreed}
            setSelectedBreed={setSelectedBreed}
            selectedAgeRange={selectedAgeRange}
            setSelectedAgeRange={setSelectedAgeRange}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            allPetsData={allPetsData}
            isSearchActive={isSearchActive}
            handleClearFilters={handleClearFilters}
          />
          <div className="flex-1">
            {filteredPets.length === 0 ? (
              <div className="text-center text-gray-600 text-xl mt-16 p-12 bg-white rounded-2xl shadow-xl border border-gray-100">
                <p className="mb-4 text-3xl">🐾</p>
                <p className="mb-2 font-bold text-gray-800">Oh no! No pets found matching your criteria.</p>
                <p className="text-gray-600">Try adjusting your filters or searching for something else.</p>
              </div>
            ) : (
              <div
                className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              >
                {filteredPets.map((pet) => (
                  <PetCard
                    key={pet.id}
                    pet={pet}
                    onViewDetails={handleViewDetails}
                    isLiked={favorites.has(pet.id)}
                    toggleFavorite={() => toggleFavorite(pet.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans text-gray-900 p-4 sm:p-6 lg:p-8">
      <header className="mb-16 py-10 bg-white rounded-3xl shadow-2xl border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-4 gap-4">
          <h1 className="text-3xl font-extrabold text-blue-800 leading-tight">
            {view === 'list' ? 'Pet Adoption' : (view === 'favorites' ? 'My Favorites' : 'Pet Details')}
          </h1>
          {view === 'list' && (
            <div className="relative flex-grow max-w-2xl w-full">
              <input
                type="text"
                placeholder="Search by animal type, breed, or location..."
                className="w-full p-3 pl-12 border border-gray-300 rounded-full shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base transition-all duration-300 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          )}
          <button
            onClick={handleViewFavorites}
            className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors duration-200 font-bold"
          >
            <span>Favorites</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </header>

      <div className={`fixed top-5 right-5 z-50 transition-all duration-300 ${message.text ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className={`px-6 py-3 rounded-full text-white shadow-lg font-semibold ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {message.text}
        </div>
      </div>
      
      {renderContent()}

      <footer className="text-center mt-20 text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Pet Adoption Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;