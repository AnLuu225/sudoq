'use client';

import { useEffect, useState } from 'react';
import { Button, Container, TextField, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Play() {
  const [puzzle, setPuzzle] = useState([]);
  const [original, setOriginal] = useState([]);
  const router = useRouter();

  const fetchPuzzle = async () => {
    const res = await fetch("https://sudoku-api.vercel.app/api/dosuku");
    const data = await res.json();
    const grid = data.newboard.grids[0].value;
    setPuzzle(grid);
    setOriginal(JSON.parse(JSON.stringify(grid))); // deep copy
  };

  const handleChange = (row, col, value) => {
    const updated = [...puzzle];
    const val = parseInt(value) || 0;
    updated[row][col] = val;
    setPuzzle(updated);
  };

  const handleRestart = () => {
    setPuzzle(JSON.parse(JSON.stringify(original)));
  };

  const handleExit = () => {
    router.push("/");
  };

  const handleSubmit = () => {
    const flat = puzzle.flat();
    if (flat.includes(0)) {
      alert("🧐 - Puzzle not complete!");
    } else {
      alert("🎉 - Good job!");
    }
  };

  useEffect(() => {
    fetchPuzzle();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Daily Sudoku Challenge</Typography>
      {puzzle.length > 0 && (
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
            row.map((value, colIndex) => {
              const isFixed = original[rowIndex][colIndex] !== 0;
              return (
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
                  disabled={isFixed}
                  variant="outlined"
                  size="small"
                  sx={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: isFixed ? '#eee' : 'white',
                  }}
                />
              );
            })
          )}
        </Box>
      )}/

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            <Button variant="outlined" onClick={handleRestart}>Restart</Button>
            <Button variant="text" onClick={handleExit}>Exit</Button>
          </Box>
    </Container>
  );
}
