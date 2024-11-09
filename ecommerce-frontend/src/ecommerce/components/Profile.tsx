import React, { useState } from 'react';
import { Box, Button, Card, CardContent, IconButton, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

interface UserProfile {
    name: string;
    email: string;
}

const Profile: React.FC = () => {
    const [user, setUser] = useState<UserProfile>({
        name: 'John Doe', // Replace with fetched data in a real scenario
        email: 'johndoe@example.com' // Replace with fetched data in a real scenario
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState<UserProfile>(user);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setEditedUser(user);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSave = () => {
        setUser(editedUser);
        
        setIsEditing(false);
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f4f6f8">
            <Card sx={{ maxWidth: 400, width: '100%', bgcolor: '#333', color: 'white', p: 2 }}>
                <CardContent>
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
                            value={isEditing ? editedUser.name : user.name}
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
                            value={isEditing ? editedUser.email : user.email}
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
    );
};

export default Profile;
