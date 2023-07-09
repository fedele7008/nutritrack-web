import React, { useState } from 'react';
import { useAuth } from "../hooks/Auth";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);
    const { login } = useAuth();

    const handleLogin = async () => { 
      let res = await login({ email, password });
      if (!res) {
        setLoginFailed(true);
        console.log("setting login failed to true")
      }
        
    }

    return (
        <div>
            <input onChange={e => setEmail(e.target.value)} placeholder="Email"/>
            <input onChange={e => setPassword(e.target.value)} placeholder="Password"/>
            <button onClick={handleLogin} type="submit">Login</button>
            {loginFailed && <div>Login failed, try again</div>}
        </div>
    )
};

export default Login;