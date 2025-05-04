import { AxiosError } from 'axios';
import { api } from '@/services/api';
import { ResumeData } from '@/types/resume';
import { TemplateType } from '@/types/template';

export interface Resume {
  id?: string;
  userId: string;
  title: string;
  content: object;
  createdAt?: Date;
  updatedAt?: Date;
}

export const resumeService = {
  /**
   * Save a new resume or update existing one
   * @param resumeData Resume data to save
   * @returns Promise<Resume>
   */
  saveResume: async (resumeData: Omit<Resume, 'id' | 'userId'>, selectedTemplateState: TemplateType, resumeContent: Omit<Resume, "id" | "userId">): Promise<Resume> => {
    try {
      console.log('Attempting to save resume with data:', resumeData, selectedTemplateState, resumeContent);
      const response = await api.post<Resume>('/resume', { resumeData, selectedTemplateState, resumeContent });
      console.log('Resume saved successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error saving resume:', error);
      if (error instanceof AxiosError) {
        const errorMessage = (error.response?.data as { error?: string })?.error || 'Failed to save resume';
        console.error('API Error details:', errorMessage);
        throw new Error(errorMessage);
      }
      throw error;
    }
  },

  /**
   * Get all resumes for the current user
   * @returns Promise<Resume[]>
   */
  getUserResumes: async (): Promise<Resume[]> => {
    try {
      const response = await api.get<Resume[]>('/resume');
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error((error.response?.data as { error?: string })?.error || 'Failed to fetch resumes');
      }
      throw error;
    }
  },

  /**
   * Get a specific resume by ID
   * @param id Resume ID
   * @returns Promise<Resume>
   */
  getResumeById: async (id: string): Promise<Resume> => {
    try {
      const response = await api.get<Resume>(`/resume/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error((error.response?.data as { error?: string })?.error || 'Failed to fetch resume');
      }
      throw error;
    }
  },

  /**
   * Delete a resume
   * @param id Resume ID
   * @returns Promise<void>
   */
  deleteResume: async (id: string): Promise<void> => {
    try {
      await api.delete(`/resume/${id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error((error.response?.data as { error?: string })?.error || 'Failed to delete resume');
      }
      throw error;
    }
  }
};
