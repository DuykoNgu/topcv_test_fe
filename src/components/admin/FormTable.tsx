import type { FormTemplate } from '../../types/form';

interface FormTableProps {
  forms: FormTemplate[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function FormTable({ forms, onEdit, onDelete }: FormTableProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cập nhật cuối</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {forms.map((form) => (
            <tr key={form.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">{form.title}</div>
                <div className="text-xs text-gray-500 truncate max-w-xs">{form.description}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${form.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {form.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {form.createdAt ? new Date(form.createdAt).toLocaleDateString('vi-VN') : '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {form.updatedAt ? new Date(form.updatedAt).toLocaleString('vi-VN') : '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                <button 
                  onClick={() => onEdit(form.id)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Sửa
                </button>
                <button 
                  onClick={() => {
                    if (window.confirm('Bạn có chắc chắn muốn xóa form này?')) {
                      onDelete(form.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-900"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          {forms.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                Chưa có form nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
