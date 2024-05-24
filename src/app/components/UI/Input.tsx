import { forwardRef } from 'react';

const Input = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`text-base px-5 bg-black/30 py-4 text-white ${className}`}
      {...props}
    />
  );
});

Input.displayName = "input";

export default Input;