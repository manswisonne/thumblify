
// import React, { useState, useEffect } from 'react'
// import SoftBackdrop from './SoftBackdrop'
// import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'
// import { toast } from 'react-hot-toast'
// const Login = () => {
//   const [state, setState] = useState<"login" | "signup">("login")
//   const { user, login, signUp } = useAuth()
//   const navigate = useNavigate()
//   const [loading, setLoading] = useState(false)

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     console.log(`🚀 Attempting ${state}...`);
    
//     if (state === 'login') {
//       await login({ email: formData.email, password: formData.password });
//     } else {
//       await signUp({ name: formData.name, email: formData.email, password: formData.password });
//     }
    
//     console.log('✅ Auth successful! User state should update...');
//     // DON'T navigate here - let useEffect handle it
    
//   } catch (error) {
//     console.error('❌ Auth failed in handleSubmit:', error);
//   } finally {
//     setLoading(false);
//   }
// };
// //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //   e.preventDefault();
// //   setLoading(true);

// //   try {
// //     if (state === 'login') {
// //       await login({ email: formData.email, password: formData.password });
// //     } else {
// //       await signUp({ name: formData.name, email: formData.email, password: formData.password });
// //     }

// //     // ONLY navigate if the try block finishes successfully
// //     console.log("✅ Success, navigating...");
// //     navigate('/'); 

// //   } catch (error) {
// //     // If the signUp function inside AuthContext throws an error, we stop here.
// //     console.error('❌ Authentication failed. Staying on Login page.');
// //   } finally {
// //     setLoading(false);
// //   }
// // };
// //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //         if (state === 'login') {
// //             await login({ email: formData.email, password: formData.password });
// //         } else {
// //             await signUp({ name: formData.name, email: formData.email, password: formData.password });
// //         }
        
// //         // If we reach this line, the API call was successful
// //         console.log("🚀 Success! Manually navigating to Home...");
// //         navigate('/'); 
        
// //     } catch (error) {
// //         console.error('❌ Auth error:', error);
// //     } finally {
// //         setLoading(false);
// //     }
// // };
// // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //   console.log('🔥 FORM SUBMITTED')
// //   e.preventDefault()
// //   console.log('State:', state)
// //   console.log('FormData:', formData)
  
// //   if (!formData.email || !formData.password) {
// //     console.log('❌ Email or password missing')
// //     toast.error('Please fill in all fields')
// //     return
// //   }
  
// //   setLoading(true)

// //   try {
// //     if (state === 'login') {
// //       console.log('📞 Calling login...')
// //       await login({ email: formData.email, password: formData.password })
// //       console.log('✅ Login completed')
// //     } else {
// //       console.log('📞 Calling signUp...')
// //       await signUp({ name: formData.name, email: formData.email, password: formData.password })
// //       console.log('✅ SignUp completed')
// //     }
// //   } catch (error) {
// //     console.error('❌ Auth error:', error)
// //   } finally {
// //     setLoading(false)
// //   }
// // }
// // real one below
//   // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   //   e.preventDefault()
//   //   setLoading(true)

//   //   try {
//   //     if (state === 'login') {
//   //       await login({ email: formData.email, password: formData.password })
//   //     } else {
//   //       await signUp({ name: formData.name, email: formData.email, password: formData.password })
//   //     }
//   //   } catch (error) {
//   //     console.error('Auth error:', error)
//   //   } finally {
//   //     setLoading(false)
//   //   }
//   // }

// //   useEffect(() => {
// // console.log("login component saw user change:", user);
// //     if (user) {
// //       navigate('/')
// //     }
// //   }, [user])
// useEffect(() => {
//   console.log("🔍 useEffect triggered");
//   console.log("👤 Current user value:", user);
//   console.log("🔍 User type:", typeof user);
//   console.log("🔍 Is user truthy?", !!user);
//   console.log("🔍 User details:", user ? JSON.stringify(user) : 'null');
  
