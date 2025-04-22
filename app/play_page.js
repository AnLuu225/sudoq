// PlayPage.js
import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { DosukuAPI } from 'sudoku-api';  // Assume you've set up the Dosuku API

const PlayPage = () => {
  const [puzzle, setPuzzle] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPuzzle = (type) => {
    setLoading(true);
    DosukuAPI.getPuzzle(type)
      .then((response) => {
        setPuzzle(response.data); // Assuming the API returns puzzle data
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching puzzle:', error);
        setLoading(false);
      });
  };

  return (
    <Container sx={{ padding: 3 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button variant="contained" onClick={() => fetchPuzzle('daily')} disabled={loading}>
            Daily Challenge
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => fetchPuzzle('random')} disabled={loading}>
            Play Random Puzzle
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : (
        puzzle && <div>{/* Display the puzzle here */}</div>
      )}
    </Container>
  );
};

export default PlayPage;