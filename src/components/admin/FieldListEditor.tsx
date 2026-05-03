import type { FormTemplate, FieldType } from '../../types/form';

interface FieldListEditorProps {
  form: FormTemplate;
  onChange: (updatedForm: FormTemplate) => void;
  onAddField: (type: FieldType) => void;
}

export default function FieldListEditor({ form, onChange, onAddField }: FieldListEditorProps) {
  const removeField = (fieldId: string) => {
    onChange({ ...form, fields: form.fields.filter(f => f.id !== fieldId) });
  };

  const moveField = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === form.fields.length - 1) return;

    const newFields = [...form.fields];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newFields[index], newFields[targetIndex]] = [newFields[targetIndex], newFields[index]];
    
    newFields.forEach((f, i) => f.order = i + 1);
    onChange({ ...form, fields: newFields });
  };

  const handleLabelChange = (index: number, newLabel: string) => {
    const newFields = [...form.fields];
    newFields[index].label = newLabel;
    onChange({ ...form, fields: newFields });
  };

  const handleRequiredChange = (index: number, isRequired: boolean) => {
    const newFields = [...form.fields];
    newFields[index].required = isRequired;
    onChange({ ...form, fields: newFields });
  };

  const handleOptionsChange = (index: number, optionsString: string) => {
    const newFields = [...form.fields];
    // Chỉ tách mảng, giữ nguyên để user có thể gõ dấu phẩy và dấu cách
    newFields[index].options = optionsString.split(',').map(s => s.startsWith(' ') ? s.substring(1) : s);
    onChange({ ...form, fields: newFields });
  };

  return (
    <div className="w-2/3 bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-lg font-semibold">Danh sách trường (Fields)</h2>
        <div className="flex gap-2">
          <button onClick={() => onAddField('TEXT')} className="text-xs bg-gray-100 hover:bg-gray-200 border px-2 py-1 rounded">+ Text</button>
          <button onClick={() => onAddField('NUMBER')} className="text-xs bg-gray-100 hover:bg-gray-200 border px-2 py-1 rounded">+ Number</button>
          <button onClick={() => onAddField('DATE')} className="text-xs bg-gray-100 hover:bg-gray-200 border px-2 py-1 rounded">+ Date</button>
          <button onClick={() => onAddField('SELECT')} className="text-xs bg-gray-100 hover:bg-gray-200 border px-2 py-1 rounded">+ Select</button>
          <button onClick={() => onAddField('COLOR')} className="text-xs bg-gray-100 hover:bg-gray-200 border px-2 py-1 rounded">+ Color</button>
        </div>
      </div>

      <div className="space-y-4">
        {form.fields.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">Chưa có trường nào. Hãy thêm trường mới.</p>
        )}
        {form.fields.map((field, index) => (
          <div key={field.id} className="bg-gray-50 p-4 rounded-md border shadow-sm group">
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1">
                <button onClick={() => moveField(index, 'up')} disabled={index === 0} className="text-gray-400 hover:text-gray-600 disabled:opacity-30">▲</button>
                <button onClick={() => moveField(index, 'down')} disabled={index === form.fields.length - 1} className="text-gray-400 hover:text-gray-600 disabled:opacity-30">▼</button>
              </div>
              
              <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                <div className="col-span-5">
                  <input 
                    type="text" 
                    placeholder="Nhãn trường (Label)"
                    value={field.label}
                    onChange={(e) => handleLabelChange(index, e.target.value)}
                    className="w-full text-sm border-gray-300 rounded border px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="col-span-3 text-center">
                  <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">{field.type}</span>
                </div>
                <div className="col-span-4 flex items-center justify-between text-sm">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={field.required}
                      onChange={(e) => handleRequiredChange(index, e.target.checked)}
                    /> Bắt buộc
                  </label>
                  <button onClick={() => removeField(field.id)} className="text-red-500 hover:text-red-700 opacity-50 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {field.type === 'SELECT' && (
              <div className="mt-3 ml-8 pl-4 border-l-2 border-blue-200">
                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">
                  Các tùy chọn (cách nhau bằng dấu phẩy)
                </label>
                <input 
                  type="text" 
                  placeholder="Ví dụ: Lựa chọn 1,Lựa chọn 2,Lựa chọn 3"
                  value={field.options?.join(',') || ''}
                  onChange={(e) => handleOptionsChange(index, e.target.value)}
                  className="w-full text-sm border-gray-300 rounded border px-2 py-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
