import React from 'react';
import './AvaliablePets.css';

const AvailablePets = () => {
  const pets = [
    {
      id: 1,
      name: 'Bella',
      type: 'Dog',
      image: 'https://placedog.net/400/300?id=1'
    },
    {
      id: 2,
      name: 'Milo',
      type: 'Cat',
      image: 'https://www.cdc.gov/healthy-pets/media/images/2024/04/Cat-on-couch.jpg'
    },
    {
      id: 3,
      name: 'Charlie',
      type: 'Rabbit',
      image: 'https://i.pinimg.com/736x/b8/25/e1/b825e1484a21bb183466a3890df21c39.jpg'
    },
    {
      id: 4,
      name: 'Luna',
      type: 'Parrot',
      image: 'https://www.treehugger.com/thmb/W82erO6wjPyrXiLm53554RAVFa8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rainbow-lorikeet-1203476610-18239e9ab1904e3ca95dd1ebc163b61d.jpg'
    },
  ];

  return (
    <div className="available-pets">
      <h2>Available Pets</h2>
      <div className="pets-grid">
        {pets.map((pet) => (
          <div key={pet.id} className="pet-card">
            <img src={pet.image} alt={`${pet.name} the ${pet.type}`} />
            <h3>{pet.name}</h3>
            <p>Type: {pet.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailablePets;
