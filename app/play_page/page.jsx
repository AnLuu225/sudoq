"use client";
import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Grid, CircularProgress } from "@mui/material";
//import { fetchSudokuPuzzle } from "sudoku-api.vercel.app/api/dosuku";
import { useRouter } from "next/navigation";

const PlayPage = () => {
  const [puzzle, setPuzzle] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadPuzzle = async () => {
    setLoading(true);
    const data = await fetch(sudoku-api.vercel.app/api/dosuku);
    if (data?.newboard?.grids[0]?.value) {
      setPuzzle(data.newboard.grids[0].value);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPuzzle();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Daily Sudoku Challenge
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={0.5}>
            {puzzle.map((row, rowIndex) => (
              <Grid container item xs={12} key={rowIndex} justifyContent="center">
                {row.map((cell, colIndex) => (
                  <Grid item key={colIndex}>
                    <input
                      type="text"
                      defaultValue={cell === 0 ? "" : cell}
                      maxLength={1}
                      style={{
                        width: 40,
                        height: 40,
                        textAlign: "center",
                        margin: "1px",
                        fontSize: "1.2em",
                        border: "1px solid #ccc"
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={2} mt={2} justifyContent="center">
            <Grid item><Button variant="outlined" onClick={loadPuzzle}>Restart</Button></Grid>
            <Grid item><Button variant="outlined" onClick={() => router.push("/")}>Exit</Button></Grid>
            <Grid item><Button variant="contained">Validate</Button></Grid>
            <Grid item><Button variant="contained" color="success">Submit</Button></Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default PlayPage;
