import { useState, useEffect, useCallback } from 'react';
import Pagination from '../components/ui/Pagination';
import { toast } from 'react-hot-toast';
import { formService } from '../services/form.service';
import type { FormTemplate } from '../types/form';
import PageLayout from '../components/layout/PageLayout';
import PageSectionHeader from '../components/ui/PageSectionHeader';
import FormTable from '../components/admin/FormTable';
import FormEditorModal from '../components/admin/FormEditorModal';
import { extractErrorMessage } from '../utils/error';

export default function AdminPage() {
  const [forms, setForms] = useState<FormTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFormId, setEditingFormId] = useState<string | null>(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  const fetchForms = useCallback(async () => {
    try {
      setLoading(true);
      const response = await formService.getAllForms(pagination.page, pagination.limit);
      setForms(response.data);
      setPagination({
        page: response.pagination.page,
        limit: response.pagination.limit,
        total: response.pagination.total,
        totalPages: response.pagination.totalPages
      });
    } catch (error) {
      console.error("Failed to fetch forms", error);
      toast.error(extractErrorMessage(error, 'Không thể tải danh sách form'));
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit]);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleSaveForm = async (updatedForm: FormTemplate) => {
    try {
      const toastId = toast.loading('Đang lưu form...');
      if (editingFormId === 'new') {
        await formService.createForm(updatedForm);
        toast.success('Tạo form thành công!', { id: toastId });
      } else {
        await formService.updateForm(updatedForm.id, updatedForm);
        toast.success('Cập nhật form thành công!', { id: toastId });
      }
      setEditingFormId(null);
      fetchForms(); // Refresh list after save
    } catch (error) {
      console.error("Save error:", error);
      toast.error(extractErrorMessage(error, 'Lỗi khi lưu form!'));
    }
  };

  const handleDeleteForm = async (id: string) => {
    try {
      const toastId = toast.loading('Đang xóa form...');
      await formService.deleteForm(id);
      toast.success('Xóa form thành công!', { id: toastId });
      fetchForms(); // Refresh list
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(extractErrorMessage(error, 'Lỗi khi xóa form!'));
    }
  };

  const editingForm = forms.find(f => f.id === editingFormId);

  return (
    <PageLayout headerTitle="Admin Dashboard - Dynamic Form Builder">
      <PageSectionHeader 
        title="Danh sách Form" 
        action={
          <button 
            onClick={() => setEditingFormId('new')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
          >
            + Tạo Form mới
          </button>
        } 
      />
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <FormTable 
            forms={forms} 
            onEdit={setEditingFormId} 
            onDelete={handleDeleteForm} 
          />
          <Pagination 
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            totalItems={pagination.total}
            limit={pagination.limit}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {editingFormId && (
        <FormEditorModal 
          formId={editingFormId}
          existingForm={editingForm}
          onClose={() => setEditingFormId(null)}
          onSave={handleSaveForm}
        />
      )}
    </PageLayout>
  );
}