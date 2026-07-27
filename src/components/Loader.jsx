export default function Loader({ fullScreen = false, text = "LOADING..." }) {
    const loaderElementContent = (
        <div className="flex flex-col items-center justify-center gap-5">
            <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-slate-800/50"></div>
                <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-4 border-purple-500 border-b-transparent animate-[spin_1.5s_linear_infinite_reverse]"></div>
                <div className="absolute inset-4 rounded-full border-4 border-cyan-500 border-l-transparent animate-[spin_2s_linear_infinite]"></div>
            </div>
            {text && <p className="text-indigo-600 dark:text-indigo-400 font-bold tracking-[0.2em] text-xs animate-pulse bg-white/50 dark:bg-slate-900/50 px-4 py-1.5 rounded-full border border-indigo-500/20 backdrop-blur-sm transition-colors duration-300">{text}</p>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/70 dark:bg-slate-950/70 backdrop-blur-md transition-all duration-300">
                {loaderElementContent}
            </div>
        );
    }

    return (
        <div className="flex justify-center w-full py-12">
            {loaderElementContent}
        </div>
    );
}
