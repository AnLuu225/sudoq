import { useRouter } from 'next/router';
import { Button, Container, Typography } from '@mui/material';

export default function Home() {
  const router = useRouter();

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h3" gutterBottom>Welcome to SudoQ</Typography>
      <Typography variant="body1" mb={4}>
        Solve daily puzzles or create your own.
      </Typography>
      <Button variant="contained" onClick={() => router.push('/login')} sx={{ mr: 2 }}>
        Login
      </Button>
      <Button variant="outlined" onClick={() => router.push('/signup')}>
        Sign Up
      </Button>
    </Container>
  );
}
