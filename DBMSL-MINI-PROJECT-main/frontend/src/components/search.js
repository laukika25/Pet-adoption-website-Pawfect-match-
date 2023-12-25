

import { useEffect, useState } from "react"

// components
// import WorkoutDetails from "../components/WorkoutDetails"

import PetDetails from './petdetails';
import PetForm from './petForm';
import './Search.css'; // Import your CSS styles for the search page
import { Link } from "react-router-dom";

const Search = () => {
  const [workouts, setWorkouts] = useState(null);
  const [searchParams, setSearchParams] = useState({
    animalType: '',
    gender: '',
    maxAge: '',
  });

  const handleSearch = async () => {
    const { animalType, gender, maxAge } = searchParams;

    // Construct a query based on search parameters
    const query = `/api/workouts/${animalType}/${gender}/${maxAge}`;

    const response = await fetch(query);
    const json = await response.json();

    if (response.ok) {
      setWorkouts(json);
    }
  };

  useEffect(() => {
    // Fetch initial data on component mount
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts');
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="search-page">
      <div className="navbar">
        <div className="website-name">PAWfect Match</div>
        <div className="links">
          {/* <a href="/member-info">Member Info</a> */}
          <Link to="/adoption-page" className="l" >Adoption Page</Link>
        </div>
        <div className="links">
          {/* <a href="/member-info">Member Info</a> */}
          {/* <Link to="/Member-Info" className="l" >Member Info</Link> */}
        </div>
      </div>
      <div className="search-box">
        <h3>Search for Pets</h3>
        <input
          type="text"
          placeholder="Animal Type"
          value={searchParams.animalType}
          onChange={(e) =>
            setSearchParams({ ...searchParams, animalType: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Gender"
          value={searchParams.gender}
          onChange={(e) =>
            setSearchParams({ ...searchParams, gender: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Max Age"
          value={searchParams.maxAge}
          onChange={(e) =>
            setSearchParams({ ...searchParams, maxAge: e.target.value })
          }
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="search-results">
        {workouts &&
          workouts.map((workout) => (
            <PetDetails workout={workout} key={workout._id} />
          ))}
      </div>
      <div className="pet-form-container">
        <PetForm />
      </div>
    </div>
  );
};

export default Search;


