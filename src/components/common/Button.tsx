// src/components/common/Button.tsx
type Props = {
  label: string;
  onClick?: () => void;
};

const Button = ({ label, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium"
    >
      {label}
    </button>
  );
};

export default Button;