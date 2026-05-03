import api from "../config/api";
import type { SingleResponse } from "./form.service";

export interface SubmitValues {
  fieldId: string;
  value: string;
}

export interface SubmissionData {
  formId: string;
  values: SubmitValues[];
}

export class SubmissionService {
  async submitForm(formId: string, answers: Record<string, any>): Promise<any> {
    const values = Object.entries(answers).map(([fieldId, value]) => ({
      fieldId,
      value: String(value)
    }));

    const response = await api.post<SingleResponse<any>>(`/forms/${formId}/submit`, { values });
    return response.data.data;
  }

  async getAllSubmissions(): Promise<any[]> {
    const response = await api.get<SingleResponse<any[]>>("/submissions");
    return response.data.data;
  }

  async getMySubmissionsForForm(formId: string): Promise<any[]> {
    const response = await api.get<SingleResponse<any[]>>(`/forms/${formId}/submissions/me`);
    return response.data.data;
  }
}

export const submissionService = new SubmissionService();
