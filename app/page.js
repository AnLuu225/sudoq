"use client";

import { useRouter } from "next/navigation";
import { Button, Typography, Container, Box } from "@mui/material";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 10,
        textAlign: "center",
      }}
    >
      <Image
        src="/sudoku-logo.png" // replace with your logo
        alt="SudoQ Logo"
        width={100}
        height={100}
      />
      <Typography variant="h2" gutterBottom sx={{ mt: 4 }}>
        Welcome to SudoQ
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Your daily dose of Sudoku – play, create, share!
      </Typography>

      <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
        <Button variant="contained" onClick={() => router.push("/play")}>
          Play Puzzle
        </Button>
        <Button variant="outlined" onClick={() => router.push("/create")}>
          Create Puzzle
        </Button>
        <Button variant="outlined" onClick={() => router.push("/about")}>
          About
        </Button>
      </Box>

      <Box sx={{ mt: 6, display: "flex", gap: 2 }}>
        <Button variant="text" onClick={() => router.push("/login")}>
          Login
        </Button>
        <Button variant="text" onClick={() => router.push("/signup")}>
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}
