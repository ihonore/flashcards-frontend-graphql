import { AddCircle, Sort } from '@mui/icons-material';
import { MenuItem, Select, Stack, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
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

  const classes = {
    button: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
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

  // myFlashcards.length < 1 && pathname === '/my-flashcards'
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
      <Stack
        alignItems="center"
        gap={2}
        sx={{
          position: 'absolute',
          top: { xs: '4rem', sm: '5rem' },
          right: '1.5rem',
          flexDirection: { xs: 'row', sm: 'column' },
        }}
      >
        <Tooltip title="Create Flashcard">
          <AddCircle
            sx={{
              color: '#FFFFFF',
              fontSize: '2.5rem',
              cursor: 'pointer',
              transition: 'transform .2s',
              '&:hover': {
                transform: 'scale(1.3)',
              },
            }}
            onClick={() => setCreateMode(!createMode)}
          />
        </Tooltip>
        <Box
          sx={{
            width: 'auto',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.3)',
            // border: '1px solid white',
          }}
        >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={40}
            label="Age"
            variant="standard"
            sx={{
              width: 50,
              height: 40,
              // marginRight: 15,
              // border: '1px solid white',
            }}
          >
            <MenuItem key="question">
              <button className="dropdown-item" style={classes.button}>
                Question
              </button>
            </MenuItem>
            <MenuItem key="answer">
              <button className="dropdown-item" style={classes.button}>
                Answer
              </button>
            </MenuItem>
            <MenuItem key="time">
              <button className="dropdown-item" style={classes.button}>
                Time added
              </button>
            </MenuItem>
          </Select>
          <Sort
            sx={{
              height: '2rem',
              color: 'white',
              width: '2rem',
              position: 'absolute',
              top: 2.5,
              left: 2.5,
            }}
          />
        </Box>
      </Stack>
    </>
  );
};

export default FlashcardaList;
