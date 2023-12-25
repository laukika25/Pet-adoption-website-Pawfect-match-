import React from "react";
import { useLocation } from "react-router-dom";
import './petdetails.css';

// const petDetailsStyle = {
//   backgroundColor: "#fff",
//   borderRadius: "10px",
//   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//   padding: "1rem",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   marginBottom: "2rem",
// };

// const petImageStyle = {
//   width: "100px",
//   height: "100px",
//   objectFit: "cover",
//   marginBottom: "1rem",
// };


// const PetDetails = ({ workout }) => {

//   return (
//     <div className="Pet-details">
//       <h4>{workout.title}</h4>
//       <p><strong>Name : </strong>{workout.Name}</p>
//       <p><strong>Animal Type : </strong>{workout.Animaltype}</p>
//       <p><strong>Gender : </strong>{workout.Gender}</p>
//       <p><strong>Pet_Id : </strong>{workout.p_ID}</p>
//       <p><strong>Ngo_Id : </strong>{workout.NGO_ID}</p>
//       <p>{workout.createdAt}</p>
//     </div>
//   )
// }

function PetDetails({ workout }) {
  const handleDelete = async () => {
    const deleteEndpoint = `http://localhost:4001/api/workouts/${workout.p_ID}/${workout.NGO_ID}`;

    try {
      const response = await fetch(deleteEndpoint, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Handle successful deletion, e.g., by refreshing the data
        console.log('Pet record deleted successfully.');
      } else {
        // Handle deletion failure
        console.error('Pet record deletion failed.');
      }
    } catch (error) {
      console.error('Error while deleting pet record:', error);
    }
  };

  return (
    <div className="pet-details">
      <h4 className="title">{workout.title}</h4>
      <p className="info"><strong>Name: </strong>{workout.Name}</p>
      <p className="info"><strong>Animal Type: </strong>{workout.Animaltype}</p>
      <p className="info"><strong>Gender: </strong>{workout.Gender}</p>
      <p className="info"><strong>Pet ID: </strong>{workout.p_ID}</p>
      <p className="info"><strong>NGO ID: </strong>{workout.NGO_ID}</p>
      <p className="info">{workout.createdAt}</p>
      <button
        className="delete-button"
        onClick={handleDelete}
        title="Delete Record"
      >
        Delete
      </button>
    </div>
  );
}

export default PetDetails;






