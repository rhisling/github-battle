import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaUser,
} from 'react-icons/fa';
import Tooltip from './Tooltip';

const ProfileList = ({ profile }) => {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239, 115, 115)" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <Tooltip text="User's location">
          <li>
            <FaCompass color="rgb(144,115,255)" size={22} />
            {profile.location}
          </li>
        </Tooltip>
      )}
      {profile.company && (
        <li>
          <FaBriefcase color="#794458" size={22} />
          {profile.location}
        </li>
      )}
      <li>
        <FaUsers color="rgb(129, 195, 245)" size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {profile.followers.toLocaleString()} following
      </li>
    </ul>
  );
};

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
};
export default ProfileList;
