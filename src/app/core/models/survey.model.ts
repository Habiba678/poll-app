/**
 * Represents a single answer option of a survey question.
 */
export interface SurveyOption {
    /**
     * Key used to identify the answer option.
     */
    key: string;
  
    /**
     * Text displayed for the answer option.
     */
    text: string;
  
    /**
     * Current percentage of answers for this option.
     */
    percentage: number;
  }
  
  /**
   * Represents a question belonging to a survey.
   */
  export interface SurveyQuestion {
    /**
     * Unique identifier of the question.
     */
    id: number;
  
    /**
     * Number displayed in front of the question.
     */
    number: number;
  
    /**
     * Main text of the question.
     */
    text: string;
  
    /**
     * Optional additional information for the question.
     */
    subtitle?: string;
  
    /**
     * Available answer options.
     */
    options: SurveyOption[];
  }
  
  /**
   * Represents a complete survey used in the application.
   */
  export interface SurveyData {
    /**
     * Unique identifier of the survey.
     */
    id: string;
  
    /**
     * Title displayed for the survey.
     */
    title: string;
  
    /**
     * Category assigned to the survey.
     */
    category: string;
  
    /**
     * Optional date on which the survey ends.
     */
    endsOn?: string;
  
    /**
     * Text displayed inside the survey badge.
     */
    badge: string;
  
    /**
     * End-date information displayed on the detail page.
     */
    detailEndLabel: string;
  
    /**
     * Current status of the survey.
     */
    status: 'Published' | 'Past';
  
    /**
     * Indicates whether the survey is ending soon.
     */
    isEndingSoon: boolean;
  
    /**
     * Description displayed on the survey detail page.
     */
    description: string;
  
    /**
     * Questions belonging to the survey.
     */
    questions: SurveyQuestion[];
  }