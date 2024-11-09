import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useHttpClient } from '../hooks/useHttpClient';

const Signup: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
    const { signup } = useHttpClient();
    const navigate = useNavigate();

    // Regex for password and email validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const validateForm = () => {
        const newErrors: { name?: string; email?: string; password?: string } = {};
        
        // Validate Name
        if (!name) newErrors.name = 'Name is required';
        
        // Validate Email
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Invalid email format';
        }

        // Validate Password
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (!passwordRegex.test(password)) {
            newErrors.password =
                'Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const body = { name, email, password };
        signup(body)
            .then((res) => {
                alert('User created successfully');
                navigate('/login');
            })
            .catch((err) => {
                alert(err?.error);
            });
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
                    error={!!errors.name}
                    helperText={errors.name}
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
                    error={!!errors.email}
                    helperText={errors.email}
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
                    error={!!errors.password}
                    helperText={errors.password}
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
