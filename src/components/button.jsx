export default function Button({ 
    text, 
    onClick, 
    type = 'button', 
    disabled = false, 
    variant, 
    className = '',
    children,
    ...props 
}) {

    const displayedContent = text || children;
    const normalizedTextToDetermineVariant = (typeof displayedContent === 'string') ? displayedContent.toLowerCase().replace(/\s/g, '') : '';
    let determinedVariant = variant;
    if (!determinedVariant) {
        if (normalizedTextToDetermineVariant.includes('getstarted')) determinedVariant = 'getstarted';
        else if (normalizedTextToDetermineVariant.includes('login') || normalizedTextToDetermineVariant.includes('signin') || normalizedTextToDetermineVariant.includes('signup')) determinedVariant = 'login';
        else determinedVariant = 'default';
    }
    let determinedCssClasses = '';
    let additionalDecorativeElement = null;

    if (determinedVariant === 'getstarted') {
        determinedCssClasses = 'px-5 py-2.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 relative group text-sm font-semibold';
        additionalDecorativeElement = <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>;
    } else if (determinedVariant === 'login') {
        determinedCssClasses = 'px-6 py-2.5 text-white bg-indigo-600 rounded-full hover:bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-sm font-semibold';
    } else if (determinedVariant === 'mobileGetStarted') {
        determinedCssClasses = 'w-full py-3 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-semibold';
    } else if (determinedVariant === 'mobileLogin') {
        determinedCssClasses = 'w-full py-3 rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-colors text-sm font-semibold';
    } else if (determinedVariant === 'auth') {
        determinedCssClasses = 'w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] hover:from-indigo-500 hover:to-indigo-400 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group/btn disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold';
        additionalDecorativeElement = <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[25deg] group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>;
    } else if (determinedVariant === 'link') {
        determinedCssClasses = 'text-indigo-600 dark:text-white hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-sm font-semibold';
    } else if (determinedVariant === 'heroSecondary') {
        determinedCssClasses = 'flex items-center gap-2 px-8 py-4 text-slate-900 dark:text-white bg-white/30 dark:bg-slate-800/50 hover:bg-white/50 dark:hover:bg-slate-700/60 backdrop-blur-md rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 md:text-lg text-base font-bold';
    } else if (determinedVariant === 'detailsPrimary' || determinedVariant === 'heroPrimary') {
        determinedCssClasses = 'flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-200 px-8 py-3.5 rounded-full transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 text-base font-bold';
    } else if (determinedVariant === 'icon' || determinedVariant === 'custom') {
        determinedCssClasses = '';
    } else {
        determinedCssClasses = 'text-sm font-semibold';
    }

    return (
        <button 
            type={type} 
            onClick={onClick} 
            disabled={disabled}
            className={`${determinedCssClasses} ${className}`.trim()}
            {...props}
        >
            <span className={`flex items-center justify-center gap-2 ${determinedVariant === 'auth' ? 'relative z-10 w-full text-center' : ''}`.trim()}>{displayedContent}</span>
            {additionalDecorativeElement}
        </button>
    );
}
