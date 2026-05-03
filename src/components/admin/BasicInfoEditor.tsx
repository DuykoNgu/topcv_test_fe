import type { FormTemplate, FormStatus } from '../../types/form';

interface BasicInfoEditorProps {
  form: FormTemplate;
  onChange: (updatedForm: FormTemplate) => void;
}

export default function BasicInfoEditor({ form, onChange }: BasicInfoEditorProps) {
  return (
    <div className="w-1/3 bg-white p-6 rounded-lg shadow-sm border space-y-4">
      <h2 className="text-lg font-semibold border-b pb-2">Thông tin cơ bản</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
        <input 
          type="text" 
          value={form.title} 
          onChange={e => onChange({ ...form, title: e.target.value })}
          className="w-full border-gray-300 rounded-md shadow-sm border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Nhập tiêu đề form..."
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
        <textarea 
          value={form.description} 
          onChange={e => onChange({ ...form, description: e.target.value })}
          className="w-full border-gray-300 rounded-md shadow-sm border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          rows={3}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Thứ tự</label>
          <input 
            type="number" 
            value={form.order} 
            onChange={e => onChange({ ...form, order: Number(e.target.value) })}
            className="w-full border-gray-300 rounded-md shadow-sm border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
          <select 
            value={form.status} 
            onChange={e => onChange({ ...form, status: e.target.value as FormStatus })}
            className="w-full border-gray-300 rounded-md shadow-sm border px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="DRAFT">DRAFT</option>
          </select>
        </div>
      </div>
    </div>
  );
}
