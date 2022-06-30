import { Cancel, CheckCircle, Delete, Edit, Person } from '@mui/icons-material';
import {
  Box,
  Divider,
  Stack,
  Tooltip,
  Typography,
  Button,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import moment from 'moment';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';
import React, { useState, useRef } from 'react';
import {
  useDeleteFlashcardMutation,
  useMarkAsDoneMutation,
} from '../../generated/graphql';
import { BallTriangle } from 'react-loader-spinner';
import EditFlashcard from './EditFlashcard';
import { User } from '../SideDrawer/Drawer';
import { QUERY_ALL_FLASHCARDS, SORT_BY_QUERY } from '../FlashcardsList/query';

//confirm Modal styles
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  boxShadow: 24,
  p: 3,
  lineHeight: 4,
};

export default function Flashcard({ flashcard }: any) {
  const [flip, setFlip] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleCloseModal = () => setOpen(false);

  const isOwner = () => {
    const strObj: any = localStorage.getItem('currentUser');
    const currentUser: User = JSON.parse(strObj);

    if (flashcard.postedBy.email === currentUser.email) {
      return true;
    } else {
      return false;
    }
  };

  const frontEl = useRef() as React.MutableRefObject<HTMLDivElement>;
  const backEl = useRef() as React.MutableRefObject<HTMLDivElement>;

  const [markAsDoneMutation, { loading }] = useMarkAsDoneMutation({
    variables: {
      updateFlashcardId: flashcard.id,
      isDone: true,
    },
  });

  const [deleteFlashcardMutation, { loading: deleteLoading }] =
    useDeleteFlashcardMutation({
      variables: {
        deleteFlashcardId: flashcard.id,
      },
    });

  const handleDelete = () => {
    setOpen(false);
    deleteFlashcardMutation({
      variables: {
        deleteFlashcardId: flashcard.id,
      },
      // refetchQueries: [{ query: QUERY_ALL_FLASHCARDS }],
      update: (cache, { data }) => {
        const currentFlaschcards: any = cache.readQuery({
          query: QUERY_ALL_FLASHCARDS,
        });

        cache.writeQuery({
          query: QUERY_ALL_FLASHCARDS,
          data: {
            flashcards: {
              flashcards: currentFlaschcards.flashcards.flashcards.filter(
                (flashcard: any) => flashcard.id !== data?.deleteFlashcard.id
              ),
            },
          },
        });
        cache.writeQuery({
          query: SORT_BY_QUERY,
          data: {
            flashcards: {
              flashcards: currentFlaschcards.flashcards.flashcards.filter(
                (flashcard: any) => flashcard.id !== data?.deleteFlashcard.id
              ),
            },
          },
        });
      },
    });
  };

  const classes = {
    iconBox: {
      display: 'flex',
      alifnItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        background: isOwner() ? 'white' : '',
      },
    },
    markAsDone: {
      display: 'flex',
      alifnItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        background: !flashcard.isDone ? 'white' : '',
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
          width: { xs: '90vw', sm: 360 },
          background: 'white',
          borderRadius: '0.25rem',
        }}
      >
        <Box sx={{ padding: '0 0.5rem' }}>
          <EditFlashcard close={handleClose} flashcard={flashcard} />
        </Box>
        <Tooltip title="cancel" arrow>
          <Cancel
            sx={{
              color: 'red',
              position: 'absolute',
              top: 0,
              right: 0,
              cursor: 'pointer',
            }}
            onClick={handleClose}
          />
        </Tooltip>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          height: { xs: '25vh', sm: 250 },
          width: { xs: '90vw', sm: 360 },
        }}
      >
        {!flip && (
          <div>
            <Box
              sx={{
                position: 'absolute',
                top: { xs: '0.3rem', sm: '0.5rem' },
                right: { xs: '0.2rem', sm: '0.6rem' },
                backgroundColor: 'white',
                padding: '0.5rem 0.5rem',
                transition: 'transform .2s',
                zIndex: 2,
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <Stack
                direction="row"
                sx={{
                  backgroundColor: '#F6CA8B',
                  boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.2)',
                  borderRadius: '7px',
                  cursor: 'pointer',
                }}
              >
                <Box sx={classes.markAsDone}>
                  {loading ? (
                    <BallTriangle width={20} height={20} color="blue" />
                  ) : (
                    <CheckCircle
                      sx={{
                        color: flashcard.isDone ? '#21AC0E' : '#868A88',
                      }}
                      onClick={() => {
                        if (!flashcard.isDone) {
                          markAsDoneMutation({
                            variables: {
                              updateFlashcardId: flashcard.id,
                              isDone: true,
                            },
                          });
                        }
                      }}
                    />
                  )}
                </Box>
                <Divider />
                <Box
                  sx={classes.iconBox}
                  onClick={() => isOwner() && setEditMode(true)}
                >
                  <Edit
                    sx={{ color: isOwner() ? '#2E91D4' : 'rgb(188, 184, 189)' }}
                  />
                </Box>
                <Divider />
                <Box sx={classes.iconBox}>
                  {deleteLoading ? (
                    <BallTriangle width={20} height={20} color="red" />
                  ) : (
                    <Delete
                      sx={{
                        color: isOwner() ? '#FF7247' : 'rgb(188, 184, 189)',
                      }}
                      onClick={() => {
                        if (isOwner()) {
                          setOpen(true);
                        }
                      }}
                    />
                  )}
                </Box>
              </Stack>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                bottom: '0.2rem',
                right: '0.5rem',
                zIndex: 2,
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
        <Tippy
          placement="left"
          theme="light-border"
          content={
            !flip ? 'Click to view the answer' : 'click to view the question'
          }
        >
          <Box
            className={`card ${flip ? 'flip' : ''}`}
            sx={{
              height: { xs: '25vh', sm: 250 },
              width: { xs: '90vw', sm: 360 },
            }}
            onClick={() => setFlip(!flip)}
          >
            <Box className="front" ref={frontEl}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem', fontWeight: 400 },
                }}
              >
                {flashcard.question}
              </Typography>
            </Box>
            <div className="back" ref={backEl}>
              <Typography variant="h6">{flashcard.answer}</Typography>
            </div>
          </Box>
        </Tippy>
      </Box>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Are you sure you want to delete this flashcard?
          </Typography>
          <Button
            variant="outlined"
            size="small"
            sx={{ mr: '1rem' }}
            onClick={handleDelete}
          >
            YES
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => setOpen(false)}
          >
            CANCEL
          </Button>
        </Box>
      </Modal>
    </>
  );
}
