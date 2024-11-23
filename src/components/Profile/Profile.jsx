import React from 'react';
import BackButton from '../BackButton/BackButton';

const Profile = () => {
  
  const handleBackClick = () => {
    navigate(-1); 
  }

  return (
    <div className="profile">
      <BackButton onClick={handleBackClick} />
      Profile
    </div>
  );
};

export default Profile;