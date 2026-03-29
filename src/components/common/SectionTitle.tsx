// src/components/common/SectionTitle.tsx
type Props = {
  title: string;
  subtitle?: string;
};

const SectionTitle = ({ title, subtitle }: Props) => {
  return (
    <div className="text-center mb-6">
      {subtitle && <p className="text-gray-500">{subtitle}</p>}
      <h2 className="text-3xl font-bold">{title}</h2>
    </div>
  );
};

export default SectionTitle;