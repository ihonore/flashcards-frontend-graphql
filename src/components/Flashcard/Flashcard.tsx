import { CheckCircle, Delete, Edit, Person } from '@mui/icons-material';
import { Box, Divider, Stack, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState, useRef } from 'react';

export interface flashcard {
  id: number;
  question: string;
  answer: string;
}

export default function Flashcard({ flashcard }: any) {
  const [flip, setFlip] = useState(false);

  const frontEl = useRef() as React.MutableRefObject<HTMLDivElement>;
  const backEl = useRef() as React.MutableRefObject<HTMLDivElement>;

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
              zIndex: 2,
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
              <CheckCircle
                sx={{
                  color: flashcard.isDone ? '#26A716' : 'white',
                  padding: '4px 2px',
                }}
              />
              <Divider />
              <Edit sx={{ color: '#2E91D4', padding: '4px 2px' }} />
              <Divider />
              <Delete sx={{ color: '#FF7247', padding: '4px 2px' }} />
            </Stack>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: '0.2rem',
              right: '0.5rem',
              zIndex: 2,
              // backgroundColor: 'white',
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
