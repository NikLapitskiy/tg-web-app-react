import React from 'react';
import BackButton from '../BackButton/BackButton';
import { useNavigate } from 'react-router-dom';

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