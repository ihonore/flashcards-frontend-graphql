import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useCreateFlashcardMutation } from '../../generated/graphql';
import { Bars } from 'react-loader-spinner';
import { QUERY_ALL_FLASHCARDS, SORT_BY_QUERY } from '../FlashcardsList/query';
import { Cancel } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

const CreateFlashcard = ({ close }: any) => {
  const [formState, setFormState] = React.useState({
    question: '',
    answer: '',
    error: '',
  });

  const [createFlashcardMutation, { loading }] = useCreateFlashcardMutation({
    variables: {
      question: formState.question,
      answer: formState.answer,
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createFlashcardMutation({
      variables: {
        question: formState.question,
        answer: formState.answer,
      },
      onCompleted: () => {
        close();
      },
      // refetchQueries: [
      //   {
      //     query: QUERY_ALL_FLASHCARDS,
      //   },
      // ],
      ///
      update: (cache, { data }) => {
        const currentFlaschcards: any = cache.readQuery({
          query: QUERY_ALL_FLASHCARDS,
        });

        cache.writeQuery({
          query: QUERY_ALL_FLASHCARDS,
          data: {
            flashcards: {
              flashcards: [
                data?.createFlashcard,
                ...currentFlaschcards.flashcards.flashcards,
              ],
            },
          },
        });
        cache.writeQuery({
          query: SORT_BY_QUERY,
          data: {
            flashcards: {
              flashcards: [
                data?.createFlashcard,
                ...currentFlaschcards.flashcards.flashcards,
              ],
            },
          },
        });
      },
      ///
    });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '25vh', sm: 250 },
        width: { xs: '90vw', sm: 360 },
        background: 'rgba(255, 255, 255,0.8)',
        borderRadius: '0.25rem',
      }}
    >
      <Box sx={{ padding: '0 0.5rem' }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, background: '#D6FAE7', padding: '0 0.5rem' }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="question"
            label="Question"
            name="question"
            autoFocus
            value={formState.question}
            onChange={(e) =>
              setFormState({
                ...formState,
                question: e.target.value,
                error: '',
              })
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="answer"
            label="Answer"
            id="answer"
            value={formState.answer}
            onChange={(e) =>
              setFormState({
                ...formState,
                answer: e.target.value,
                error: '',
              })
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, background: '#543980' }}
          >
            {loading ? <Bars width={20} height={20} color="white" /> : 'SAVE'}
          </Button>
        </Box>
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
          onClick={close}
        />
      </Tooltip>
    </Box>
  );
};

export default CreateFlashcard;
