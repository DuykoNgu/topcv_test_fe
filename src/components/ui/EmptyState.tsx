interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
      <p className="text-gray-500">{message}</p>
    </div>
  );
}
