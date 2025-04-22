import { Container, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function About() {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    // Save to Firebase if needed
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>About SudoQ</Typography>
      <Typography gutterBottom>This app lets you play or build Sudoku puzzles.</Typography>

      {!submitted ? (
        <>
          <TextField fullWidth multiline rows={4} label="Your Feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
          <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>Submit Feedback</Button>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 2 }}>Thank you for your feedback!</Typography>
          <Button variant="outlined" href="/">Return to Homepage</Button>
        </>
      )}
    </Container>
  );
}
