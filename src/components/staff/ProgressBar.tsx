interface ProgressBarProps {
  progressPercent: number;
  filledCount: number;
  totalCount: number;
}

export default function ProgressBar({ progressPercent, filledCount, totalCount }: ProgressBarProps) {
  return (
    <>
      <div className="bg-gray-100 h-2 w-full">
        <div 
          className="bg-green-500 h-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <div className="px-6 py-2 text-right text-xs text-gray-500 border-b">
        Hoàn thành {progressPercent}% ({filledCount}/{totalCount})
      </div>
    </>
  );
}
