// Play.js
import React, { useEffect, useState } from 'react';
import { Container, Button, Typography } from '@mui/material';

const Play = () => {
  const [puzzle, setPuzzle] = useState(null);

  const fetchDailyPuzzle = async () => {
    const res = await fetch('https://sudoku-api.vercel.app/api/dosuku');
    const data = await res.json();
    setPuzzle(data.newboard.grids[0].value); // 9x9 array
  };

  useEffect(() => {
    fetchDailyPuzzle();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Daily Sudoku</Typography>
      {/* Render SudokuGrid with puzzle */}
      <Button onClick={fetchDailyPuzzle}>Restart</Button>
    </Container>
  );
};

export default Play;
