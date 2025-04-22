import { Container, Button, Typography } from "@mui/material";

export default function Create() {
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Create Your Sudoku</Typography>
      <Button variant="contained" sx={{ mr: 2 }}>Generate Puzzle</Button>
      <Button variant="outlined">DIY</Button>
    </Container>
  );
}
