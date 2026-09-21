import { Injectable } from '@angular/core';

import {
  SupabaseConnectionService
} from './supabase.service';

/**
 * Handles survey response operations with Supabase.
 *
 * The service stores, loads and deletes responses
 * submitted for survey questions.
 */
@Injectable({
  providedIn: 'root'
})
export class SurveyResponseService {

  /**
   * Creates the response service with access to
   * the shared Supabase connection.
   *
   * @param supabaseService Provides the Supabase client.
   */
  constructor(
    private readonly supabaseService:
      SupabaseConnectionService
  ) {}

  /**
   * Saves selected answers for a survey question.
   *
   * @param surveyId Identifier of the survey.
   * @param questionId Identifier of the question.
   * @param selectedOptions Selected answer option keys.
   * @returns The result of the insert operation.
   */
  async saveResponse(
    surveyId: string,
    questionId: number,
    selectedOptions: string[]
  ) {
    const client =
      this.supabaseService.getClient();

    return client
      .from('survey_responses')
      .insert({
        survey_id: surveyId,
        question_id: questionId,
        selected_options: selectedOptions
      });
  }

  /**
   * Loads all responses belonging to one survey.
   *
   * @param surveyId Identifier of the survey.
   * @returns All responses belonging to the survey.
   */
  async loadResponses(surveyId: string) {
    const client =
      this.supabaseService.getClient();

    return client
      .from('survey_responses')
      .select('*')
      .eq('survey_id', surveyId);
  }

  /**
   * Loads all responses belonging to one question
   * of a survey.
   *
   * @param surveyId Identifier of the survey.
   * @param questionId Identifier of the question.
   * @returns All responses for the selected question.
   */
  async loadQuestionResponses(
    surveyId: string,
    questionId: number
  ) {
    const client =
      this.supabaseService.getClient();

    return client
      .from('survey_responses')
      .select('*')
      .eq('survey_id', surveyId)
      .eq('question_id', questionId);
  }

  /**
   * Deletes all responses belonging to a survey.
   *
   * @param surveyId Identifier of the survey.
   * @returns The result of the delete operation.
   */
  async deleteSurveyResponses(
    surveyId: string
  ) {
    const client =
      this.supabaseService.getClient();

    return client
      .from('survey_responses')
      .delete()
      .eq('survey_id', surveyId);
  }
}