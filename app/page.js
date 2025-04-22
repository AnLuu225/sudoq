"use client";
import React, { useState } from "react";
import { Button, Container, Typography, Grid, TextField, Snackbar, Alert } from '@mui/material';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; 
import Link from 'next/link';

const Homepage = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const [loginError, setLoginError] = useState(""); 

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser({ email });
    } catch (error) {
      setLoginError("Invalid email or password");
      setOpenSnackbar(true);
    }
  };

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
        <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              align="center"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              align="center"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" align="center" onClick={handleLogin}>
              Log In
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" align="center" onClick={handleSignUp}>
              Sign Up
            </Button>
          </Grid>
          </Grid>
          </>
        
      )}

        <Grid container spacing={2} marginTop={4}>
        <Grid item xs={4}>
            <Link href="\play\play_page.html" passHref>
            <Button variant="contained" fullWidth>
                Play Sudoku
            </Button>
            </Link>
        </Grid>
        <Grid item xs={4}>
            <Link href="\create\create_page.html" passHref>
            <Button variant="contained" fullWidth>
                Create Puzzle
            </Button>
            </Link>
        </Grid>
        <Grid item xs={4}>
            <Link href="\about\about_page.html" passHref>
            <Button variant="contained" fullWidth>
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
