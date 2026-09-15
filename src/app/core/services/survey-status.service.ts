import { Injectable } from '@angular/core';

/**
 * Represents the possible status values of a survey.
 */
export type SurveyStatus = 'Published' | 'Past';

/**
 * Determines the current status of surveys based
 * on their end dates.
 *
 * The service is responsible for identifying expired
 * surveys and providing the corresponding status label.
 */
@Injectable({
  providedIn: 'root'
})
export class SurveyStatusService {

  /**
   * Checks whether a survey has already ended.
   *
   * A survey remains active until the end of its
   * specified end date.
   *
   * @param endDate End date in DD.MM.YYYY format.
   * @returns True when the survey has already ended.
   */
  isSurveyPast(endDate: string): boolean {
    if (!endDate) {
      return false;
    }

    const surveyEndDate =
      this.convertDate(endDate);

    const today = new Date();

    return (
      surveyEndDate.getTime() <
      today.getTime()
    );
  }

  /**
   * Determines the current status of a survey.
   *
   * @param endDate End date in DD.MM.YYYY format.
   * @returns Published when active, otherwise Past.
   */
  getSurveyStatus(
    endDate: string
  ): SurveyStatus {
    if (this.isSurveyPast(endDate)) {
      return 'Past';
    }

    return 'Published';
  }

  /**
   * Returns the status label displayed for a survey.
   *
   * @param endDate End date in DD.MM.YYYY format.
   * @returns Ended when expired, otherwise Published.
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
   * The time is set to the end of the specified day
   * so that the survey remains active for that full day.
   *
   * @param date Date in DD.MM.YYYY format.
   * @returns Converted JavaScript Date object.
   */
  private convertDate(date: string): Date {
    const [day, month, year] =
      date.split('.');

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