import React, { useState } from 'react';
import { Box, Button, Card, CardContent, IconButton, TextField, Typography, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useUser } from '../context/UserContext';
import { useHttpClient } from '../hooks/useHttpClient';
import Navbar from './Navbar';

const Profile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { username, email, setUser } = useUser();
    const { updateProfile } = useHttpClient();

    const [editedUser, setEditedUser] = useState({ name: username, email: email });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setEditedUser({ name: username, email: email });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        updateProfile(editedUser)
            .then(res => {
                alert('Profile updated successfully');
                setUser(editedUser.name, editedUser.email);
                setIsEditing(false);
            })
            .catch(err => {
                alert('Error updating profile');
            });
    };

    return (
        <>
            <Navbar />
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f4f6f8">
            <Card sx={{ maxWidth: 400, width: '100%', bgcolor: '#333', color: 'white', p: 2 }}>
                <CardContent>
                        <Box display="flex" justifyContent="center" mb={3}>
                            <Avatar
                                src="/path/to/profile-logo.jpg"
                                alt="Profile Logo"
                                sx={{ width: 100, height: 100 }}
                            />
                        </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h5">User Profile</Typography>
                        <IconButton
                            color="primary"
                            onClick={handleEditToggle}
                            sx={{ color: 'white' }}
                        >
                            {isEditing ? <CancelIcon /> : <EditIcon />}
                        </IconButton>
                    </Box>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Name"
                            name="name"
                            fullWidth
                            variant="outlined"
                                value={isEditing ? editedUser.name : username}
                            onChange={handleChange}
                            disabled={!isEditing}
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{
                                style: { color: 'white' },
                                sx: { bgcolor: '#444', borderRadius: '5px' }
                            }}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            fullWidth
                            variant="outlined"
                                value={isEditing ? editedUser.email : email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            InputLabelProps={{ style: { color: 'white' } }}
                            InputProps={{
                                style: { color: 'white' },
                                sx: { bgcolor: '#444', borderRadius: '5px' }
                            }}
                        />
                    </Box>
                    {isEditing && (
                        <Box mt={3} display="flex" justifyContent="center" gap={2}>
                            <Button
                                variant="contained"
                                onClick={handleSave}
                                startIcon={<SaveIcon />}
                                sx={{ bgcolor: 'white', color: '#333', '&:hover': { bgcolor: '#666', color: 'white' } }}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Box>
        </>
    );
};

export default Profile;