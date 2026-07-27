import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';

import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Loader from '@/components/Loader';
import Footer from '@/components/Footer';

import { SIGNUP_SCHEMA } from '@/schema/signup';
import { IMAGE_URLS, SIGNUP_INPUTS } from '@/utils/constants';

export default function Signup() {
    const navigate = useNavigate();
    const isPending = false;

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(SIGNUP_SCHEMA)
    });

    async function handleSignupFormSubmission(data) {
        toast.success("Account created! Please log in to continue");
        navigate("/");
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans selection:bg-indigo-500/30 relative transition-colors duration-300">
            <Navbar onGetStartedClick={() => navigate("/signup")} onLoginClick={() => navigate("/")} />
            
            {isPending && (
                <Loader fullScreen={true} text="CREATING ACCOUNT..." />
            )}

            <div className="flex-1 flex items-center justify-center p-6 mt-18 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className={`w-full h-auto min-h-[500px] md:min-h-[600px] max-w-5xl bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl flex flex-col md:flex-row overflow-hidden relative z-10 transform transition-all hover:shadow-indigo-500/10 hover:border-slate-300 dark:hover:border-slate-700/50 duration-500`}>

                    <div className="hidden md:block w-1/2 relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white dark:from-slate-950 via-white/40 dark:via-slate-900/40 to-transparent z-10 transition-colors duration-300"></div>
                        <img className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105" src={IMAGE_URLS.LOGIN_BANNER} alt="Movie Banner" />
                        <div className="absolute bottom-16 left-10 z-20 max-w-xs">
                            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3 leading-tight drop-shadow-lg">Discover your next favorite movie.</h3>
                            <p className="text-slate-700 dark:text-slate-300 text-sm drop-shadow-md font-medium">Join MovieHub and explore thousands of titles tailored to your taste.</p>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 p-6 py-10 md:p-10 flex flex-col justify-center relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-[100px] pointer-events-none"></div>
                        
                        <form className="w-full max-w-sm mx-auto flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500" onSubmit={handleSubmit(handleSignupFormSubmission)}>
                            <div className="mb-6 text-center md:text-left">
                                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Create Account</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Join us to keep track of your favorite movies.</p>
                            </div>

                            <div className="flex flex-col gap-4">
                                {SIGNUP_INPUTS?.map((input) => {
                                    if (input.type === 'radio-group' && input.name === 'gender') {
                                        return (
                                            <div key="gender" className="group/input">
                                                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Gender</label>
                                                <div className="flex gap-4 items-center pl-1">
                                                    {['male', 'female', 'other']?.map(option => (
                                                        <label key={option} className="flex items-center gap-1.5 cursor-pointer text-sm text-slate-700 dark:text-slate-300 capitalize">
                                                            <input type="radio" value={option} {...register("gender")} className="accent-indigo-600" /> {option}
                                                        </label>
                                                    ))}
                                                </div>
                                                {errors?.gender && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors?.gender?.message}</p>}
                                            </div>
                                        );
                                    }

                                    return (
                                        <Input 
                                            key={input?.id}
                                            id={input?.id}
                                            label={input?.label}
                                            type={input?.type}
                                            placeholder={input?.placeholder}
                                            disabled={isPending}
                                            error={errors[input?.name]?.message}
                                            {...register(input.name)}
                                        />
                                    );
                                })}
                            </div>

                            <Button type="submit" disabled={isPending} variant="primary" fullWidth size="md" shape="rounded" className="mt-6" text={isPending ? 'Signing Up...' : 'Sign Up'} />
                            
                            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                                Already have an account? <Link to="/" className="text-indigo-600 dark:text-white hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-sm font-semibold inline-block">Log in</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
