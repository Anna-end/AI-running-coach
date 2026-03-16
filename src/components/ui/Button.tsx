interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "danger" | "ghost";
    disabled?: boolean;
}

export const Button = ({ children, onClick, className, type = "button", disabled = false, variant = "primary" }: ButtonProps) => {
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        danger: "bg-red-600 text-white hover:bg-red-700",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
      };
    return (
        <button className={`${variants[variant ?? "primary"]} px-4 py-2 rounded-lg transition-colors ${className ?? ""}`} type={type} disabled={disabled} onClick={onClick}>

            {children}
        </button>
    )
}