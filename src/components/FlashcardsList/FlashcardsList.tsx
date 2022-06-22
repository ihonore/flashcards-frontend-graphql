import React from 'react';
import { useFlashcardsQuery } from '../../generated/graphql';
import Flashcard from '../Flashcard/Flashcard';

const FlashcardaList: React.FC = () => {
  const { data, error, loading } = useFlashcardsQuery();

  if (loading) {
    return <div style={{ color: 'white', fontSize: '2rem' }}>loading...</div>;
  }
  if (error || !data) {
    return (
      <div style={{ color: 'white', fontSize: '2rem' }}>
        Something went wrong
      </div>
    );
  }
  return (
    <div className="card-grid">
      {data.flashcards.flashcards.map((flashcard) => {
        return <Flashcard flashcard={flashcard} />;
      })}
    </div>
  );
};

export default FlashcardaList;
