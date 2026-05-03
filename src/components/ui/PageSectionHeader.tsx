import type { ReactNode } from 'react';

interface PageSectionHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function PageSectionHeader({ title, description, action }: PageSectionHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        {description && <p className="text-gray-500 text-sm mt-1">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
