import { BUTTON_VARIANTS, SIZE_CLASSES, SHAPE_CLASSES } from '@/utils/constants'

export default function Button({ 
    text, 
    onClick, 
    type = 'button', 
    disabled = false, 
    variant = 'primary', 
    size = 'md',
    shape = 'pill',
    fullWidth = false,
    className = '',
    children,
    ...props 
}) {
    const activeSize = (variant === 'icon' || variant === 'custom') ? 'none' : size;
    const activeShape = (variant === 'custom') ? 'none' : shape;
    const selectedVariant = BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary;
    const baseClasses = "flex items-center justify-center gap-2 font-semibold relative";
    
    const combinedClassName = [
        baseClasses,
        selectedVariant.className,
        SIZE_CLASSES[activeSize],
        SHAPE_CLASSES[activeShape],
        fullWidth ? "w-full" : "",
        className
    ].filter(Boolean).join(" ");

    return (
        <button 
            type={type} 
            onClick={onClick} 
            disabled={disabled}
            className={combinedClassName}
            {...props}
        >
            <span className={`flex items-center justify-center gap-2 relative z-10 w-full text-center`}>
                {text || children}
            </span>
            {selectedVariant?.decorativeElement && (
                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[25deg] group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
            )}
        </button>
    );
}
