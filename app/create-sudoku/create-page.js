'use client';

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export default function Create() {
  const emptyGrid = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0));

  const [puzzle, setPuzzle] = useState(emptyGrid);

  const handleChange = (row, col, value) => {
    const updated = [...puzzle];
    const val = parseInt(value) || 0;
    updated[row][col] = val;
    setPuzzle(updated);
  };

  const handleGenerate = async () => {
    const res = await fetch('https://sudoku-api.vercel.app/api/dosuku');
    const data = await res.json();
    const grid = data.newboard.grids[0].value;
    setPuzzle(grid);
  };

  const handleClear = () => {
    setPuzzle(emptyGrid);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(puzzle)], {
      type: 'application/json',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sudoku-puzzle.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    alert('🔗 Puzzle shared! (Simulated – add Firebase logic here)');
    // Optional: Save puzzle to Firestore
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Create Your Sudoku Puzzle
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 40px)',
          gridTemplateRows: 'repeat(9, 40px)',
          gap: '4px',
          justifyContent: 'center',
          my: 4,
        }}
      >
        {puzzle.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <TextField
              key={`${rowIndex}-${colIndex}`}
              value={value === 0 ? '' : value}
              inputProps={{
                maxLength: 1,
                style: { textAlign: 'center' },
              }}
              onChange={(e) =>
                handleChange(rowIndex, colIndex, e.target.value)
              }
              variant="outlined"
              size="small"
              sx={{ width: '40px', height: '40px' }}
            />
          ))
        )}
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
        <Button variant="outlined" onClick={handleGenerate}>
          Generate
        </Button>
        <Button variant="outlined" onClick={handleClear}>
          DIY (Clear Grid)
        </Button>
        <Button variant="contained" onClick={handleShare}>
          Share
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDownload}>
          Download
        </Button>
      </Box>
    </Container>
  );
}