//   if (user) {
//     console.log("✅ User exists! Navigating to home...");
//     navigate('/');
//   } else {
//     console.log("❌ User is null/undefined, staying on login page");
//   }
// }, [user, navigate]);
//   return (
//     <>
//       <SoftBackdrop />
//       <div className='min-h-screen flex items-center justify-center p-4'>
//         <form 
//           onSubmit={handleSubmit}
//           className='w-full sm:w-96 text-center bg-white/6 border border-white/10 rounded-2xl px-8'
//         >
//           <h1 className='text-white text-3xl mt-10 font-medium'>
//             {state === 'login' ? 'Login' : 'Sign Up'}
//           </h1>
//           <p className='text-gray-400 text-sm mt-2'>
//             {state === 'login' ? 'Please sign in to continue' : 'Create your account'}
//           </p>
          
//           {state === 'signup' && (
//             <div className='flex items-center mt-6 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all'>
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white/60" strokeWidth="2" strokeLinecap='round' strokeLinejoin='round'>
//                 <circle cx="12" cy="8" r="5"/>
//                 <path d="M20 21a8 8 0 0 0-16 0"/>
//               </svg>
//               <input 
//                 type="text" 
//                 name="name" 
//                 value={formData.name} 
//                 onChange={handleChange} 
//                 required={state === 'signup'}
//                 className="bg-transparent border-none text-white w-full focus:outline-none" 
//                 placeholder="Full Name" 
//               />
//             </div>
//           )}
          
//           <div className={`flex items-center w-full ${state === 'signup' ? 'mt-4' : 'mt-6'} bg-white/5 ring-2 ring-white/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all`}>
//             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white/75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <rect x="2" y="4" width="20" height="16" rx="2" />
//               <path d="M2 8h20" />
//             </svg>
//             <input 
//               type="email" 
//               name="email" 
//               value={formData.email} 
//               onChange={handleChange} 
//               required 
//               className="bg-transparent border-none text-white w-full focus:outline-none" 
//               placeholder="Email" 
//             />
//           </div>
          
//           <div className='flex items-center w-full mt-4 bg-white/5 ring-2 ring-white/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all'>
//             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white/75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <rect x="3" y="11" width="18" height="11" rx="2" />
//               <path d="M7 11V7a5 5 0 0 1 10 0v4" />
//             </svg>
//             <input 
//               type="password" 
//               name="password" 
//               value={formData.password} 
//               onChange={handleChange} 
//               required 
//               className="bg-transparent border-none text-white w-full focus:outline-none" 
//               placeholder="Password" 
//             />
//           </div>
          
//           <div>
//             <button 
//               type="submit" 
//               disabled={loading}
//               className='w-full bg-pink-600 hover:bg-pink-700 disabled:bg-pink-800 disabled:cursor-not-allowed text-white py-3 rounded-full mt-6 mb-4 transition-all active:scale-95'
//             >
//               {loading ? 'Please wait...' : state === 'login' ? 'Login' : 'Sign Up'}
//             </button>
//           </div>
          
//           <div className='text-sm text-gray-400 mb-10'>
//             {state === 'login' ? (
//               <>
//                 Don't have an account?{' '}
//                 <span 
//                   className='text-white cursor-pointer hover:underline' 
//                   onClick={() => setState('signup')}
//                 >
//                   Sign Up
//                 </span>
//               </>
//             ) : (
//               <>
//                 Already have an account?{' '}
//                 <span 
//                   className='text-white cursor-pointer hover:underline' 
//                   onClick={() => setState('login')}
//                 >
//                   Login
//                 </span>
//               </>
//             )}
//           </div>
//         </form>    
//       </div>
//     </>
//   )
// }

// export default Login
// 

// claude given file
// import React, { useState, useEffect } from 'react'
// import SoftBackdrop from './SoftBackdrop'
// import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'

