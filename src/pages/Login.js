import React, { useState } from 'react';
import { useAuth } from "../hooks/Auth";
import { TextField, Button, Grid, Typography, Paper, Link } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);
    const { login } = useAuth();

    const handleLogin = async (event) => { 
      event.preventDefault(); // prevent page from refreshing
      let res = await login({ email, password });
      if (!res) {
        setLoginFailed(true);
        setEmail('');
        setPassword('');
      }
    }

    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: '20px', marginTop: '40px' }}>
          <Typography variant="h5" align="center" gutterBottom>
            <b>Welcome back!</b>
          </Typography>
          {loginFailed && <Typography align="center" color="error">Login failed, please try again.</Typography>}
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              required
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Password"
              required
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Log In
            </Button>
          </form>
          <br />
          <Typography align='center'>No account yet? <Link href="/signup" align="center">Sign up!</Link></Typography>
          
          </Paper>
        </Grid>
      </Grid>
    );
};

export default Login;