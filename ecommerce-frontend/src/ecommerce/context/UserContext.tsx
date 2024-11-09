import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserContextType = {
    username: string;
    email: string;
    setUser: (username: string, email: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const setUser = (username: string, email: string) => {
        setUsername(username);
        setEmail(email);
    };

    return (
        <UserContext.Provider value={{ username, email, setUser }}>
            {children}
        </UserContext.Provider>
    );
};


export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
