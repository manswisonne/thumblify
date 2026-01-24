// import { createContext, useContext, useEffect, useState } from "react";
// import type { IUser } from "../assets/assets";
// import api from "../configs/api";
// import { toast } from "react-hot-toast"; // or "sonner" or whatever you're using

// interface AuthContextProps {
//     isLoggedIn: boolean;
//     setIsLoggedIn: (isLoggedIn: boolean) => void;
//     user: IUser | null;
//     setUser: (user: IUser | null) => void;
//     login: (user: { email: string; password: string }) => Promise<void>;
//     signUp: (user: { name: string; email: string; password: string }) => Promise<void>;
//     logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextProps>({
//     isLoggedIn: false,
//     setIsLoggedIn: () => {},
//     user: null,
//     setUser: () => {},
//     login: async () => {},
//     signUp: async () => {},
//     logout: async () => {}
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//     const [user, setUser] = useState<IUser | null>(null);
//     const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//     const signUp = async ({ name, email, password }: { name: string; email: string; password: string }) => {
//     try {
//         const { data } = await api.post('/api/auth/register', { name, email, password });
        
//         console.log("📡 RAW DATA FROM SERVER:", data); 

//         // Check if data is nested OR flat
//         const userData = data.user || (data.email ? data : null);

//         if (userData) {
//             setUser(userData as IUser);
//             setIsLoggedIn(true);
//             toast.success(data.message || 'Account created!');
//         } else {
//             console.error("❌ Server returned success but no user data found in response");
//         }
//     } catch (error: any) {
//         console.error('SignUp error:', error);
//         toast.error(error.response?.data?.message || 'SignUp failed');
//         // If it fails, do NOT let the login page redirect
//         throw error; 
//     }
// };
//     const signUp = async (userData: any) => {
//     try {
//         const { data } = await api.post('/api/auth/register', userData);
        
//         console.log("📡 SERVER RESPONSE:", data); // Check this in console!

//         // If data is { success: true, user: {...} }
//         if (data.user) {
//             setUser(data.user);
//             setIsLoggedIn(true);
//         } 
//         // If data is just the user object { name: '...', email: '...' }
//         else if (data.email || data._id) {
//             setUser(data);
//             setIsLoggedIn(true);
//         }

//         toast.success(data.message || "Account created!");
//     } catch (error: any) {
//         console.error('SignUp error:', error);
//         toast.error(error.response?.data?.message || 'SignUp failed');
//     }
// };
// const signUp = async ({ name, email, password }: { name: string; email: string; password: string }) => {
//     try {
//         const { data } = await api.post('/api/auth/register', { name, email, password });
//         console.log("📡 RAW DATA FROM SERVER:", data); // <--- ADD THIS LOG

//         // If your server returns { message, user: {...} }
//         if (data.user) {
//             setUser(data.user);
//             setIsLoggedIn(true);
//         } 
//         // If your server returns the user directly like { name, email, ... }
//         else if (data.email) { 
//             setUser(data);
//             setIsLoggedIn(true);
//         }

//         toast.success(data.message || "Success!");
//     } catch (error: any) {
//         console.error('SignUp error:', error);
//     }
// };
// real one below
    // const signUp = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    //     try {
    //         const { data } = await api.post('/api/auth/register', { name, email, password });
    //         if (data.user) {
    //             setUser(data.user as IUser);
    //             setIsLoggedIn(true);
    //         }
    //         toast.success(data.message);
    //     } catch (error: any) {
    //         console.error('SignUp error:', error);
    //         toast.error(error.response?.data?.message || 'SignUp failed');
    //     }
    // };

//     const login = async ({ email, password }: { email: string; password: string }) => {
//         try {
//             const { data } = await api.post('/api/auth/login', { email, password });
//             if (data.user) {
//                 setUser(data.user as IUser);
//                 setIsLoggedIn(true);
//             }
//             toast.success(data.message);
//         } catch (error: any) {
//             console.error('Login error:', error);
//             toast.error(error.response?.data?.message || 'Login failed');
//         }
//     };

//     const logout = async () => {
//         try {
//             const { data } = await api.post('/api/auth/logout');
//             setUser(null);
//             setIsLoggedIn(false);
//             toast.success(data.message);
//         } catch (error: any) {
//             console.error('Logout error:', error);
//             toast.error('Logout failed');
//         }
//     };

//     const fetchUser = async () => {
//         try {
//             const { data } = await api.get('/api/auth/verify');
//             if (data.user) {
//                 setUser(data.user as IUser);
//                 setIsLoggedIn(true);
//             }
//         } catch (error) {
//             console.log('User not authenticated');
//         }
//     };

//     useEffect(() => {
//         (async () => {
//             await fetchUser();
//         })();
//     }, []);

