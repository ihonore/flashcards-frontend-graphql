import React from 'react';
import SearchAppBar from '../AppBar/AppBar';
import FlashcardaList from '../FlashcardsList/FlashcardsList';

const Dashboard = () => {
  return (
    <div>
      <SearchAppBar />
      <div className="container">
        <FlashcardaList />
      </div>
    </div>
  );
};

export default Dashboard;
