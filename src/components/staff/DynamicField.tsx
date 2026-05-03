import type { FormField } from '../../types/form';

interface DynamicFieldProps {
  field: FormField;
  value: any;
  error?: string;
  onChange: (value: any) => void;
}

export default function DynamicField({ field, value, error, onChange }: DynamicFieldProps) {
  const hasError = !!error;
  const inputClassName = `w-full p-2 border rounded-md shadow-sm ${hasError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`;

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {field.label} {field.required && <span className="text-red-500">*</span>}
      </label>
      
      {field.type === 'TEXT' && (
        <input 
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={inputClassName}
        />
      )}

      {field.type === 'NUMBER' && (
        <input 
          type="number"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          min={field.min}
          max={field.max}
          className={inputClassName}
        />
      )}

      {field.type === 'DATE' && (
        <input 
          type="date"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={inputClassName}
        />
      )}

      {field.type === 'SELECT' && (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={inputClassName}
        >
          <option value="" disabled>-- Chọn --</option>
          {field.options?.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
      )}

      {field.type === 'COLOR' && (
        <div className="flex items-center gap-3">
          <input 
            type="color"
            value={value || '#000000'}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 w-14 p-1 cursor-pointer border rounded-md shadow-sm"
          />
          <span className="text-sm font-mono text-gray-500">{value || '#000000'}</span>
        </div>
      )}

      {hasError && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
