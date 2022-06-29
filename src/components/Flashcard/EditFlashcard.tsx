import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useUpdateFlashcardMutation } from '../../generated/graphql';
import { Bars } from 'react-loader-spinner';

const EditFlashcard = ({ close, flashcard }: any) => {
  const [formState, setFormState] = React.useState({
    question: flashcard.question,
    answer: flashcard.answer,
    error: '',
  });

  const [updateFlashcardMutation, { loading }] = useUpdateFlashcardMutation({
    variables: {
      updateFlashcardId: flashcard.id,
      question: formState.question,
      answer: formState.answer,
    },
  });

  const handleSubmit = (e: any) => {
    console.log(e);
    e.preventDefault();
    updateFlashcardMutation({
      variables: {
        updateFlashcardId: flashcard.id,
        question: formState.question,
        answer: formState.answer,
      },
      onCompleted: () => {
        close();
      },
    });
  };
  return (
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
        disabled={
          formState.question === flashcard.question &&
          formState.answer === flashcard.answer
        }
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, bgcolor: '#543980' }}
        type="submit"
      >
        {loading ? (
          <Bars width={20} height={20} color="white" />
        ) : (
          'SAVE CHANGES'
        )}
      </Button>
    </Box>
  );
};

export default EditFlashcard;
