import { Injectable } from '@angular/core';
import { SurveyStorageService } from './survey-storage.service';
import { SurveyStatusService } from './survey-status.service';
import { SurveyResponseService } from './survey-response.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyManagerService {
  constructor(
    private readonly storageService: SurveyStorageService,
    private readonly statusService: SurveyStatusService,
    private readonly responseService: SurveyResponseService
  ) {}

  /**
   * Loads all surveys and adds the current status information.
   *
   * @returns All surveys with updated status values.
   */
  async loadManagedSurveys() {
    const { data, error } = await this.storageService.loadSurveys();

    if (error || !data) {
      return [];
    }

    return data.map(survey => ({
      ...survey,
      status: this.statusService.getSurveyStatus(survey.ends_on ?? ''),
      badge: this.statusService.getStatusLabel(survey.ends_on ?? '')
    }));
  }

  /**
   * Loads one survey by its ID and updates its status information.
   *
   * @param surveyId The ID of the survey.
   * @returns The managed survey or null when no survey was found.
   */
  async loadManagedSurveyById(surveyId: string) {
    const { data, error } = await this.storageService.loadSurveyById(surveyId);

    if (error || !data) {
      return null;
    }

    return {
      ...data,
      status: this.statusService.getSurveyStatus(data.ends_on ?? ''),
      badge: this.statusService.getStatusLabel(data.ends_on ?? '')
    };
  }

  /**
   * Saves a new survey.
   *
   * @param survey The survey data that should be stored.
   * @returns The stored survey result.
   */
  async createSurvey(survey: object) {
    return this.storageService.saveSurvey(survey);
  }

  /**
   * Saves one answer for a survey question.
   *
   * @param surveyId The ID of the survey.
   * @param questionId The ID of the question.
   * @param selectedOptions The selected answer options.
   * @returns The stored response.
   */
  async submitResponse(
    surveyId: string,
    questionId: number,
    selectedOptions: string[]
  ) {
    return this.responseService.saveResponse(
      surveyId,
      questionId,
      selectedOptions
    );
  }

  /**
   * Deletes a survey and its stored responses.
   *
   * @param surveyId The ID of the survey.
   */
  async removeSurvey(surveyId: string) {
    await this.responseService.deleteSurveyResponses(surveyId);

    return this.storageService.deleteSurvey(surveyId);
  }
}