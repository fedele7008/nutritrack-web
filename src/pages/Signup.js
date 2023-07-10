import React, { useState } from 'react';
import { useAuth } from "../hooks/Auth";
import { TextField, Button, Grid, Typography, Paper, Link } from '@mui/material';

const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [matchingPassword, setMatchingPassword] = useState(true);
    const [signupFailed, setSignupFailed] = useState(false);    
    const { signup } = useAuth();

    const handleSignup = async (event) => { 
      event.preventDefault();

      if (password.length < 8) {
        setValidPassword(false);
        return
      }

      // Perform signup validation
      if (password !== confirmPassword) {
        setMatchingPassword(false);
      }

      let res = await signup({ name, email, password });
      if (!res) {
        setSignupFailed(true);
        setName('');
        setEmail('');
        setValidEmail(true);
        setPassword('');
        setValidPassword(true);
        setConfirmPassword('');
        setMatchingPassword(true);
        console.log("setting signup failed to true")
      }        
    }

    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={3} sx={{ padding: '20px', marginTop: '40px' }}>
            <Typography variant="h5" align="center" gutterBottom>
            <b>Sign up!</b>
            </Typography>
            {signupFailed && <Typography align="center" color="error">Signup failed, please try again.</Typography>}
            <form onSubmit={handleSignup}>
              <TextField
                label="Name"
                variant="outlined"
                required
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!validEmail}
                helperText={validEmail ? "" : "Invalid email"}
                margin="normal"
              />
              <TextField
                label="Password"
                variant="outlined"
                required
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!validPassword || (password.length < 8 && password.length > 0)}
                helperText={(!validPassword || (password.length < 8 && password.length > 0)) && "Password must have at least 8 characters"}
                margin="normal"
              />
              <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!matchingPassword || (password !== confirmPassword && confirmPassword.length > 0)}
                helperText={(!matchingPassword || (password !== confirmPassword && confirmPassword.length > 0)) && 'Passwords do not match'}
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Sign up
              </Button>
            </form>
            <br />
            <Typography align='center'>Already have an account? <Link href="/login" align="center">Log in!</Link></Typography>
          </Paper>
        </Grid>
      </Grid>
    );
};

export default Login;