// MemberSearch.js
import React, { useState, useEffect } from 'react';

const MemberSearch = ({ onSelectMember }) => {
  const [searchParams, setSearchParams] = useState({
    Name: '',
    Aadhaar_ID: '',
  });
  const [members, setMembers] = useState(null);

  const fetchMembers = async () => {
    const { Aadhaar_ID } = searchParams;
    if (Aadhaar_ID) {
      const query = `http://localhost:4001/api/member_routes/${Aadhaar_ID}`;
      try {
        const response = await fetch(query);
        if (response.ok) {
          const data = await response.json();
          setMembers(data);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // Handle the case where Aadhaar_ID is not provided.
      // You can show an error message or handle it as needed.
    }
  };

  useEffect(() => {
    // This effect fetches members based on searchParams
    fetchMembers();
  }, [searchParams]);

  const handleSelectMember = (member) => {
    onSelectMember(member);
  };

  return (
    <div className="member-search">
      <h4>Search for Members</h4>
      <input
        type="text"
        placeholder="Name"
        value={searchParams.Name}
        onChange={(e) => setSearchParams({ ...searchParams, Name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Aadhaar ID"
        value={searchParams.Aadhaar_ID}
        onChange={(e) => setSearchParams({ ...searchParams, Aadhaar_ID: e.target.value })}
      />
      <button onClick={fetchMembers}>Search</button>
      {members &&
        members.map((member) => (
          <div key={member._id} onClick={() => handleSelectMember(member)}>
            {member.Name} - Aadhaar ID: {member.Aadhaar_ID}
          </div>
        ))}
    </div>
  );
};

export default MemberSearch;
