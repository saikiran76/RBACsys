import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const Card = (props:HTMLAttributes<HTMLDivElement>) => {
    const {title, children, className} = props;
  return (
    <div className={twMerge('bg-transparent bg-backdrop border border-gray-900/50 rounded-lg px-5 py-4 w-[20rem]', className)}>
        <div className='flex justify-between items-center'>
            <h2 className='text-white/80 text-xl font-semibold'>
            {title}
            </h2>
            {children}
        </div>
      
    </div>
  )
}

export default Card
