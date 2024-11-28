import { ButtonHTMLAttributes, memo } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva('border h-12 rounded-md px-6 font-md transition-colors', {
    variants: {
        variant: {
            primary: 'bg-lime-400 text-neutral-950 border-lime-400 hover:bg-lime-500 hover:border-lime-500 disabled:opacity-50 disabled:cursor-not-allowed',
            secondary: 'border-white text-white bg-transparent hover:bg-white/10'
        },
        size: {
            sm: 'h-10',
            md: 'text-md',
            lg: 'text-lg'
        }
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md'
    }
});

interface ButtonProps 
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = memo(({ variant, size, className, ...props }: ButtonProps) => {
    return (
        <button 
            className={buttonVariants({ variant, size, className })}
            {...props}
        />
    );
});

Button.displayName = 'Button';

export default Button;