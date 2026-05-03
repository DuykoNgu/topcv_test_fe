import { useState, useEffect } from 'react';
import { submissionService } from '../../services/submission.service';
import type { FormTemplate } from '../../types/form';
import FormFillModal from './FormFillModal';

interface FormHistoryModalProps {
  form: FormTemplate;
  onClose: () => void;
}

export default function FormHistoryModal({ form, onClose }: FormHistoryModalProps) {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSubmission, setEditingSubmission] = useState<any>(null);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await submissionService.getMySubmissionsForForm(form.id);
      setSubmissions(data);
    } catch (error) {
      console.error("Failed to fetch submission history", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [form.id]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Lịch sử điền form</h2>
            <p className="text-sm text-gray-500 mt-1">{form.title}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-500">Đang tải lịch sử...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">Bạn chưa điền form này lần nào.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {submissions.map((sub, idx) => (
                <div key={sub.id} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Lần nộp #{submissions.length - idx}
                    </span>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-400 italic">
                        {new Date(sub.submittedAt).toLocaleString('vi-VN')}
                      </span>
                      <button
                        onClick={() => setEditingSubmission(sub)}
                        className="ml-4 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors px-2 py-1 rounded hover:bg-blue-50"
                      >
                        Sửa
                      </button>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {sub.values.map((val: any) => (
                      <div key={val.id} className="grid grid-cols-3 gap-4 border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                        <span className="text-sm font-medium text-gray-600">{val.field?.label}:</span>
                        <span className="text-sm text-gray-900 col-span-2">{val.value || <span className="text-gray-300 italic">(Để trống)</span>}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>

      {editingSubmission && (
        <FormFillModal
          form={form}
          initialSubmission={editingSubmission}
          onClose={() => setEditingSubmission(null)}
          onSuccess={() => {
            setEditingSubmission(null);
            fetchHistory();
          }}
        />
      )}
    </div>
  );
}
