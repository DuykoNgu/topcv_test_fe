import api from "../config/api";
import type { FormTemplate, FormField } from "../types/form";

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SingleResponse<T> {
  message: string;
  data: T;
}

export class FormService {
  async getAllForms(page = 1, limit = 10): Promise<PaginatedResponse<FormTemplate>> {
    const response = await api.get<PaginatedResponse<FormTemplate>>(`/forms?page=${page}&limit=${limit}`);
    return response.data;
  }

  async getActiveForms(): Promise<FormTemplate[]> {
    const response = await api.get<SingleResponse<FormTemplate[]>>("/forms/active");
    return response.data.data;
  }

  async getFormById(id: string): Promise<FormTemplate> {
    const response = await api.get<SingleResponse<FormTemplate>>(`/forms/${id}`);
    return response.data.data;
  }

  async createForm(form: Omit<FormTemplate, "id">): Promise<FormTemplate> {
    const payload = {
      title: form.title,
      description: form.description,
      order: form.order,
      status: form.status,
      fields: {
        create: form.fields.map(f => this.formatFieldForBackend(f))
      }
    };
    const response = await api.post<SingleResponse<FormTemplate>>("/forms", payload);
    return response.data.data;
  }

  async updateForm(id: string, form: FormTemplate): Promise<FormTemplate> {
    const payload = {
      title: form.title,
      description: form.description,
      order: form.order,
      status: form.status,
      fields: {
        deleteMany: {
          id: { notIn: form.fields.filter(f => !f.id.startsWith("field_")).map(f => f.id) }
        },
        update: form.fields.filter(f => !f.id.startsWith("field_")).map(f => ({
          where: { id: f.id },
          data: this.formatFieldForBackend(f)
        })),
        create: form.fields.filter(f => f.id.startsWith("field_")).map(f => this.formatFieldForBackend(f))
      }
    };
    const response = await api.put<SingleResponse<FormTemplate>>(`/forms/${id}`, payload);
    return response.data.data;
  }

  async deleteForm(id: string): Promise<void> {
    await api.delete(`/forms/${id}`);
  }

  private formatFieldForBackend(field: FormField) {
    const validationRules = (field.min !== undefined || field.max !== undefined) 
      ? { min: field.min, max: field.max } 
      : null;

    return {
      label: field.label,
      type: field.type,
      order: field.order,
      required: field.required || false,
      options: field.options || [],
      validationRules
    };
  }
}

export const formService = new FormService();
