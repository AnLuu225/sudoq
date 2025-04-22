"use client";
// Homepage.js
import { useEffect, useState } from "react";
if (typeof window === "undefined") return null;
import React, { useState } from 'react';
import { Button, Container, Typography, Grid, TextField, Snackbar, Alert } from '@mui/material';
import Link from 'next/link';

const Homepage = () => {
  const [user, setUser] = useState(null); // Placeholder for user info (to be replaced by real authentication logic)
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLogin = (email, password) => {
    // Simulate login logic (e.g., check credentials from Firebase)
    if (email === 'user@example.com' && password === 'password123') {
      setUser({ name: 'User', puzzlesSolved: 5 });
    } else {
      setLoginError('Invalid email or password');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container sx={{ padding: 3 }}>
      <Typography variant="h4">Welcome to SudoQ!</Typography>

      {user ? (
        <>
          <Typography variant="h6">Hello, {user.name}</Typography>
          <Typography variant="body1">Puzzles Solved: {user.puzzlesSolved}</Typography>
        </>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Email" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" variant="outlined" fullWidth type="password" />
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" onClick={() => handleLogin('user@example.com', 'password123')}>
              Log In
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Link to="/sign-up" passHref>
              <Button variant="outlined" color="secondary">
                Sign Up
              </Button>
            </Link>
          </Grid>
        </Grid>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          {loginError}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Homepage;
