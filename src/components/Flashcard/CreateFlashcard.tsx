import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useCreateFlashcardMutation } from '../../generated/graphql';
import { Bars } from 'react-loader-spinner';

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

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '25vh', sm: 250 },
        width: { xs: '90vw', sm: 400 },
        background: 'rgba(255, 255, 255,0.8)',
        borderRadius: '0.25rem',
      }}
    >
      <Box sx={{ padding: '0 0.5rem' }}>
        <Box component="form" noValidate sx={{ mt: 1, background: '#D6FAE7' }}>
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
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              createFlashcardMutation({
                variables: {
                  question: formState.question,
                  answer: formState.answer,
                },
                onCompleted: () => {
                  close();
                },
              });
            }}
          >
            {loading ? <Bars width={20} height={20} color="white" /> : 'SAVE'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateFlashcard;
