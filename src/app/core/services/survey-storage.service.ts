import { Injectable } from '@angular/core';
import { SupabaseConnectionService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyStorageService {
  constructor(
    private readonly supabaseService: SupabaseConnectionService
  ) {}

  /**
   * Loads all surveys from the database.
   *
   * @returns All stored surveys.
   */
  async loadSurveys() {
    const client = this.supabaseService.getClient();

    return client
      .from('surveys')
      .select('*');
  }

  /**
   * Loads one survey by its ID.
   *
   * @param surveyId The ID of the survey.
   * @returns The matching survey.
   */
  async loadSurveyById(surveyId: string) {
    const client = this.supabaseService.getClient();

    return client
      .from('surveys')
      .select('*')
      .eq('id', surveyId)
      .single();
  }

  /**
   * Saves a new survey in the database.
   *
   * @param survey The survey data that should be stored.
   * @returns The created survey.
   */
  async saveSurvey(survey: object) {
    const client = this.supabaseService.getClient();

    return client
      .from('surveys')
      .insert(survey)
      .select()
      .single();
  }

  /**
   * Deletes a survey from the database.
   *
   * @param surveyId The ID of the survey.
   */
  async deleteSurvey(surveyId: string) {
    const client = this.supabaseService.getClient();

    return client
      .from('surveys')
      .delete()
      .eq('id', surveyId);
  }
}