// // const Login = () => {
// //   const [state, setState] = useState<"login" | "signup">("login")
// //   // const { user, login, signUp } = useAuth()
// //    // ✅ Added 'user' here
// //   //  console.log('LOGIN',login)
// //   //  console.log('user',user)
// //   const navigate = useNavigate()
// //   const [loading, setLoading] = useState(false)
// // const authContext = useAuth()
// // console.log('🧪 Full Auth Context:', authContext)
// // console.log('🧪 Login function:', authContext.login)
// // const { user, login, signUp } = authContext
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     password: ''
// //   })
// const login = async ({ email, password }: { email: string; password: string }) => {
//     console.log('🔥 REAL LOGIN FUNCTION IS NOW RUNNING!');
//     console.log('Trying to call backend with:', { email });

//     try {
//         const response = await api.post('/api/auth/login', { email, password });
//         console.log('Backend replied →', response.status, response.data);

//         // Quick fallback handling — adjust after you see real response
//         const userData = response.data.user || response.data;

//         if (userData && (userData._id || userData.id || userData.email)) {
//             setUser(userData as IUser);
//             setIsLoggedIn(true);
//             toast.success(response.data.message || 'Logged in!');
//         } else {
//             await fetchUser(); // if it's cookie-based
//             toast.success('Logged in – reloading user');
//         }
//     } catch (err: any) {
//         console.error('Login failed:', err);
//         toast.error(err.response?.data?.message || 'Login failed');
//     }
// };
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     console.log('🚀 Attempting login...')
//     setLoading(true)

//     try {
//       if (state === 'login') {
//         await login({ email: formData.email, password: formData.password })
//       } else {
//         await signUp({ name: formData.name, email: formData.email, password: formData.password })
//       }
//       console.log('✅ Auth successful!')
//     } catch (error) {
//       console.error('❌ Auth error:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     console.log('🔍 Checking user state:', user)
//     if (user) {
//       console.log('✅ User exists, navigating to home...')
//       navigate('/')
//     }
//   }, [user, navigate])

// return (
//     <>
//       <SoftBackdrop />
//       <div className='min-h-screen flex items-center justify-center p-4'>
//         <form 
//           onSubmit={handleSubmit}
//           className='w-full sm:w-96 text-center bg-white/6 border border-white/10 rounded-2xl px-8'
//         >
//           <h1 className='text-white text-3xl mt-10 font-medium'>
//             {state === 'login' ? 'Login' : 'Sign Up'}
//           </h1>
//           <p className='text-gray-400 text-sm mt-2'>
//             {state === 'login' ? 'Please sign in to continue' : 'Create your account'}
//           </p>
          
//           {state === 'signup' && (
//             <div className='flex items-center mt-6 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all'>
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white/60" strokeWidth="2" strokeLinecap='round' strokeLinejoin='round'>
//                 <circle cx="12" cy="8" r="5"/>
//                 <path d="M20 21a8 8 0 0 0-16 0"/>
//               </svg>
//               <input 
//                 type="text" 
//                 name="name" 
//                 value={formData.name} 
//                 onChange={handleChange} 
//                 required={state === 'signup'}
//                 className="bg-transparent border-none text-white w-full focus:outline-none" 
//                 placeholder="Full Name" 
//               />
//             </div>
//           )}
          
//           <div className={`flex items-center w-full ${state === 'signup' ? 'mt-4' : 'mt-6'} bg-white/5 ring-2 ring-white/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all`}>
//             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white/75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <rect x="2" y="4" width="20" height="16" rx="2" />
//               <path d="M2 8h20" />
//             </svg>
//             <input 
//               type="email" 
//               name="email" 
//               value={formData.email} 
//               onChange={handleChange} 
//               required 
//               className="bg-transparent border-none text-white w-full focus:outline-none" 
//               placeholder="Email" 
//             />
//           </div>
          
//           <div className='flex items-center w-full mt-4 bg-white/5 ring-2 ring-white/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all'>
//             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white/75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <rect x="3" y="11" width="18" height="11" rx="2" />
//               <path d="M7 11V7a5 5 0 0 1 10 0v4" />
//             </svg>
//             <input 
//               type="password" 
//               name="password" 
//               value={formData.password} 
//               onChange={handleChange} 
//               required 
//               className="bg-transparent border-none text-white w-full focus:outline-none" 
//               placeholder="Password" 
//             />
//           </div>
          
