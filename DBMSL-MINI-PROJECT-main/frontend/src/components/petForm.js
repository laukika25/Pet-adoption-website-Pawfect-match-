import { useState } from 'react';
import './petForm.css'; 

const PetForm = () => {
  const [name, setName] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [petId, setPetId] = useState('');
  const [ngoId, setNgoId] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pet = { Name: name, Animaltype: animalType, Age: age, Gender: gender, p_ID: petId, NGO_ID: ngoId };

    const response = await fetch('http://localhost:4001/api/workouts', {
      method: 'POST',
      body: JSON.stringify(pet),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      // Optionally, update the form fields with the posted data
      setName(json.Name);
      setAnimalType(json.Animaltype);
      setAge(json.Age);
      setGender(json.Gender);
      setPetId(json.p_ID);
      setNgoId(json.NGO_ID);
      console.log('New pet added:', json);
    }
  }

  return (
    <form className="pet-form" onSubmit={handleSubmit}>
      <h3>Add a New Pet</h3>

      <label htmlFor="name">Pet Name:</label>
      <input
        type="text"
        id="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label htmlFor="animalType">Animal Type:</label>
      <input
        type="text"
        id="animalType"
        onChange={(e) => setAnimalType(e.target.value)}
        value={animalType}
      />

      <label htmlFor="age">Age:</label>
      <input
        type="number"
        id="age"
        onChange={(e) => setAge(e.target.value)}
        value={age}
      />

      <label htmlFor="gender">Gender:</label>
      <input
        type="text"
        id="gender"
        onChange={(e) => setGender(e.target.value)}
        value={gender}
      />

      <label htmlFor="petId">Pet ID:</label>
      <input
        type="number"
        id="petId"
        onChange={(e) => setPetId(e.target.value)}
        value={petId}
      />

      <label htmlFor="ngoId">NGO ID:</label>
      <input
        type="number"
        id="ngoId"
        onChange={(e) => setNgoId(e.target.value)}
        value={ngoId}
      />

      <button>Add Pet</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default PetForm;
