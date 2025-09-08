import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function Pets() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/pets`)
      .then(res => res.json())
      .then(data => {
        console.log("🐶 Pets:", data);
        setPets(data);
      })
      .catch(err => console.error("Error fetching pets:", err));
  }, []);

  return (
    <div>
      <h2>🐾 Available Pets</h2>
      <ul>
        {pets.map((pet) => (
          <li key={pet._id}>
            {pet.name} - {pet.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pets;
