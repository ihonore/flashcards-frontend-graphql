import React from 'react';
import './App.css';
import SearchAppBar from './components/AppBar/AppBar';
import FlashcardaList from './components/FlashcardsList/FlashcardsList';

function App() {
  return (
    <div className="App">
      <SearchAppBar />
      <div className="container">
        <FlashcardaList />
      </div>
    </div>
  );
}

export default App;
