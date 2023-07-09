import React, { useState } from 'react';
import { useAuth } from "../hooks/Auth";

const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);
    const { signup } = useAuth();

    const handleSignup = async () => { 
      let res = await signup({ name, email, password });
      if (!res) {
        setLoginFailed(true);
        console.log("setting signup failed to true")
      }
        
    }

    return (
        <div>
            <input onChange={e => setName(e.target.value)} placeholder="Name"/>
            <input onChange={e => setEmail(e.target.value)} placeholder="Email"/>
            <input onChange={e => setPassword(e.target.value)} placeholder="Password"/>
            <button onClick={handleSignup} type="submit">Login</button>
            {loginFailed && <div>Signup failed, try again</div>}
        </div>
    )
};

export default Login;