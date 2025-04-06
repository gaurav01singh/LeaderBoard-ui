import React from 'react';
import '../styles/TopThreeCard.css';

const TopThreeCard = ({ user, position }) => {
  return (
    <div className={`top-card rank-${position}`}>
      <img src={user.avatar} alt={user.name} className="top-avatar" />
      <h3>{user.name}</h3>
      <p>Points: {user.points}</p>
      <span className="badge">#{user.rank}</span>
    </div>
  );
};

export default TopThreeCard;
