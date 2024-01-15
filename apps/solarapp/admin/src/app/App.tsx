import './App.css';
import { Button, Typography } from '@mui/material';
import { Route, Routes, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export function App() {
  return (
    <div>
      <h1>
        <span> Hello there, </span>
        Welcome solaradmin 👋
      </h1>
      <Button>hello</Button>
      <Button
        onClick={() => {
          toast('New Message', {
            type: 'default',
          });
        }}
      >
        Notify
      </Button>
      hello there
      <Typography>hello</Typography>
    </div>
  );
}

export default App;
