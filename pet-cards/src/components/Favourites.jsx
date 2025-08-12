import React from 'react';
import PetCard from './petCards';

const FavoritesPage = ({ pets, onBack, onViewDetails, favorites, toggleFavorite }) => {
  return (
    <div className="container mx-auto max-w-7xl">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-8 font-semibold text-lg py-2 px-4 rounded-full bg-blue-100 hover:bg-blue-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back to Pet List
      </button>
      <h2 className="text-4xl font-extrabold text-blue-800 mb-8">My Favorites</h2>
      {pets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pets.map(pet => (
            <PetCard
              key={pet.id}
              pet={pet}
              onViewDetails={onViewDetails}
              isLiked={favorites.has(pet.id)}
              toggleFavorite={() => toggleFavorite(pet.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl shadow-lg border border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <p className="text-xl text-gray-600 font-semibold mb-2">No favorites yet.</p>
          <p className="text-gray-500 text-center max-w-sm">
            Click the heart icon on any pet card to add them to your favorites list!
          </p>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;