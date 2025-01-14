import {  createContext, useState, useEffect,useContext } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [error, setError] = useState(null);

    const signup = async (userData) => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", userData);
            setUser(response.data);
            setIsAuth(true);
            setError(null); // Limpiar errores previos
        } catch (error) {
            console.error("Signup Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Registration failed");
        }
    };
    const login = async (userData) => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", userData);
            setUser(response.data);
            setIsAuth(true);
            setError(null); // Limpiar errores previos
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Error al iniciar sesión");
        }
    }

    const profile = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/auth/profile");
            setUser(response.data);
            setIsAuth(true);
            setError(null); // Limpiar errores previos
        } catch (error) {
            console.error("Profile Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Error al cargar perfil");
        }
    }

    const logout = async () => {
        try {
            await axios.post("http://localhost:8080/api/auth/logout");
            setUser(null);
            setIsAuth(false);
            setError(null); // Limpiar errores previos
        } catch (error) {
            console.error("Logout Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Error al cerrar sesión");
        }
    }

    return (
        <AuthContext.Provider
            value={{
                signup,
                login,
                profile,
                logout,
                user,
                isAuth,
                error, // Proveer error al resto de la app
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
