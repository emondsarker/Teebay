import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';
import { gql, useMutation } from '@apollo/client';

const SIGN_UP_USER = gql`
  mutation SignUpUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $address: String!
    $phone: String!
    $password: String!
    $activation: Boolean!
  ) {
    signUpUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      address: $address
      phone: $phone
      password: $password
      activation: $activation
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

const theme = createTheme();

export default function SignUp() {

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [signUpUser, { data }] = useMutation(SIGN_UP_USER);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let firstName = data.get('firstName')
    let lastName = data.get('lastName')
    let address = data.get('address')
    let email = data.get('email')
    let phone = data.get('phone')
    let password = data.get('password')
    let confirmPassword = data.get('confirmPassword')

    // perform validation (This can be done better, medium priority)
    // 1. Check if all fields are filled up
    // 2. Check if password == confirm password
    let fieldCheck = true
    let passwordCheck = true
    if (firstName == "" || lastName == "" || address == "" || email == "" || phone == "" || password == "" || confirmPassword == "") {
      setMessage("Fields cannot be empty!")
      setOpen(true)
      setIssue(true)
      fieldCheck = false
    }
    if (password != confirmPassword) {
      setMessage("Passwords Do Not Match")
      setOpen(true)
      setPasswordIssue(true)
      passwordCheck = false
    }

    let formData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      address: data.get('address'),
      phone: data.get('phone'),
      password: data.get('password'),
      activation: false,
    }

    if (passwordCheck && fieldCheck) {
      try {
        await signUpUser({ variables: { ...formData, activation: true } });
        setErrorSeverity("success")
        setMessage("Successfully created user")
        setOpen(true)
        setIssue(false)
        setPasswordIssue(false)
      } catch (error) {
        console.error(error);
        setErrorSeverity("error")
        setMessage("Server error: Cannot create user")
        setOpen(true)
      }
    }
  };

  const [open, setOpen] = useState(false);
  const [issue, setIssue] = useState(false)
  const [errorSeverity, setErrorSeverity] = useState("error")
  const [passwordIssue, setPasswordIssue] = useState(false)
  const [message, setMessage] = useState("Default")
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: '40%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h4">
            Teebay // Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={issue}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={issue}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  error={issue}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="email"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="email"
                  autoFocus
                  error={issue}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone No."
                  name="phone"
                  autoComplete="phone"
                  error={issue}
                />
              </Grid>
              <Grid item xs={12}>


                <TextField
                  required
                  error={passwordIssue}
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment:
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  error={passwordIssue}
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment:
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                  }}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background: "purple", '&:hover': { background: "purple" } }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Link href="/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity={errorSeverity} sx={{ width: '100%' }}>
          {message}
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
}