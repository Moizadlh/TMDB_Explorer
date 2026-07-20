import Navbar from '../components/navbar'
import loginBanner from "../assets/auth-banner.png";
import { useState } from 'react';
import ToastMessage from '../components/toaster';
import { useNavigate } from 'react-router-dom';
import tmdbClient from '../api/tmdb-client';
import Loader from '../components/loader';
import Footer from '../components/footer';
import { TOKEN_NEW_ENDPOINT, TOKEN_VALIDATE_ENDPOINT, SESSION_NEW_ENDPOINT, ACCOUNT_DETAILS_ENDPOINT } from '../utils/constants';

export default function Auth() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function handleLoginFormSubmission(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const requestTokenResponse = await tmdbClient.get(TOKEN_NEW_ENDPOINT);
            const requestToken = requestTokenResponse.data.request_token;
            if (!requestTokenResponse.data.success) {
                setIsLoading(false);
                return console.log("Failed to fetch request token.");
            }
            const authPayload = {
                username: userName,
                password: password,
                request_token: requestToken
            };
            const authenticationResponse = await tmdbClient.post(TOKEN_VALIDATE_ENDPOINT, authPayload);
            if (!authenticationResponse.data.success) {
                setIsLoading(false);
                return console.log("Invalid credentials.");
            }
            const sessionPayload = {
                request_token: requestToken
            };
            const sessionResponse = await tmdbClient.post(SESSION_NEW_ENDPOINT, sessionPayload);
            if (!sessionResponse.data.success) {
                setIsLoading(false);
                return console.log("Failed to create session.");
            }
            const sessionId = sessionResponse.data.session_id;
            localStorage.setItem('tmdb_session_id', sessionId);
            const accountParams = { session_id: sessionId };
            const accountDetailsResponse = await tmdbClient.get(ACCOUNT_DETAILS_ENDPOINT, { params: accountParams });
            localStorage.setItem('tmdb_account_id', accountDetailsResponse.data.id);
            localStorage.setItem('tmdb_username', accountDetailsResponse.data.username || userName);
            ToastMessage({ type: 'success', title: 'Login Successful', message: 'Welcome back!', duration: 2000 });
            setIsLoading(false);
            navigate("/dashboard");
        } catch (error) {
            setIsLoading(false);
            ToastMessage({ type: 'error', title: 'Authentication Failed', message: `Please try again after sometime. Thankyou!` });
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-indigo-500/30 relative">
            <Navbar />
            
            {isLoading && (
                <Loader fullScreen={true} text="AUTHENTICATING..." />
            )}

            <div className="flex-1 flex items-center justify-center p-6 mt-18 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="w-full h-[500px] max-w-5xl bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl flex flex-col md:flex-row overflow-hidden relative z-10 transform transition-all hover:shadow-indigo-500/10 hover:border-slate-700/50 duration-500">

                    <div className="hidden md:block w-1/2 relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/40 to-transparent z-10"></div>
                        <img className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" src={loginBanner} alt="Movie Banner" />
                        <div className="absolute bottom-16 left-10 z-20 max-w-xs">
                            <h3 className="text-3xl font-extrabold text-white mb-3 leading-tight drop-shadow-lg">Discover your next favorite movie.</h3>
                            <p className="text-slate-300 text-sm drop-shadow-md">Join MovieHub and explore thousands of titles tailored to your taste.</p>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-[100px] pointer-events-none"></div>
                        
                        <form className="w-full max-w-sm mx-auto flex flex-col" onSubmit={handleLoginFormSubmission}>
                            <div className="mb-10 text-center md:text-left">
                                <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">Welcome Back</h2>
                                <p className="text-slate-400 text-sm">Sign in to access your personalized movie guide.</p>
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="group/input">
                                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1" htmlFor="username">Username</label>
                                    <div className="relative flex items-center bg-slate-950/50 border border-slate-700 rounded-xl overflow-hidden transition-all duration-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:bg-slate-900 shadow-inner">
                                        <div className="pl-4 pr-3 text-slate-500 group-focus-within/input:text-indigo-400 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                                                <path d="M20 21a8 8 0 0 0-16 0"/>
                                                <circle cx="12" cy="7" r="4"/>
                                            </svg>
                                        </div>
                                        <input type="text" name="username" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} disabled={isLoading} className="w-full py-3.5 pr-4 bg-transparent outline-none text-slate-200 placeholder-slate-600 font-medium disabled:opacity-50" placeholder="your username" required />
                                    </div>
                                </div>

                                <div className="group/input">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1" htmlFor="password">Password</label>
                                    </div>
                                    <div className="relative flex items-center bg-slate-950/50 border border-slate-700 rounded-xl overflow-hidden transition-all duration-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:bg-slate-900 shadow-inner">
                                        <div className="pl-4 pr-3 text-slate-500 group-focus-within/input:text-indigo-400 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                            </svg>
                                        </div>
                                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} className="w-full py-3.5 pr-4 bg-transparent outline-none text-slate-200 placeholder-slate-600 font-medium disabled:opacity-50" placeholder="••••••••" required />
                                    </div>
                                </div>
                                <a href="#" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</a>
                            </div>

                            <button type="submit" disabled={isLoading} className="mt-8 w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] hover:from-indigo-500 hover:to-indigo-400 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group/btn disabled:opacity-50 disabled:cursor-not-allowed">
                                <span className="relative z-10">{isLoading ? 'Signing In...' : 'Sign In'}</span>
                                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[25deg] group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
                            </button>
                            
                            <p className="mt-8 text-center text-sm text-slate-400">
                                Don't have an account? <a href="#" className="font-semibold text-white hover:text-indigo-300 transition-colors">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}