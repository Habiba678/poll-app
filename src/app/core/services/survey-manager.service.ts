import { Injectable } from '@angular/core';

import {
  SurveyStorageService
} from './survey-storage.service';

import {
  SurveyStatusService
} from './survey-status.service';

import {
  SurveyResponseService
} from './survey-response.service';

/**
 * Coordinates survey storage, status and response operations.
 *
 * The service acts as the central connection between the
 * survey components and the specialized survey services.
 */
@Injectable({
  providedIn: 'root'
})
export class SurveyManagerService {

  /**
   * Creates the survey manager with the required services.
   *
   * @param storageService Handles survey storage operations.
   * @param statusService Calculates survey status information.
   * @param responseService Handles submitted survey responses.
   */
  constructor(
    private readonly storageService: SurveyStorageService,
    private readonly statusService: SurveyStatusService,
    private readonly responseService: SurveyResponseService
  ) {}

  /**
   * Loads all surveys and adds their current
   * status information.
   *
   * @returns All surveys with updated status values.
   */
  async loadManagedSurveys() {
    const { data, error } =
      await this.storageService.loadSurveys();

    if (error || !data) {
      return [];
    }

    return data.map(survey => ({
      ...survey,
      status: this.statusService.getSurveyStatus(
        survey.ends_on ?? ''
      ),
      badge: this.statusService.getStatusLabel(
        survey.ends_on ?? ''
      )
    }));
  }

  /**
   * Loads one survey by its ID and adds its current
   * status information.
   *
   * @param surveyId Identifier of the survey.
   * @returns The managed survey or null when no survey was found.
   */
  async loadManagedSurveyById(surveyId: string) {
    const { data, error } =
      await this.storageService.loadSurveyById(
        surveyId
      );

    if (error || !data) {
      return null;
    }

    return {
      ...data,
      status: this.statusService.getSurveyStatus(
        data.ends_on ?? ''
      ),
      badge: this.statusService.getStatusLabel(
        data.ends_on ?? ''
      )
    };
  }

  /**
   * Saves a new survey.
   *
   * @param survey Survey data that should be stored.
   * @returns The result of the storage operation.
   */
  async createSurvey(survey: object) {
    return this.storageService.saveSurvey(survey);
  }

  /**
   * Saves selected answers for a survey question.
   *
   * @param surveyId Identifier of the survey.
   * @param questionId Identifier of the question.
   * @param selectedOptions Selected answer option keys.
   * @returns The result of the response storage operation.
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
   * Deletes a survey and its associated responses.
   *
   * Responses are removed before the survey itself
   * is deleted.
   *
   * @param surveyId Identifier of the survey.
   * @returns The result of the survey deletion.
   */
  async removeSurvey(surveyId: string) {
    await this.responseService.deleteSurveyResponses(
      surveyId
    );

    return this.storageService.deleteSurvey(
      surveyId
    );
  }
}