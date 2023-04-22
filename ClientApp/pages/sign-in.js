import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';
import { useState } from 'react';
import { gql, useQuery, useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
// import cache from '../components/cache.js'

const LOGIN_USER = gql`
  query LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      firstName
      lastName
      email
    }
  }
`;
const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
const theme = createTheme();

export default function SignIn() {


  const client = useApolloClient();
  const router = useRouter()
  const { loading, error, data, refetch } = useQuery(LOGIN_USER, {
    variables: { email: '', password: '' },
    skip: true,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    let formData = {
      email: data.get('email'),
      password: data.get('password'),
    }

    try {
      const { data } = await refetch({ email: formData.email, password: formData.password });
      console.log('User logged in successfully:', data.loginUser);
      // Save the user data or token in local storage or state management for further authentication
      client.writeQuery({
        query: gql`
        query IsUserLoggedIn {
          isLoggedIn
          userId
        }
        `,
        data: {
          isLoggedIn: true,
          userId: data.loginUser.id,
        },
      });

      // for now save in localStorage
      window.localStorage.setItem("userId", data.loginUser.id)
      window.localStorage.setItem("email", data.loginUser.email)
      window.localStorage.setItem("name", data.loginUser.firstName + " " + data.loginUser.lastName)

      console.log(
        window.localStorage.getItem("userId"),
        window.localStorage.getItem("email"),
        window.localStorage.getItem("name")
      )

      const data2 = client.readQuery({ query: IS_LOGGED_IN })
      console.log(data2)
      router.push('/my-products')
    } catch (error) {
      console.error(error);
      alert('Error logging in');
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h4">
            Teebay // Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Link href="/sign-up" variant="body2" >
                  "Don't have an account? Sign Up"
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}