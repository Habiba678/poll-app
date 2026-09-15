import { Injectable } from '@angular/core';

import {
  SupabaseConnectionService
} from './supabase.service';

/**
 * Handles storage operations for surveys in Supabase.
 *
 * The service is responsible for loading, creating
 * and deleting surveys in the database.
 */
@Injectable({
  providedIn: 'root'
})
export class SurveyStorageService {

  /**
   * Creates the storage service with access to
   * the shared Supabase connection.
   *
   * @param supabaseService Provides the Supabase client.
   */
  constructor(
    private readonly supabaseService:
      SupabaseConnectionService
  ) {}

  /**
   * Loads all surveys from the database.
   *
   * @returns All stored surveys.
   */
  async loadSurveys() {
    const client =
      this.supabaseService.getClient();

    return client
      .from('surveys')
      .select('*');
  }

  /**
   * Loads one survey by its identifier.
   *
   * @param surveyId Identifier of the survey.
   * @returns The matching survey.
   */
  async loadSurveyById(surveyId: string) {
    const client =
      this.supabaseService.getClient();

    return client
      .from('surveys')
      .select('*')
      .eq('id', surveyId)
      .single();
  }

  /**
   * Saves a new survey in the database.
   *
   * @param survey Survey data that should be stored.
   * @returns The newly created survey.
   */
  async saveSurvey(survey: object) {
    const client =
      this.supabaseService.getClient();

    return client
      .from('surveys')
      .insert(survey)
      .select()
      .single();
  }

  /**
   * Deletes a survey from the database.
   *
   * @param surveyId Identifier of the survey.
   * @returns The result of the delete operation.
   */
  async deleteSurvey(surveyId: string) {
    const client =
      this.supabaseService.getClient();

    return client
      .from('surveys')
      .delete()
      .eq('id', surveyId);
  }
}