//     const value = {
//         user,
//         setUser,
//         isLoggedIn,
//         setIsLoggedIn,
//         signUp,
//         login,
//         logout
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within AuthProvider');
//     }
//     return context;
// };
// In your Login component - REMOVE the useEffect completely:
// useEffect(() => {
//   console.log("login component saw user change:", user);
//   if (user) {
//     navigate('/')
//   }
// }, [user])

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

    const signUp = async ({ name, email, password }: { name: string; email: string; password: string }) => {
        try {
            const { data } = await api.post('/api/auth/register', { name, email, password });
            
            console.log("📡 SIGNUP - RAW DATA FROM SERVER:", data);

            // Extract user data from response
            const userData = data.user || (data.email ? data : null);

            if (userData) {
                setUser(userData as IUser);
                setIsLoggedIn(true);
                toast.success(data.message || 'Account created successfully!');
            } else {
                const errorMsg = "Server returned success but no user data found";
                console.error("❌", errorMsg);
                toast.error(errorMsg);
                throw new Error(errorMsg);
            }
        } catch (error: any) {
            console.error('❌ SignUp error:', error);
            const errorMsg = error.response?.data?.message || 'Sign up failed. Please try again.';
            toast.error(errorMsg);
            throw error; // CRITICAL: Re-throw for Login component to catch
        }
    };

    // const login = async ({ email, password }: { email: string; password: string }) => {
    //     try {
    //         const { data } = await api.post('/api/auth/login', { email, password });
            
    //         console.log("📡 LOGIN - RAW DATA FROM SERVER:", data);

    //         // Extract user data from response
    //         const userData = data.user || (data.email ? data : null);

    //         if (userData) {
    //             setUser(userData as IUser);
    //             setIsLoggedIn(true);
    //             toast.success(data.message || 'Login successful!');
    //         } else {
    //             const errorMsg = "Server returned success but no user data found";
    //             console.error("❌", errorMsg);
    //             toast.error(errorMsg);
    //             throw new Error(errorMsg);
    //         }
    //     } catch (error: any) {
    //         console.error('❌ Login error:', error);
    //         const errorMsg = error.response?.data?.message || 'Login failed. Please check your credentials.';
    //         toast.error(errorMsg);
    //         throw error; // CRITICAL: Re-throw for Login component to catch
    //     }
    // };
    const login = async ({ email, password }: { email: string; password: string }) => {
    console.log('🔵 AuthContext login called')
    try {
        const { data } = await api.post('/api/auth/login', { email, password });
        console.log('🟢 Server response:', data)
        console.log('🟢 User from response:', data.user)
        
        if (data.user) {
            console.log('✅ Setting user state...')
            setUser(data.user as IUser);
            setIsLoggedIn(true);
            console.log('✅ User state set!')
        } else {
            console.log('⚠️ NO USER IN RESPONSE!')
        }
        toast.success(data.message);
    } catch (error: any) {
        console.error('🔴 Login error:', error.response?.data || error.message);
        toast.error(error.response?.data?.message || 'Login failed');
    }
};
// const login = async ({ email, password }: { email: string; password: string }) => {
//     console.log('🔍 LOGIN - Starting API call...');
    
//     try {
//         const response = await api.post('/api/auth/login', { email, password });
//         console.log('📥 LOGIN - Full response:', response);
//         console.log('📥 LOGIN - Response data:', response.data);
//         console.log('📥 LOGIN - Has user property?', 'user' in response.data);
//         console.log('📥 LOGIN - Has email property?', 'email' in response.data);
        
//         // Check what's actually in the response
//         const userData = response.data.user || response.data;
//         console.log('📥 LOGIN - User data to set:', userData);
        
//         if (userData && (userData.email || userData._id || userData.id)) {
//             console.log('🔄 LOGIN - Setting user state...');
//             setUser(userData as IUser);
//             setIsLoggedIn(true);
//             toast.success(response.data.message || 'Login successful!');
//         } else {
//             console.error('❌ LOGIN - No valid user data found:', userData);
//             toast.error('Login failed: No user data received');
//             throw new Error('No valid user data received');
//         }
//     } catch (error: any) {
//         console.error('❌ LOGIN - Error caught:', error);
//         const errorMsg = error.response?.data?.message || error.message || 'Login failed';
//         toast.error(errorMsg);
//         throw error;
//     }
// };
    const logout = async () => {
        try {
            await api.post('/api/auth/logout');
            setUser(null);
            setIsLoggedIn(false);
            toast.success('Logged out successfully');
        } catch (error: any) {
            console.error('❌ Logout error:', error);
            // Even if API call fails, clear local state
            setUser(null);
            setIsLoggedIn(false);
            toast.error('Logout failed - cleared local session');
        }
    };

    const fetchUser = async () => {
        try {
            const { data } = await api.get('/api/auth/verify');
            console.log("🔄 VERIFY USER - RAW DATA:", data);
            
            if (data.user) {
                setUser(data.user as IUser);
                setIsLoggedIn(true);
                console.log("✅ User verified and set in context");
            }
        } catch (error) {
            console.log('⚠️ User not authenticated or session expired');
            // Don't throw here - this is for silent background check
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const value = {
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        signUp,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
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