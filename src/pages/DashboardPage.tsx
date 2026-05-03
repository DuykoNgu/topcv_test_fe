import { useState, useEffect } from 'react';
import { formService } from '../services/form.service';
import type { FormTemplate } from '../types/form';
import PageLayout from '../components/layout/PageLayout';
import PageSectionHeader from '../components/ui/PageSectionHeader';
import EmptyState from '../components/ui/EmptyState';
import FormCard from '../components/staff/FormCard';
import FormFillModal from '../components/staff/FormFillModal';
import FormHistoryModal from '../components/staff/FormHistoryModal';

export default function DashboardPage() {
  const [activeForms, setActiveForms] = useState<FormTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [fillingForm, setFillingForm] = useState<FormTemplate | null>(null);
  const [viewingHistory, setViewingHistory] = useState<FormTemplate | null>(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        setLoading(true);
        const forms = await formService.getActiveForms();
        setActiveForms(forms);
      } catch (error) {
        console.error("Failed to fetch active forms", error);
      } finally {
        setLoading(false);
      }
    };
    fetchForms();
  }, []);

  return (
    <PageLayout headerTitle="Trang chủ Khảo sát">
      <PageSectionHeader 
        title="Các Form đang mở" 
        description="Vui lòng chọn form để điền thông tin." 
      />

      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : activeForms.length === 0 ? (
        <EmptyState message="Hiện không có form nào đang mở." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeForms.map((form) => (
            <FormCard 
              key={form.id} 
              form={form} 
              onFill={setFillingForm} 
              onViewHistory={setViewingHistory}
            />
          ))}
        </div>
      )}

      {fillingForm && (
        <FormFillModal 
          form={fillingForm} 
          onClose={() => setFillingForm(null)} 
        />
      )}

      {viewingHistory && (
        <FormHistoryModal
          form={viewingHistory}
          onClose={() => setViewingHistory(null)}
        />
      )}
    </PageLayout>
  );
}
