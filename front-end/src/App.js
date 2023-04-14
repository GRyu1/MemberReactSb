import { Container } from '@mui/material';
import NavBar from './component/route/NavBar';
import AppRouter from './component/route/RouterComponent';
import React from 'react';

function App() {
  return (
    <div className="App">
      <NavBar />
        <Container>
          <AppRouter/>
        </Container>
    </div>
  );
}

export default App;
