import React, { useState } from 'react';

const PetDetailsPage = ({ pet, onBack }) => {
  const [isImageBroken, setIsImageBroken] = useState(false);
  const [copyStatus, setCopyStatus] = useState(null);

  if (!pet) {
    return (
      <div className="flex justify-center items-center h-[50vh] bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <p className="text-xl text-gray-600">Pet not found. Please go back to the list.</p>
      </div>
    );
  }
  const handleShareClick = async () => {
    const urlToShare = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out ${pet.name}!`,
          text: `Meet ${pet.name} 🐾`,
          url: urlToShare,
        });
      } catch (err) {
        console.error("Share cancelled or failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(urlToShare);
        setCopyStatus("Copied!");
        setTimeout(() => setCopyStatus(null), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
        setCopyStatus("Failed to copy.");
        setTimeout(() => setCopyStatus(null), 2000);
      }
    }
  };
  const icons = {
    age: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>,
    breed: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"></path><path d="M12 2v10l5 5"></path></svg>,
    gender: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 21.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4"></path><circle cx="9" cy="7.5" r="4.5"></circle><path d="M22 21.5a4 4 0 0 0-4-4H16a4 4 0 0 0-4 4"></path><circle cx="19" cy="7.5" r="4.5"></circle></svg>,
    location: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path><circle cx="12" cy="9" r="3"></circle></svg>,
    status: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
  };

  return (
    <div className="container mx-auto max-w-6xl p-6 bg-white rounded-2xl shadow-2xl border border-gray-200">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-8 font-semibold text-lg py-2 px-4 rounded-full bg-blue-100 hover:bg-blue-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back to Pet List
      </button>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-1/2 flex justify-center items-center bg-gray-50 rounded-3xl p-12 shadow-inner">
          {isImageBroken ? (
            <div className="w-full h-auto min-h-[400px] flex items-center justify-center rounded-2xl bg-gray-200">
              <p className="text-gray-500 font-bold text-center text-5xl p-8 w-full break-words">{pet.name}</p>
            </div>
          ) : (
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-auto max-h-[600px] object-contain rounded-2xl transition-transform duration-300 hover:scale-105"
              onError={() => {
                setIsImageBroken(true);
              }}
            />
          )}
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-5xl font-extrabold text-blue-800 tracking-tight">{pet.name}</h2>
              <button
                onClick={handleShareClick}
                className="p-3 bg-blue-100 text-blue-600 rounded-full shadow-md hover:bg-blue-200 transition-colors duration-200 relative cursor-pointer"
                aria-label="Share Pet Profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share-2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line></svg>
                {copyStatus && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap opacity-0 animate-fade-in-out">
                    {copyStatus}
                  </span>
                )}
              </button>
            </div>
            <p className="text-2xl text-gray-700 font-medium mb-6">{pet.breed}</p>

            <div className="p-6 bg-blue-50 rounded-3xl shadow-lg mb-8">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Key Details</h3>
              <ul className="space-y-4 text-gray-800">
                <li className="flex items-center">
                  {icons.age}
                  <span className="ml-3 font-semibold min-w-[70px]">Age:</span>
                  <span className="flex-1">{pet.age}</span>
                </li>
                <li className="flex items-center">
                  {icons.gender}
                  <span className="ml-3 font-semibold min-w-[70px]">Gender:</span>
                  <span className="flex-1">{pet.gender}</span>
                </li>
                <li className="flex items-center">
                  {icons.location}
                  <span className="ml-3 font-semibold min-w-[70px]">Location:</span>
                  <span className="flex-1">{pet.location}</span>
                </li>
                <li className="flex items-center">
                  {icons.status}
                  <span className="ml-3 font-semibold min-w-[70px]">Status:</span>
                  <span className="flex-1">{pet.status}</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">About {pet.name}</h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {pet.description}
            </p>
          </div>

          <button className="w-full py-4 px-6 mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300">
            Adopt {pet.name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;