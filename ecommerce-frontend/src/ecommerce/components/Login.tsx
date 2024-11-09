import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useHttpClient } from '../hooks/useHttpClient';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useHttpClient();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const body = {
            email: email,
            password: password
        };
        login(body)
            .then(res => {
                const token = res.data?.token;
                if (token) {
                    localStorage.setItem("auth_token", token);
                    navigate("/products");
                }
            })
            .catch(err => {
                console.log('Error', e);
            })
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            bgcolor="#333"
            color="white"
        >
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} maxWidth="400px" width="100%">
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputLabelProps={{
                        style: { color: 'white' }
                    }}
                    InputProps={{
                        style: { color: 'white' },
                        sx: { bgcolor: '#444' }
                    }}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputLabelProps={{
                        style: { color: 'white' }
                    }}
                    InputProps={{
                        style: { color: 'white' },
                        sx: { bgcolor: '#444' }
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        mt: 3,
                        bgcolor: 'white',
                        color: '#333',
                        '&:hover': { bgcolor: '#666', color: 'white' }
                    }}
                >
                    Login
                </Button>
            </Box>
            <Box mt={2}>
                <Typography variant="body2">
                    Don’t have an account?{' '}
                    <Link component={RouterLink} to="/signup" color="inherit" underline="hover">
                        Signup
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Login;
