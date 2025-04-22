// CreateSudokuPage.js
import React, { useState } from 'react';
import { Button, Container, Grid, TextField } from '@mui/material';

const CreatePage = () => {
  const [grid, setGrid] = useState(Array(9).fill(Array(9).fill(''))); // 9x9 Sudoku grid

  const handleChange = (row, col, value) => {
    const newGrid = [...grid];
    newGrid[row][col] = value;
    setGrid(newGrid);
  };

  const handleSubmit = () => {
    console.log('Puzzle created:', grid);
    // Post puzzle to Firebase or store locally
  };

  return (
    <Container sx={{ padding: 3 }}>
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
