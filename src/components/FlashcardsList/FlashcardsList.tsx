import React from 'react';
import { useDispatch } from 'react-redux';
import { useFlashcardsQuery } from '../../generated/graphql';
import setAllFlashcards from '../../redux/actions/flashcardsActions';
import Flashcard from '../Flashcard/Flashcard';

const FlashcardaList: React.FC = () => {
  const { data, error, loading } = useFlashcardsQuery();
  const dispatch = useDispatch();

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
  dispatch(setAllFlashcards(data.flashcards.flashcards));

  return (
    <div className="card-grid">
      {data.flashcards.flashcards.map((flashcard) => {
        return <Flashcard flashcard={flashcard} />;
      })}
    </div>
  );
};

export default FlashcardaList;
