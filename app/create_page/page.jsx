"use client";
// CreatePage.js
import React, { useState } from 'react';
import { Button, Container, Grid, TextField } from '@mui/material';

const CreatePage = () => {
  const [grid, setGrid] = useState(Array(9).fill(Array(9).fill(''))); // 9x9 Sudoku grid

  const handleChange = (row, col, value) => {
    if (value === '' || /^[1-9]$/.test(value)) { // Allow only numbers 1-9 or empty input
        const newGrid = grid.map((r, rowIndex) => 
          rowIndex === row ? r.map((c, colIndex) => colIndex === col ? value : c) : r
        );
        setGrid(newGrid);
      }
    };

  const handleSubmit = () => {
    console.log('Puzzle created:', grid);
    // Post puzzle to Firebase or store locally
  };

  return (
    <Container sx={{ padding: 3, backgroundColor: 'white' }}>
      <Grid container spacing={2}>
        {grid.map((row, rowIndex) => (
          <Grid container item xs={12} spacing={2} key={rowIndex}>
            {row.map((value, colIndex) => (
              <Grid item xs={1} key={colIndex}>
                <TextField
                  value={value}
                  onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                  variant="outlined"
                  inputProps={{ maxLength: 1 }}
                  fullWidth
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: 2 }}>
        Submit Puzzle
      </Button>
    </Container>
  );
};

export default CreatePage;
