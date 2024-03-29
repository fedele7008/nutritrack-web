import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from "../hooks/Auth";
import { TextField, Button, Grid, Typography, Paper, Link, Alert } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);
    const [alert, setAlert] = useState('');
    const { login } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
      if (searchParams.get('alert')) {
        setAlert(searchParams.get('alert'));
      }
    }, [])

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
      <div>
      
      <Grid container justifyContent="center" alignItems="center" style={{
        height: "100vh",
      }}>   
      <Grid item xs={12} sm={12} md={12}>   
      {alert && <Alert severity="error" sx={{ padding: '10px', margin: '30px'}}>{alert}</Alert>}
      </Grid>  
        <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} sx={{ padding: '20px', marginTop: '40px' }}>
          <Typography variant="h5" align="center" gutterBottom>
            <b>Sign In</b>
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
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ backgroundColor: '#15603C', "&:hover": {
              backgroundColor: '#0E4028',}}}>
              Sign In
            </Button>
          </form>
          <br />
          <Typography align='center'>Don't have an account yet? <Link href="/signup" align="center">Sign up!</Link></Typography>
          
          </Paper>
        </Grid>
      </Grid>
      </div>
    );
};

export default Login;