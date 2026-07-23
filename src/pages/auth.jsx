import Navbar from '../components/navbar'
import Button from '../components/button';
import Input from '../components/input';
import loginBanner from "../assets/images/auth-banner.png";
import { useState } from 'react';
import ToastMessage from '../components/toaster';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/loader';
import Footer from '../components/footer';
import api from '../api/api'
import { TOKEN_NEW_ENDPOINT, TOKEN_VALIDATE_ENDPOINT, SESSION_NEW_ENDPOINT, ACCOUNT_DETAILS_ENDPOINT } from '../api/api';
import useAuthStore from '../store/auth-store';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
});

const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please enter a valid email address"),
    gender: z.enum(["male", "female", "other"], { errorMap: () => ({ message: "Please select a gender" }) }),
    password: z.string().min(4, "Password must be at least 4 characters long"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

export default function Auth() {
    const setAuth = useAuthStore((state) => state.setAuth);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoginView, setIsLoginView] = useState(true);
    const navigate = useNavigate();

    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: loginErrors }
    } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const {
        register: registerSignup,
        handleSubmit: handleSubmitSignup,
        formState: { errors: signupErrors }
    } = useForm({
        resolver: zodResolver(signupSchema)
    });

    async function handleLoginFormSubmission(data) {
        setIsLoading(true);
        try {
            const requestTokenResponse = await api.get(TOKEN_NEW_ENDPOINT);
            const requestToken = requestTokenResponse.data.request_token;
            if (!requestTokenResponse.data.success) {
                setIsLoading(false);
                return console.log("Failed to fetch request token.");
            }
            const authPayload = {
                username: data.username,
                password: data.password,
                request_token: requestToken
            };
            const authenticationResponse = await api.post(TOKEN_VALIDATE_ENDPOINT, authPayload);
            if (!authenticationResponse.data.success) {
                setIsLoading(false);
                return console.log("Invalid credentials.");
            }
            const sessionPayload = {
                request_token: requestToken
            };
            const sessionResponse = await api.post(SESSION_NEW_ENDPOINT, sessionPayload);
            if (!sessionResponse.data.success) {
                setIsLoading(false);
                return console.log("Failed to create session.");
            }
            const sessionId = sessionResponse.data.session_id;
            const accountParams = { session_id: sessionId };
            const accountDetailsResponse = await api.get(ACCOUNT_DETAILS_ENDPOINT, { params: accountParams });
            setAuth(sessionId, accountDetailsResponse.data.id, accountDetailsResponse.data.username || data.username);
            ToastMessage({ type: 'success', title: 'Login Successful', message: 'Welcome back!', duration: 2000 });
            setIsLoading(false);
            navigate("/home");
        } catch (error) {
            setIsLoading(false);
            ToastMessage({ type: 'error', title: 'Authentication Failed', message: `Please try again after sometime. Thankyou!` });
        }
    }

    async function handleSignupFormSubmission(data) {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            ToastMessage({ type: 'success', title: 'Signup Successful', message: 'Account created! Please log in.', duration: 2000 });
            setIsLoginView(true);
        }, 1000);
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans selection:bg-indigo-500/30 relative transition-colors duration-300">
            <Navbar onGetStartedClick={() => setIsLoginView(false)} onLoginClick={() => setIsLoginView(true)} />
            
            {isLoading && (
                <Loader fullScreen={true} text="AUTHENTICATING..." />
            )}

            <div className="flex-1 flex items-center justify-center p-6 mt-18 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className={`w-full h-auto min-h-[500px] md:min-h-[600px] max-w-5xl bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl flex flex-col md:flex-row overflow-hidden relative z-10 transform transition-all hover:shadow-indigo-500/10 hover:border-slate-300 dark:hover:border-slate-700/50 duration-500`}>

                    <div className="hidden md:block w-1/2 relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white dark:from-slate-950 via-white/40 dark:via-slate-900/40 to-transparent z-10 transition-colors duration-300"></div>
                        <img className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" src={loginBanner} alt="Movie Banner" />
                        <div className="absolute bottom-16 left-10 z-20 max-w-xs">
                            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3 leading-tight drop-shadow-lg">Discover your next favorite movie.</h3>
                            <p className="text-slate-700 dark:text-slate-300 text-sm drop-shadow-md font-medium">Join MovieHub and explore thousands of titles tailored to your taste.</p>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 p-6 py-10 md:p-10 flex flex-col justify-center relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-[100px] pointer-events-none"></div>
                        
                        {isLoginView ? (
                            <form className="w-full max-w-sm mx-auto flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500" onSubmit={handleSubmitLogin(handleLoginFormSubmission)}>
                                <div className="mb-10 text-center md:text-left">
                                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">Welcome Back</h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">Sign in to access your personalized movie guide.</p>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <Input 
                                        id="login-username"
                                        label="Username"
                                        placeholder="your username"
                                        disabled={isLoading}
                                        error={loginErrors.username?.message}
                                        icon={
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                                                <path d="M20 21a8 8 0 0 0-16 0"/>
                                                <circle cx="12" cy="7" r="4"/>
                                            </svg>
                                        }
                                        {...registerLogin("username")}
                                    />

                                    <Input 
                                        id="login-password"
                                        label="Password"
                                        type="password"
                                        placeholder="••••••••"
                                        disabled={isLoading}
                                        error={loginErrors.password?.message}
                                        icon={
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                            </svg>
                                        }
                                        {...registerLogin("password")}
                                    />
                                    <a href="#" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors inline-block text-right">Forgot password?</a>
                                </div>

                                <Button type="submit" disabled={isLoading} variant="auth" className="mt-8" text={isLoading ? 'Signing In...' : 'Sign In'} />
                                
                                <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
                                    Don't have an account? <Button type="button" onClick={() => setIsLoginView(false)} variant="link" text="Sign up" />
                                </p>
                            </form>
                        ) : (
                            <form className="w-full max-w-sm mx-auto flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500" onSubmit={handleSubmitSignup(handleSignupFormSubmission)}>
                                <div className="mb-6 text-center md:text-left">
                                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Create Account</h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm">Join us to keep track of your favorite movies.</p>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <Input 
                                        id="signup-username"
                                        label="Username"
                                        placeholder="username"
                                        disabled={isLoading}
                                        error={signupErrors.username?.message}
                                        {...registerSignup("username")}
                                    />

                                    <Input 
                                        id="signup-email"
                                        label="Email"
                                        type="email"
                                        placeholder="email@example.com"
                                        disabled={isLoading}
                                        error={signupErrors.email?.message}
                                        {...registerSignup("email")}
                                    />

                                    <div className="group/input">
                                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Gender</label>
                                        <div className="flex gap-4 items-center pl-1">
                                            <label className="flex items-center gap-1.5 cursor-pointer text-sm text-slate-700 dark:text-slate-300">
                                                <input type="radio" value="male" {...registerSignup("gender")} className="accent-indigo-600" /> Male
                                            </label>
                                            <label className="flex items-center gap-1.5 cursor-pointer text-sm text-slate-700 dark:text-slate-300">
                                                <input type="radio" value="female" {...registerSignup("gender")} className="accent-indigo-600" /> Female
                                            </label>
                                            <label className="flex items-center gap-1.5 cursor-pointer text-sm text-slate-700 dark:text-slate-300">
                                                <input type="radio" value="other" {...registerSignup("gender")} className="accent-indigo-600" /> Other
                                            </label>
                                        </div>
                                        {signupErrors.gender && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{signupErrors.gender.message}</p>}
                                    </div>

                                    <Input 
                                        id="signup-password"
                                        label="Password"
                                        type="password"
                                        placeholder="••••••••"
                                        disabled={isLoading}
                                        error={signupErrors.password?.message}
                                        {...registerSignup("password")}
                                    />

                                    <Input 
                                        id="signup-confirm-password"
                                        label="Confirm Password"
                                        type="password"
                                        placeholder="••••••••"
                                        disabled={isLoading}
                                        error={signupErrors.confirmPassword?.message}
                                        {...registerSignup("confirmPassword")}
                                    />
                                </div>

                                <Button type="submit" disabled={isLoading} variant="auth" className="mt-6" text={isLoading ? 'Signing Up...' : 'Sign Up'} />
                                
                                <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                                    Already have an account? <Button type="button" onClick={() => setIsLoginView(true)} variant="link" text="Log in" />
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