//           <div>
//             <button 
//               type="submit" 
//               disabled={loading}
//               className='w-full bg-pink-600 hover:bg-pink-700 disabled:bg-pink-800 disabled:cursor-not-allowed text-white py-3 rounded-full mt-6 mb-4 transition-all active:scale-95'
//             >
//               {loading ? 'Please wait...' : state === 'login' ? 'Login' : 'Sign Up'}
//             </button>
//           </div>
          
//           <div className='text-sm text-gray-400 mb-10'>
//             {state === 'login' ? (
//               <>
//                 Don't have an account?{' '}
//                 <span 
//                   className='text-white cursor-pointer hover:underline' 
//                   onClick={() => setState('signup')}
//                 >
//                   Sign Up
//                 </span>
//               </>
//             ) : (
//               <>
//                 Already have an account?{' '}
//                 <span 
//                   className='text-white cursor-pointer hover:underline' 
//                   onClick={() => setState('login')}
//                 >
//                   Login
//                 </span>
//               </>
//             )}
//           </div>
//         </form>    
//       </div>
//     </>
//   )
// }

// export default Login
import React, { useState, useEffect } from 'react';
import SoftBackdrop from './SoftBackdrop';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [state, setState] = useState<"login" | "signup">("login");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user, login, signUp } = useAuth();   // ← use the real context functions

  // Optional: keep these for debugging
  console.log('🧪 Full Auth Context:', useAuth());
  console.log('🧪 Login function:', useAuth().login);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('🚀 Attempting', state, 'with:', formData.email);
    setLoading(true);

    try {
      if (state === 'login') {
        await login({ email: formData.email, password: formData.password });
        console.log('✅ Login call completed');
      } else {
        await signUp({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        console.log('✅ Sign up call completed');
      }
    } catch (error: any) {
      console.error('❌ Auth failed:', error);
      // You can show error to user here (toast/alert)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🔍 Current user in context:', user);
    if (user) {
      console.log('✅ User detected → redirecting to home');
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <>
      <SoftBackdrop />
      <div className='min-h-screen flex items-center justify-center p-4'>
        <form
          onSubmit={handleSubmit}
          className='w-full sm:w-96 text-center bg-white/6 border border-white/10 rounded-2xl px-8'
        >
          <h1 className='text-white text-3xl mt-10 font-medium'>
            {state === 'login' ? 'Login' : 'Sign Up'}
          </h1>
          <p className='text-gray-400 text-sm mt-2'>
            {state === 'login' ? 'Please sign in to continue' : 'Create your account'}
          </p>

          {state === 'signup' && (
            <div className='flex items-center mt-6 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white/60" strokeWidth="2" strokeLinecap='round' strokeLinejoin='round'>
                <circle cx="12" cy="8" r="5"/>
                <path d="M20 21a8 8 0 0 0-16 0"/>
              </svg>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={state === 'signup'}
                className="bg-transparent border-none text-white w-full focus:outline-none"
                placeholder="Full Name"
              />
            </div>
          )}

          <div className={`flex items-center w-full ${state === 'signup' ? 'mt-4' : 'mt-6'} bg-white/5 ring-2 ring-white/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white/75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 8h20" />
            </svg>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-transparent border-none text-white w-full focus:outline-none"
              placeholder="Email"
            />
          </div>

          <div className='flex items-center w-full mt-4 bg-white/5 ring-2 ring-white/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all'>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white/75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-transparent border-none text-white w-full focus:outline-none"
              placeholder="Password"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className='w-full bg-pink-600 hover:bg-pink-700 disabled:bg-pink-800 disabled:cursor-not-allowed text-white py-3 rounded-full mt-6 mb-4 transition-all active:scale-95'
            >
              {loading ? 'Please wait...' : state === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </div>

          <div className='text-sm text-gray-400 mb-10'>
            {state === 'login' ? (
              <>
                Don't have an account?{' '}
                <span
                  className='text-white cursor-pointer hover:underline'
                  onClick={() => setState('signup')}
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span
                  className='text-white cursor-pointer hover:underline'
                  onClick={() => setState('login')}
                >
                  Login
                </span>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;