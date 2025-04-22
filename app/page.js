'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  // Simulated puzzles (replace with Firestore fetch if needed)
  const sharedPuzzles = [
    {
      id: '1',
      creator: 'user1@example.com',
      title: 'Super Hard Puzzle',
    },
    {
      id: '2',
      creator: 'user2@example.com',
      title: 'Chill Medium Puzzle',
    },
  ];

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to SudoQ 🧩
      </Typography>

      {!loading && user ? (
        <>
          <Typography variant="h6" gutterBottom>
            Logged in as: {user.email}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            Achievements: <strong>🎉 {Math.floor(Math.random() * 10)} puzzles solved</strong>
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Button variant="contained" onClick={() => router.push('/play')}>
              Play Daily Puzzle
            </Button>
            <Button variant="outlined" onClick={() => router.push('/create')}>
              Create Puzzle
            </Button>
            <Button color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </>
      ) : (
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Button variant="contained" onClick={() => router.push('/login')}>
            Log In
          </Button>
          <Button variant="outlined" onClick={() => router.push('/signup')}>
            Sign Up
          </Button>
        </Box>
      )}

      {/* Shared Puzzles Section */}
      <Typography variant="h5" gutterBottom>
        🧠 Community Shared Puzzles
      </Typography>
      <Grid container spacing={2}>
        {sharedPuzzles.map((puzzle) => (
          <Grid item xs={12} sm={6} md={4} key={puzzle.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{puzzle.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  By: {puzzle.creator}
                </Typography>
                <Button
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={() => alert(`Open Puzzle ID ${puzzle.id}`)}
                >
                  Play Puzzle
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
