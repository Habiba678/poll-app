import { Injectable } from '@angular/core';
import { SupabaseConnectionService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyResponseService {
  constructor(
    private readonly supabaseService: SupabaseConnectionService
  ) {}

  /**
   * Saves a response for a survey question.
   *
   * @param surveyId The ID of the survey.
   * @param questionId The ID of the question.
   * @param selectedOptions The selected answer options.
   * @returns The stored response.
   */
  async saveResponse(
    surveyId: string,
    questionId: number,
    selectedOptions: string[]
  ) {
    const client = this.supabaseService.getClient();

    return client
      .from('survey_responses')
      .insert({
        survey_id: surveyId,
        question_id: questionId,
        selected_options: selectedOptions
      })
      .select()
      .single();
  }

  /**
   * Loads all responses for one survey.
   *
   * @param surveyId The ID of the survey.
   * @returns All responses belonging to the survey.
   */
  async loadResponses(surveyId: string) {
    const client = this.supabaseService.getClient();

    return client
      .from('survey_responses')
      .select('*')
      .eq('survey_id', surveyId);
  }

  /**
   * Loads all responses for one question.
   *
   * @param surveyId The ID of the survey.
   * @param questionId The ID of the question.
   * @returns All responses for the selected question.
   */
  async loadQuestionResponses(
    surveyId: string,
    questionId: number
  ) {
    const client = this.supabaseService.getClient();

    return client
      .from('survey_responses')
      .select('*')
      .eq('survey_id', surveyId)
      .eq('question_id', questionId);
  }

  /**
   * Deletes all responses belonging to a survey.
   *
   * @param surveyId The ID of the survey.
   */
  async deleteSurveyResponses(surveyId: string) {
    const client = this.supabaseService.getClient();

    return client
      .from('survey_responses')
      .delete()
      .eq('survey_id', surveyId);
  }
}