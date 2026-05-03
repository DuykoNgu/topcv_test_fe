import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import type { FormTemplate, FormField, FieldType } from '../../types/form';
import BasicInfoEditor from './BasicInfoEditor';
import FieldListEditor from './FieldListEditor';

interface FormEditorModalProps {
  formId: string; // 'new' or existing id
  existingForm?: FormTemplate;
  onClose: () => void;
  onSave: (form: FormTemplate) => void;
}

export default function FormEditorModal({ formId, existingForm, onClose, onSave }: FormEditorModalProps) {
  const isNew = formId === 'new';

  const [form, setForm] = useState<FormTemplate>({
    id: `f${Date.now()}`,
    title: '',
    description: '',
    order: 1,
    status: 'ACTIVE',
    fields: [],
  });

  useEffect(() => {
    if (!isNew && existingForm) {
      setForm(existingForm);
    }
  }, [isNew, existingForm]);

  const handleSave = () => {
    if (!form.title) {
      toast.error('Vui lòng nhập tiêu đề form');
      return;
    }
    onSave(form);
  };

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      type,
      label: `Trường mới (${type})`,
      order: form.fields.length + 1,
      required: false,
      ...(type === 'SELECT' ? { options: ['Option 1', 'Option 2'] } : {})
    };
    setForm({ ...form, fields: [...form.fields, newField] });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="bg-gray-50 w-full max-w-6xl h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gray-900">{isNew ? 'Tạo Form Mới' : 'Sửa Form'}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 px-4 py-2 border rounded-md bg-white">
              Hủy
            </button>
            <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors shadow-sm">
              Lưu Form
            </button>
          </div>
        </header>

        {/* Modal Body */}
        <div className="flex-1 overflow-auto p-6 flex gap-6 items-start">
          <BasicInfoEditor form={form} onChange={setForm} />
          <FieldListEditor form={form} onChange={setForm} onAddField={addField} />
        </div>
      </div>
    </div>
  );
}
