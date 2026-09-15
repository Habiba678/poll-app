import { SurveyData } from '../models/survey.model';
import { PUBLISHED_SURVEYS } from './published-surveys.data';
import { PAST_SURVEYS } from './past-surveys.data';

/**
 * Contains all surveys used throughout the application.
 *
 * Published and past surveys are stored separately to keep
 * the individual data files small and maintainable.
 */
export const SURVEY_DATA: SurveyData[] = [
  ...PUBLISHED_SURVEYS,
  ...PAST_SURVEYS
];