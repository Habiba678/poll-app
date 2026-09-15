import { CommonModule } from '@angular/common';

import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { SURVEY_DATA } from '../../core/data/survey-data';

import {
  SurveyData,
  SurveyQuestion
} from '../../core/models/survey.model';

/**
 * Displays the detail view of a selected survey.
 *
 * The component handles answer selection, validation,
 * survey completion, result visibility and restrictions
 * for surveys that have already ended.
 */
@Component({
  selector: 'app-survey-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './survey-detail.html',
  styleUrl: './survey-detail.scss'
})
export class SurveyDetailComponent implements OnInit {

  /**
   * Identifier of the survey that should be displayed.
   */
  @Input() surveyId: string | null = null;

  /**
   * Emits when the survey detail view should be closed.
   */
  @Output() closeDetail = new EventEmitter<void>();

  /**
   * Emits when the create-survey view should be opened.
   */
  @Output() openCreate = new EventEmitter<void>();

  /**
   * Currently displayed survey.
   */
  survey: SurveyData | null = null;

  /**
   * Stores the selected answer keys for each question.
   */
  selectedOptions: {
    [questionId: number]: string[];
  } = {};

  isSubmitted = false;
  submittedAttempted = false;

  showCompletePopup = false;
  showMissingPopup = false;
  showAlreadyCompletedPopup = false;
  showResultsMobile = false;

  /**
   * Loads the selected survey when the component starts.
   */
  ngOnInit(): void {
    this.loadSurvey();
  }

  /**
   * Loads the survey that matches the selected survey ID
   * and resets the current answer state.
   */
  loadSurvey(): void {
    if (!this.surveyId) {
      this.survey = null;
      return;
    }

    const foundSurvey = SURVEY_DATA.find(
      survey => survey.id === this.surveyId
    );

    this.survey = foundSurvey ?? null;

    this.selectedOptions = {};
    this.isSubmitted = false;
    this.submittedAttempted = false;
  }

  /**
   * Splits the survey title into separate parts used
   * by the styled headline.
   *
   * @returns The separated title information.
   */
  get titleParts(): {
    prefix: string;
    hasDot: boolean;
    suffix: string;
  } {
    const title = this.survey?.title;

    if (!title) {
      return {
        prefix: '',
        hasDot: false,
        suffix: ''
      };
    }

    const index = title.indexOf("'");

    if (index === -1) {
      return {
        prefix: title,
        hasDot: false,
        suffix: ''
      };
    }

    return {
      prefix: title.substring(0, index),
      hasDot: true,
      suffix: title.substring(index + 1)
    };
  }

  /**
   * Checks whether the current survey contains
   * result percentages.
   *
   * @returns True when at least one answer has results.
   */
  get hasResults(): boolean {
    if (!this.survey) {
      return false;
    }

    return this.survey.questions.some(question =>
      question.options.some(
        option => option.percentage > 0
      )
    );
  }

  /**
   * Checks whether the selected survey has already ended.
   *
   * @returns True when the survey has the Past status.
   */
  get isSurveyEnded(): boolean {
    if (!this.survey) {
      return false;
    }

    return this.survey.status === 'Past';
  }

  /**
   * Returns all questions that have not been answered yet.
   *
   * @returns Questions without a selected answer.
   */
  get unansweredQuestions(): SurveyQuestion[] {
    if (!this.survey) {
      return [];
    }

    return this.survey.questions.filter(
      question =>
        !this.selectedOptions[question.id]?.length
    );
  }

  /**
   * Checks whether every question has at least one answer.
   *
   * @returns True when all questions have been answered.
   */
  get allQuestionsAnswered(): boolean {
    if (!this.survey) {
      return false;
    }

    return (
      this.survey.questions.length > 0 &&
      this.unansweredQuestions.length === 0
    );
  }

  /**
   * Checks whether an answer option is currently selected.
   *
   * @param questionId Identifier of the question.
   * @param optionKey Key of the answer option.
   * @returns True when the option is selected.
   */
  isSelected(
    questionId: number,
    optionKey: string
  ): boolean {
    return (
      this.selectedOptions[questionId]
        ?.includes(optionKey) ?? false
    );
  }

  /**
   * Selects or removes an answer option.
   *
   * Answers cannot be changed after submission or
   * when the selected survey has already ended.
   *
   * @param questionId Identifier of the question.
   * @param optionKey Key of the selected answer option.
   */
  toggleOption(
    questionId: number,
    optionKey: string
  ): void {
    if (this.isSubmitted || this.isSurveyEnded) {
      return;
    }

    const currentOptions =
      this.selectedOptions[questionId] ?? [];

    if (currentOptions.includes(optionKey)) {
      this.selectedOptions[questionId] =
        currentOptions.filter(
          key => key !== optionKey
        );
    } else {
      this.selectedOptions[questionId] = [
        ...currentOptions,
        optionKey
      ];
    }

    if (
      this.showMissingPopup &&
      this.allQuestionsAnswered
    ) {
      this.showMissingPopup = false;
    }
  }

  /**
   * Completes the survey when every question
   * has been answered.
   *
   * Submission is prevented for surveys that have
   * already ended or were already submitted.
   */
  completeSurvey(): void {
    if (this.isSubmitted || this.isSurveyEnded) {
      return;
    }

    if (!this.allQuestionsAnswered) {
      this.showValidationError();
      return;
    }

    this.isSubmitted = true;
    this.submittedAttempted = false;
    this.showMissingPopup = false;
    this.showCompletePopup = true;

    setTimeout(() => {
      this.showCompletePopup = false;
    }, 6000);
  }

  /**
   * Displays the validation popup when one or more
   * questions have not been answered.
   */
  private showValidationError(): void {
    this.submittedAttempted = true;
    this.showMissingPopup = true;

    setTimeout(() => {
      this.showMissingPopup = false;
    }, 6000);
  }

  /**
   * Closes the missing-answer validation popup.
   */
  closeMissingPopup(): void {
    this.showMissingPopup = false;
  }

  /**
   * Closes the successful completion popup.
   */
  closeCompletePopup(): void {
    this.showCompletePopup = false;
  }

  /**
   * Closes the popup indicating that the survey
   * was already completed.
   */
  closeAlreadyCompletedPopup(): void {
    this.showAlreadyCompletedPopup = false;
  }

  /**
   * Opens or closes the results section on mobile devices.
   */
  toggleResultsMobile(): void {
    this.showResultsMobile =
      !this.showResultsMobile;
  }

  /**
   * Requests the create-survey view from the
   * parent component.
   */
  openCreateFromHeader(): void {
    this.openCreate.emit();
  }

  /**
   * Requests that the current survey detail view
   * is closed.
   */
  closeSurveyDetail(): void {
    this.closeDetail.emit();
  }
}