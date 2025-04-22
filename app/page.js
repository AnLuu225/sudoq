"use client";
import React, { useState } from "react";
import { Button, Container, Typography, Grid, TextField, Snackbar, Alert } from '@mui/material';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Path to your Firebase config
import Link from 'next/link';

const Homepage = () => {
  const [user, setUser] = useState(null); // State to store user data after authentication
  const [email, setEmail] = useState(""); // Email input
  const [password, setPassword] = useState(""); // Password input
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar visibility
  const [loginError, setLoginError] = useState(""); // Login error message

  // Handle Login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser({ email });
    } catch (error) {
      setLoginError("Invalid email or password");
      setOpenSnackbar(true);
    }
  };

  // Handle Sign-Up
  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setUser({ email });
    } catch (error) {
      setLoginError("Error creating account. Please try again.");
      setOpenSnackbar(true);
    }
  };

  return (
    <div style={{
        backgroundColor: "#fffafa", 
        backgroundSize: "cover", 
        height: "100vh"
      }}>
    <Container sx={{ padding: 3 }}>
      <Typography variant="h4" color="black" align="center">Welcome to SudoQ!</Typography>

      {user ? (
        <>
          <Typography variant="h6">Hello, {user.email}</Typography>
        </>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Log In
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" color="secondary" onClick={handleSignUp}>
              Sign Up
            </Button>
          </Grid>
          </Grid>
        
      )}

        <Grid container spacing={2} marginTop={4}>
        <Grid item xs={4}>
            <Link href="/play" passHref>
            <Button variant="contained" fullWidth>
                Play Sudoku
            </Button>
            </Link>
        </Grid>
        <Grid item xs={4}>
            <Link href="/create" passHref>
            <Button variant="outlined" fullWidth>
                Create Puzzle
            </Button>
            </Link>
        </Grid>
        <Grid item xs={4}>
            <Link href="/about" passHref>
            <Button variant="text" fullWidth>
                About
            </Button>
            </Link>
        </Grid>
        </Grid>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: "100%" }}>
          {loginError}
        </Alert>
      </Snackbar>
    </Container>
    </div>
  );
};

export default Homepage;
