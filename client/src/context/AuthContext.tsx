import { createContext, useContext, useEffect, useState } from "react";
import type { IUser } from "../assets/assets";
import api from "../configs/api";
import { toast } from "react-hot-toast";

interface AuthContextProps {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    login: (user: { email: string; password: string }) => Promise<void>;
    signUp: (user: { name: string; email: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    user: null,
    setUser: () => {},
    login: async () => {},
    signUp: async () => {},
    logout: async () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    // ✅ Set Authorization header when component mounts (if token exists)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Optionally: verify token is still valid and fetch user data
        }
    }, []);

    const signUp = async ({ name, email, password }: { name: string; email: string; password: string }) => {
        try {
            console.log('🔵 AuthContext signUp called');
            const { data } = await api.post('/api/auth/register', { name, email, password });
            
            console.log('🟢 Signup response:', data);

            // ✅ Save JWT token to localStorage
            if (data.token) {
                localStorage.setItem('token', data.token);
                api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                console.log('✅ Token saved to localStorage');
            }

            // Extract user data from response
            const userData = data.user;

            if (userData) {
                setUser(userData as IUser);
                setIsLoggedIn(true);
                toast.success(data.message || 'Account created successfully!');
                console.log('✅ Signup successful, user state set');
            } else {
                const errorMsg = "Server returned success but no user data found";
                console.error("❌", errorMsg);
                toast.error(errorMsg);
                throw new Error(errorMsg);
            }
        } catch (error: any) {
            console.error('❌ SignUp error:', error);
            const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Sign up failed. Please try again.';
            toast.error(errorMsg);
            throw error;
        }
    };

    const login = async ({ email, password }: { email: string; password: string }) => {
        try {
            console.log('🔵 AuthContext login called');
            const { data } = await api.post('/api/auth/login', { email, password });
            
            console.log('🟢 Login response:', data);
            console.log('🟢 User from response:', data.user);

            // ✅ Save JWT token to localStorage
            if (data.token) {
                localStorage.setItem('token', data.token);
                api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                console.log('✅ Token saved to localStorage');
            } else {
                console.warn('⚠️ No token in response!');
            }
            
            if (data.user) {
                console.log('✅ Setting user state...');
                setUser(data.user as IUser);
                setIsLoggedIn(true);
                console.log('✅ User state set!');
                toast.success(data.message || 'Login successful!');
            } else {
                console.log('⚠️ NO USER IN RESPONSE!');
                toast.error('Login failed - no user data received');
            }
        } catch (error: any) {
            console.error('🔴 Login error:', error.response?.data || error.message);
            const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Login failed';
            toast.error(errorMsg);
            throw error;
        }
    };

    const logout = async () => {
        try {
            console.log('🔵 Logging out...');
            
            // ✅ Clear token from localStorage
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];
            
            // Clear user state
            setUser(null);
            setIsLoggedIn(false);
            
            toast.success('Logged out successfully');
            console.log('✅ Logout successful');
        } catch (error: any) {
            console.error('❌ Logout error:', error);
            toast.error('Logout failed');
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            setUser, 
            isLoggedIn, 
            setIsLoggedIn, 
            login, 
            signUp, 
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export default AuthContext;
