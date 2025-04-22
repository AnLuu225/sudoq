'use client';

import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

export default function CreatePuzzlePage() {
  const emptyGrid = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0));

  const [puzzle, setPuzzle] = useState(emptyGrid);
  const { user } = useAuth();

  const handleChange = (row, col, value) => {
    const newPuzzle = [...puzzle];
    const val = parseInt(value) || 0;
    newPuzzle[row][col] = val;
    setPuzzle(newPuzzle);
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

  const handleShare = async () => {
    if (!user) {
      alert('You must be logged in to share a puzzle!');
      return;
    }

    try {
      await addDoc(collection(db, 'puzzles'), {
        puzzle,
        createdBy: user.email,
        createdAt: serverTimestamp(),
        title: `Puzzle by ${user.email}`,
      });

      alert('🎉 Puzzle shared to homepage!');
    } catch (err) {
      console.error(err);
      alert('Failed to share puzzle.');
    }
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
          DIY (Clear)
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
