import React, { useState, useEffect } from 'react';
import TopThreeCard from './TopThreeCard';
import '../styles/Leaderboard.css';

const generateUsers = () => {
  const users = Array.from({ length: 100 }, (_, i) => ({
    name: `User ${i + 1}`,
    points: Math.floor(Math.random() * 1000),
    avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
  }));

  users.sort((a, b) => b.points - a.points);
  return users.map((user, index) => ({ ...user, rank: index + 1 }));
};

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const data = generateUsers();
    setUsers(data);
  }, []);

  const topThree = users.slice(0, 3);
  const restUsers = users.slice(3);
  const totalPages = Math.ceil(restUsers.length / rowsPerPage);
  const visibleUsers = restUsers.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handlePageChange = (direction) => {
    setPage((prev) => Math.max(1, Math.min(prev + direction, totalPages)));
  };

  return (
    <div className="leaderboard-container">
      <div className="top-three">
        {topThree[1] && <TopThreeCard user={topThree[1]} position={2} />}
        {topThree[0] && <TopThreeCard user={topThree[0]} position={1} />}
        {topThree[2] && <TopThreeCard user={topThree[2]} position={3} />}
      </div>

      <div className="leaderboard-table">
        <div className="ranking-header">
          {visibleUsers.map((user) => (
            <div key={user.rank}>
              <h3>{user.rank}</h3>
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                {user.name}
              </div>
              <h6>{user.points}</h6>
            </div>
          ))}
        </div>
      </div>

      <div className="pagination">
        <button onClick={() => handlePageChange(-1)} disabled={page === 1}>
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={() => handlePageChange(1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
