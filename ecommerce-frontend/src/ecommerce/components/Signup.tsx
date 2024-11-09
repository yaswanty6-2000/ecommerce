import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useHttpClient } from '../hooks/useHttpClient';

const Signup: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup } = useHttpClient();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const body = {
            name: name,
            email: email,
            password: password
        };
        signup(body)
            .then(res => {
                alert('User created successfully');
                navigate("/login");
            })
            .catch(err => {
                alert(err?.error);
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
                Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} maxWidth="400px" width="100%">
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    InputLabelProps={{
                        style: { color: 'white' }
                    }}
                    InputProps={{
                        style: { color: 'white' },
                        sx: { bgcolor: '#444' }
                    }}
                />
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
                    Sign Up
                </Button>
            </Box>
            <Box mt={2}>
                <Typography variant="body2">
                    Already have an account?{' '}
                    <Link component={RouterLink} to="/login" color="inherit" underline="hover">
                        Login
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Signup;
