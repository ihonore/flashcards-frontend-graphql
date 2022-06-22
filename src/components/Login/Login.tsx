import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TailSpin } from 'react-loader-spinner';
import { useLoginMutation, useSignupMutation } from '../../generated/graphql';
import { useNavigate } from 'react-router-dom';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" target="_blank" href="https://ihonore.netlify.app/">
        ihonore.netlify.app
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [login, setLogin] = React.useState(true);

  const [formState, setFormState] = React.useState({
    email: '',
    password: '',
    name: '',
    error: '',
  });

  const navigate = useNavigate();

  const [loginMutation, { loading, error }] = useLoginMutation({
    variables: {
      email: formState.email,
      password: formState.password,
    },
  });

  const [signupMutation, { loading: signupLoading, error: signupError }] =
    useSignupMutation({
      variables: {
        email: formState.email,
        password: formState.password,
        name: formState.name,
      },
    });

  const handleLogin = () => {
    const { name, email, password } = formState;
    let emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

    if (
      (login && (email === '' || password === '')) ||
      (!login && (name === '' || email === '' || password === ''))
    ) {
      setFormState({
        ...formState,
        error: 'Please Fill all the fields',
      });
    } else if (!emailRegex.test(formState.email)) {
      setFormState({
        ...formState,
        error: 'Enter a valid email address',
      });
    } else {
      console.log(formState);
      if (login) {
        loginMutation({
          variables: {
            email: formState.email,
            password: formState.password,
          },
          onCompleted: async ({ login }) => {
            await localStorage.setItem('userToken', login.token);
            await localStorage.setItem(
              'currentUser',
              JSON.stringify({
                name: login.user.name,
                email: login.user.email,
              })
            );
            navigate('/dashboard');
          },
          onError: () => {
            setFormState({
              ...formState,
              error: error?.message || 'Invalid Credentials',
            });
          },
        });
      } else {
        signupMutation({
          variables: {
            name: formState.name,
            email: formState.email,
            password: formState.password,
          },
          onCompleted: async ({ signup }) => {
            await localStorage.setItem('userToken', signup.token);
            await localStorage.setItem(
              'currentUser',
              JSON.stringify({
                name: signup.user.name,
                email: signup.user.email,
              })
            );
            navigate('/dashboard');
          },
          onError: () => {
            setFormState({
              ...formState,
              error: signupError?.message || 'Email already exists',
            });
          },
        });
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ backgroundColor: 'white' }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {login ? 'Sign In' : 'Sign Up'}
          </Typography>
          <Typography component="h5" variant="body1" sx={{ color: 'red' }}>
            {formState.error && `${formState.error}`}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            {!login && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Your names"
                name="name"
                autoComplete="name"
                autoFocus
                value={formState.name}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    name: e.target.value,
                    error: '',
                  })
                }
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={formState.email}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  email: e.target.value,
                  error: '',
                })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formState.password}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  password: e.target.value,
                  error: '',
                })
              }
            />
            {login && (
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            )}
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              {loading || signupLoading ? (
                <TailSpin color="skyblue" height={30} width={30} />
              ) : login ? (
                'Login In'
              ) : (
                'SIGN UP'
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Typography
                  color="primary"
                  variant="body2"
                  sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                  onClick={() => setLogin(!login)}
                >
                  {login ? "Don't have an account? Sign Up" : 'Back to login'}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
