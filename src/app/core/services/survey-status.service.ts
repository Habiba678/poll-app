import { Injectable } from '@angular/core';

export type SurveyStatus = 'Published' | 'Past';

@Injectable({
  providedIn: 'root'
})
export class SurveyStatusService {

  /**
   * Checks whether a survey has already ended.
   *
   * @param endDate The end date of the survey.
   * @returns True when the survey is already over.
   */
  isSurveyPast(endDate: string): boolean {
    if (!endDate) {
      return false;
    }

    const surveyEndDate = this.convertDate(endDate);
    const today = new Date();

    return surveyEndDate.getTime() < today.getTime();
  }

  /**
   * Returns the current status of a survey.
   *
   * @param endDate The end date of the survey.
   * @returns Published or Past.
   */
  getSurveyStatus(endDate: string): SurveyStatus {
    if (this.isSurveyPast(endDate)) {
      return 'Past';
    }

    return 'Published';
  }

  /**
   * Returns the label shown for the survey.
   *
   * @param endDate The end date of the survey.
   * @returns The status label.
   */
  getStatusLabel(endDate: string): string {
    if (this.isSurveyPast(endDate)) {
      return 'Ended';
    }

    return 'Published';
  }

  /**
   * Converts a date from DD.MM.YYYY into a Date object.
   *
   * @param date The survey date.
   * @returns The converted date.
   */
  private convertDate(date: string): Date {
    const [day, month, year] = date.split('.');

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      23,
      59,
      59
    );
  }
}