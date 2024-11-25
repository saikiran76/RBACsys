import { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva('border h-12 rounded-md px-6 font-md', {
    variants: {
        variant: {
            primary: 'bg-lime-400 text-neutral-950 border-lime-400',
            secondary: 'border-white text-white bg-transparent'
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

const Button = ({ variant, size, className, ...props }: ButtonProps) => {
    return (
        <button 
            className={buttonVariants({ variant, size, className })}
            {...props}
        />
    );
};

export default Button;