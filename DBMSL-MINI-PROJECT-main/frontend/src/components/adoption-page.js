import React, { useState, useEffect } from 'react';

const PetAdoptionPage = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchParams, setSearchParams] = useState({
    animalType: '',
    gender: '',
    maxAge: '',
  });
  const [members, setMembers] = useState(null);
  const [pets, setPets] = useState(null);

  const fetchMembers = async () => {
    // Fetch member details based on search parameters
    // This is just a mock endpoint for example purposes
    const query = `http://localhost:4001/api/member_routes`; // Replace with your actual API endpoint
    try {
      const response = await fetch(query);
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPets = () => {
    if (selectedMember) {
      // Fetch pet details based on search parameters
      const { animalType, gender, maxAge } = searchParams;
      const query = `/api/workouts/${animalType}/${gender}/${maxAge}`;
      fetch(query)
        .then((response) => response.json())
        .then((data) => setPets(data))
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleAdopt = (pet) => {
    if (selectedMember) {
      // Send a request to your server to mark the pet as adopted
      const adoptionRequest = {
        memberId: selectedMember.id, // Replace with the actual member ID field
        petId: pet.p_ID, // Replace with the actual pet ID field
      };

      const req_body = {
        p_ID: pet.p_ID,
        NGO_ID: pet.NGO_ID,
      };

      const update = `http://localhost:4001/api/member_routes/${adoptionRequest.memberId}`;

      fetch(update, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req_body),
      })
        .then((response) => {
          if (response.ok) {
            console.log(`Adopted pet with ID ${pet.id}`);
            // You can update UI or remove the adopted pet from the list
          } else {
            console.error('Failed to adopt pet');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="pet-adoption-page">
      <h2>Pet Adoption Page</h2>
      <div className="search-section">
        <h3>Search for Members</h3>
        <button onClick={fetchMembers}>Search Members</button>
        {members &&
          members.map((member) => (
            <div key={member.id} onClick={() => setSelectedMember(member)}>
              {member.name} - ID: {member.id}
            </div>
          ))}
      </div>

      {selectedMember && (
        <div className="search-section">
          <h3>Search for Pets</h3>
          <input
            type="text"
            placeholder="Animal Type"
            onChange={(e) =>
              setSearchParams({ ...searchParams, animalType: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Gender"
            onChange={(e) =>
              setSearchParams({ ...searchParams, gender: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Max Age"
            onChange={(e) =>
              setSearchParams({ ...searchParams, maxAge: e.target.value })
            }
          />
          <button onClick={fetchPets}>Search Pets</button>
          {pets &&
            pets.map((pet) => (
              <div key={pet.id}>
                {pet.name} - ID: {pet.id}
                <button onClick={() => handleAdopt(pet)}>Adopt</button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default PetAdoptionPage;
