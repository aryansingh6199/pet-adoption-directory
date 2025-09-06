import React, { useState } from 'react';
const PetCard = ({ pet, onViewDetails, isLiked, toggleFavorite }) => {

  const [isImageBroken, setIsImageBroken] = useState(false);
  const handleHeartClick = (e) => {
    e.stopPropagation();
    toggleFavorite(pet.id);
  };

  const handleInfoClick = (e) => {
    e.stopPropagation();
    onViewDetails(pet);
  };

  const handleCardClick = () => {
    onViewDetails(pet);
  };

  const getStatusBadgeClasses = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Pending Adoption':
        return 'bg-yellow-100 text-yellow-800';
      case 'Adopted':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col cursor-pointer transform transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl border border-gray-100"
    >
      <div className="relative">
        {isImageBroken ? (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-t-2xl">
            <p className="text-gray-500 font-bold text-center text-lg">{pet.name}</p>
          </div>
        ) : (
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-64 object-cover rounded-t-2xl"
            onError={(e) => {
              setIsImageBroken(true);
            }}
          />
        )}
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${getStatusBadgeClasses(pet.status)}`}>
          {pet.status}
        </span>
      </div>

      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
  
          <h3 className="text-3xl font-extrabold text-blue-800 mb-1 leading-tight">{pet.name}</h3>
          <p className="text-gray-700 text-base font-medium mb-2">{pet.breed}</p>
          <p className="text-gray-500 text-sm">
            {pet.gender}, {pet.age}
            <span className="mx-1 text-gray-400">•</span>
            <span className="font-semibold">{pet.location}</span>
          </p>
        </div>
  
        <div className="flex justify-end items-center mt-5 space-x-3 relative">
          <button
            onClick={handleHeartClick}
            className={`p-3 rounded-full transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2
              ${isLiked
                ? 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300'
                : 'bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-500 focus:ring-red-300'
              }`}
            aria-label={`Like ${pet.name}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={handleInfoClick}
            className="p-3 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-500 hover:text-blue-600 transition-colors duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label={`More info about ${pet.name}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 2a1 1 0 100 2h2a1 1 0 100-2h-2z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;