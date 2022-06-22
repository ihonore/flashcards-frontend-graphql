import { CheckCircle, Delete, Edit, Person } from '@mui/icons-material';
import { Box, Divider, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState, useRef } from 'react';
import EditFlashcard from './EditFlashcard';

export interface flashcard {
  id: number;
  question: string;
  answer: string;
}

export default function Flashcard({ flashcard }: any) {
  const [flip, setFlip] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const frontEl = useRef() as React.MutableRefObject<HTMLDivElement>;
  const backEl = useRef() as React.MutableRefObject<HTMLDivElement>;

  const classes = {
    iconBox: {
      display: 'flex',
      alifnItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        background: 'white',
      },
    },
  };

  const handleClose = () => {
    setEditMode(false);
  };

  if (editMode) {
    return (
      <Box
        sx={{
          position: 'relative',
          height: { xs: '25vh', sm: 250 },
          width: { xs: '90vw', sm: 400 },
          background: 'white',
          borderRadius: '0.25rem',
        }}
      >
        <Box sx={{ padding: '0 0.5rem' }}>
          <EditFlashcard close={handleClose} flashcard={flashcard} />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '25vh', sm: 250 },
        width: { xs: '90vw', sm: 400 },
      }}
    >
      {!flip && (
        <div>
          <Box
            sx={{
              position: 'absolute',
              top: '1.5rem',
              right: { xs: '0.2rem', sm: '0.5rem' },
              backgroundColor: 'white',
              padding: '0.5rem 0.5rem',
              transition: 'transform .2s',
              zIndex: 2,
              '&:hover': {
                transform: 'scale(1.2)',
              },
            }}
          >
            <Stack
              sx={{
                backgroundColor: '#F6CA8B',
                boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.2)',
                borderRadius: '7px',
                cursor: 'pointer',
              }}
            >
              <Box sx={classes.iconBox}>
                <CheckCircle
                  sx={{
                    color: flashcard.isDone ? '#21AC0E' : '#868A88',
                  }}
                />
              </Box>
              <Divider />
              <Box sx={classes.iconBox} onClick={() => setEditMode(true)}>
                <Edit sx={{ color: '#2E91D4' }} />
              </Box>
              <Divider />
              <Box sx={classes.iconBox}>
                <Delete sx={{ color: '#FF7247' }} />
              </Box>
            </Stack>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: '0.2rem',
              right: '0.5rem',
              zIndex: 2,
              // transition: 'transform 0.2s',
              // backgroundColor: 'green',
              // padding: '0.5rem 0.5rem',
            }}
          >
            <Stack direction="row" gap={2}>
              <Box display="flex">
                <Person fontSize="small" sx={{ color: '#90C5A9' }} />
                <Typography sx={{ fontSize: '0.9rem', color: '#637AAC' }}>
                  {flashcard.postedBy.email.split('@')[0]}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '0.9rem', color: '#A990D3' }}>
                {moment(flashcard.createdAt).fromNow()}
              </Typography>
            </Stack>
          </Box>
        </div>
      )}
      <Box
        className={`card ${flip ? 'flip' : ''}`}
        sx={{ height: { xs: '25vh', sm: 250 }, width: { xs: '90vw', sm: 400 } }}
        onClick={() => setFlip(!flip)}
      >
        <Box className="front" ref={frontEl}>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1rem', sm: '1.2rem' },
            }}
          >
            {flashcard.question}
          </Typography>
        </Box>
        <div className="back" ref={backEl}>
          <Typography variant="h6">{flashcard.answer}</Typography>
        </div>
      </Box>
    </Box>
  );
}
