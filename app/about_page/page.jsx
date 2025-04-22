"use client";
// AboutPage.js
import React, { useState } from 'react';
import { Button, TextField, Container, Snackbar, Alert } from '@mui/material';

const AboutPage = () => {
  const [feedback, setFeedback] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleFeedbackSubmit = () => {
    // Submit feedback to Firestore or backend
    setOpenSnackbar(true);
    setFeedback('');
  };

  return (
    <Container sx={{ padding: 3 }}>
      <TextField
        label="Your Feedback"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleFeedbackSubmit} sx={{ marginTop: 2 }}>
        Submit Feedback
      </Button>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Thank you for your feedback!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AboutPage;
