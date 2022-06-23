import { AddCircle } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useFlashcardsQuery } from '../../generated/graphql';
import setAllFlashcards from '../../redux/actions/flashcardsActions';
import CreateFlashcard from '../Flashcard/CreateFlashcard';
import Flashcard from '../Flashcard/Flashcard';

const FlashcardaList: React.FC = () => {
  const { data, error, loading } = useFlashcardsQuery();
  const dispatch = useDispatch();
  const [createMode, setCreateMode] = React.useState(false);
  const { pathname } = useLocation();

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

  const myFlashcards = data.flashcards.flashcards.filter((flashcard) => {
    const strObj: any = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(strObj);
    return flashcard.postedBy?.email === currentUser?.email;
  });

  if (myFlashcards.length < 1 && pathname === '/my-flashcards') {
    return (
      <>
        <div className="card-grid">
          {createMode ? (
            <CreateFlashcard close={handleClose} />
          ) : (
            <div style={{ color: 'white', fontSize: '1.5rem' }}>
              Your flashcards will be listed here
            </div>
          )}

          <Tooltip title="Create Flashcard">
            <AddCircle
              sx={{
                color: '#FFFFFF',
                fontSize: '2.5rem',
                position: 'absolute',
                top: { xs: '4rem', sm: '5rem' },
                right: '1.5rem',
                cursor: 'pointer',
                transition: 'transform .2s',
                '&:hover': {
                  transform: 'scale(1.3)',
                },
              }}
              onClick={() => setCreateMode(!createMode)}
            />
          </Tooltip>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="card-grid">
        {createMode && <CreateFlashcard close={handleClose} />}
        {pathname === '/my-flashcards'
          ? myFlashcards.map((flashcard) => {
              return <Flashcard flashcard={flashcard} />;
            })
          : data.flashcards.flashcards.map((flashcard) => {
              return <Flashcard flashcard={flashcard} />;
            })}
      </div>
      <Tooltip title="Create Flashcard">
        <AddCircle
          sx={{
            color: '#FFFFFF',
            fontSize: '2.5rem',
            position: 'absolute',
            top: { xs: '4rem', sm: '5rem' },
            right: '1.5rem',
            cursor: 'pointer',
            transition: 'transform .2s',
            '&:hover': {
              transform: 'scale(1.3)',
            },
          }}
          onClick={() => setCreateMode(!createMode)}
        />
      </Tooltip>
    </>
  );
};

export default FlashcardaList;
