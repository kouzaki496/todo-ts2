// app/page.tsx
"use client";

import * as React from 'react';
import { Button } from '@mui/material';

export default function Home() {
  return (
    <div>
      <h1>Hello, MUI!</h1>
      <Button variant="contained" color="primary">
        Primary Button
      </Button>
      <Button variant="contained" color="secondary">
        Secondary Button
      </Button>
    </div>
  );
}