import type { FormTemplate } from '../../types/form';

interface FormCardProps {
  form: FormTemplate;
  onFill: (form: FormTemplate) => void;
  onViewHistory: (form: FormTemplate) => void;
}

export default function FormCard({ form, onFill, onViewHistory }: FormCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 flex flex-col hover:shadow-md transition-shadow">
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">{form.title}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-3">{form.description}</p>
      </div>
      <div className="mt-2 space-y-1">
        <div className="flex items-center text-xs text-gray-400">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Tạo bởi: {form.creator?.username || 'Hệ thống'}</span>
        </div>
        <div className="flex items-center text-xs text-gray-400">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Ngày tạo: {form.createdAt ? new Date(form.createdAt).toLocaleDateString('vi-VN') : 'Không rõ'}</span>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
        <span className="text-xs text-gray-400 hidden sm:inline">{form.fields.length} trường</span>
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={() => onViewHistory(form)}
            className="flex-1 sm:flex-none border border-gray-300 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm"
          >
            Lịch sử
          </button>
          <button 
            onClick={() => onFill(form)}
            className="flex-1 sm:flex-none bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Điền form
          </button>
        </div>
      </div>
    </div>
  );
}
