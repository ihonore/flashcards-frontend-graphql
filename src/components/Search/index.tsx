import React from 'react';
import SearchAppBar from '../AppBar/AppBar';
import SearchList from './SearchList';

const index = () => {
  return (
    <div>
      <SearchAppBar />
      <div className="container">
        <SearchList />
      </div>
    </div>
  );
};

export default index;
