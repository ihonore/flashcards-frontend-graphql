import { AddCircle } from '@mui/icons-material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useFlashcardsQuery } from '../../generated/graphql';
import setAllFlashcards from '../../redux/actions/flashcardsActions';
import CreateFlashcard from '../Flashcard/CreateFlashcard';
import Flashcard from '../Flashcard/Flashcard';

const FlashcardaList: React.FC = () => {
  const { data, error, loading } = useFlashcardsQuery();
  const dispatch = useDispatch();
  const [createMode, setCreateMode] = React.useState(false);

  const handleClose = () => {
    setCreateMode(false);
  };

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
    <>
      <div className="card-grid">
        {createMode && <CreateFlashcard close={handleClose} />}
        {data.flashcards.flashcards.map((flashcard) => {
          return <Flashcard flashcard={flashcard} />;
        })}
      </div>
      <AddCircle
        sx={{
          color: '#FFFFFF',
          fontSize: '2.5rem',
          position: 'absolute',
          top: { xs: '4rem', sm: '5rem' },
          right: '1rem',
          cursor: 'pointer',
          transition: 'transform .2s',
          '&:hover': {
            transform: 'scale(1.2)',
          },
        }}
        onClick={() => setCreateMode(!createMode)}
      />
    </>
  );
};

export default FlashcardaList;
