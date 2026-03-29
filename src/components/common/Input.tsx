// src/components/common/Input.tsx
type Props = {
  placeholder: string;
};

const Input = ({ placeholder }: Props) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded-md focus:outline-none"
    />
  );
};

export default Input;