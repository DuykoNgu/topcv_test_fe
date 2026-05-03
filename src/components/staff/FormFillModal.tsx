import { useState } from 'react';
import { toast } from 'react-hot-toast';
import type { FormTemplate } from '../../types/form';
import { submissionService } from '../../services/submission.service';
import DynamicField from './DynamicField';
import ProgressBar from './ProgressBar';

interface FormFillModalProps {
  form: FormTemplate;
  onClose: () => void;
}

export default function FormFillModal({ form, onClose }: FormFillModalProps) {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (fieldId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [fieldId]: value }));
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    form.fields.forEach(field => {
      const value = answers[field.id];
      if (field.required && (value === undefined || value === '' || value === null)) {
        newErrors[field.id] = 'Trường này là bắt buộc.';
      } else if (field.type === 'NUMBER' && value !== undefined && value !== '') {
        const numVal = Number(value);
        if (field.min !== undefined && numVal < field.min) {
          newErrors[field.id] = `Giá trị phải lớn hơn hoặc bằng ${field.min}.`;
        }
        if (field.max !== undefined && numVal > field.max) {
          newErrors[field.id] = `Giá trị phải nhỏ hơn hoặc bằng ${field.max}.`;
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        setIsSubmitting(true);
        const toastId = toast.loading('Đang gửi câu trả lời...');
        await submissionService.submitForm(form.id, answers);
        toast.success('Gửi câu trả lời thành công!', { id: toastId });
        onClose();
      } catch (error) {
        console.error("Submission error:", error);
        toast.error('Lỗi khi gửi câu trả lời!');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const filledCount = Object.values(answers).filter(v => v !== undefined && v !== '').length;
  const progressPercent = form.fields.length > 0 ? Math.round((filledCount / form.fields.length) * 100) : 0;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-3xl h-[85vh] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center z-10">
          <div>
            <h1 className="text-xl font-bold text-gray-900 line-clamp-1">{form.title}</h1>
            <p className="text-sm text-gray-500 mt-1 line-clamp-1">{form.description}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        {/* Modal Body */}
        <div className="flex-1 overflow-auto flex flex-col">
          <div className="sticky top-0 bg-white z-10 px-6 pt-4 pb-2">
            <ProgressBar 
              progressPercent={progressPercent} 
              filledCount={filledCount} 
              totalCount={form.fields.length} 
            />
          </div>

          <form id="form-fill" onSubmit={handleSubmit} className="p-6 space-y-6 flex-1">
            {form.fields.sort((a, b) => a.order - b.order).map(field => (
              <DynamicField 
                key={field.id}
                field={field}
                value={answers[field.id]}
                error={errors[field.id]}
                onChange={(val) => handleInputChange(field.id, val)}
              />
            ))}
          </form>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 border-t px-6 py-4 flex justify-end gap-3">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-4 py-2 border rounded-md bg-white hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button 
            type="submit" 
            form="form-fill"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm font-medium disabled:opacity-50"
          >
            {isSubmitting ? 'Đang gửi...' : 'Gửi câu trả lời'}
          </button>
        </div>
      </div>
    </div>
  );
}
