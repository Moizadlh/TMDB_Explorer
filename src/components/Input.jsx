import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
    id, 
    label, 
    type = 'text', 
    error, 
    icon,
    className = '',
    labelClassName = '',
    inputClassName = '',
    containerClassName = '',
    disabled,
    ...props 
}, ref) => {

    const inputPaddingClasses = icon ? 'py-3.5 pr-4' : 'py-2.5 px-4 text-sm';
    return (
        <div className={`group/input ${containerClassName}`}>
            {label && (
                <div className="flex justify-between items-center mb-1.5 md:mb-2">
                    <label 
                        className={`block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider ml-1 ${labelClassName}`} 
                        htmlFor={id}
                    >
                        {label}
                    </label>
                </div>
            )}
            <div className={`relative flex items-center bg-white dark:bg-slate-950/50 border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden transition-all duration-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:bg-slate-50 dark:focus-within:bg-slate-900 shadow-inner ${className}`}>
                {icon && (
                    <div className="pl-4 pr-3 text-slate-400 dark:text-slate-500 group-focus-within/input:text-indigo-600 dark:group-focus-within/input:text-indigo-400 transition-colors">
                        {icon}
                    </div>
                )}
                <input 
                    ref={ref}
                    type={type} 
                    id={id} 
                    disabled={disabled}
                    className={`w-full bg-transparent outline-none text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 font-medium disabled:opacity-50 ${inputPaddingClasses} ${inputClassName}`} 
                    {...props}
                />
            </div>
            {error && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{error}</p>}
        </div>
    );
});

export default Input;
