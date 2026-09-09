import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import {
  SURVEY_DATA,
  SurveyData,
  SurveyQuestion
} from '../../core/data/survey-data';

@Component({
  selector: 'app-survey-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './survey-detail.html',
  styleUrl: './survey-detail.scss'
})
export class SurveyDetailComponent implements OnInit {

  @Input() surveyId: string | null = null;

  @Output() closeDetail = new EventEmitter<void>();
  @Output() openCreate = new EventEmitter<void>();

  survey: SurveyData | null = null;

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
   * Loads the survey that matches the selected survey ID.
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
   * Splits the survey title for the styled headline.
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
   * Checks whether the current survey already has results.
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
   * Checks whether the selected survey has ended.
   */
  get isSurveyEnded(): boolean {
    if (!this.survey) {
      return false;
    }

    return this.survey.status === 'Past';
  }

  /**
   * Returns all questions that have not been answered yet.
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
   * Checks whether every survey question has an answer.
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
   * @param questionId The ID of the question.
   * @param optionKey The key of the answer option.
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
   * @param questionId The ID of the question.
   * @param optionKey The selected answer option.
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
   * Completes the survey after all questions were answered.
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
   * Shows the validation message for missing answers.
   */
  private showValidationError(): void {
    this.submittedAttempted = true;
    this.showMissingPopup = true;

    setTimeout(() => {
      this.showMissingPopup = false;
    }, 6000);
  }

  /**
   * Closes the missing answers popup.
   */
  closeMissingPopup(): void {
    this.showMissingPopup = false;
  }

  /**
   * Closes the completed survey popup.
   */
  closeCompletePopup(): void {
    this.showCompletePopup = false;
  }

  /**
   * Closes the already completed popup.
   */
  closeAlreadyCompletedPopup(): void {
    this.showAlreadyCompletedPopup = false;
  }

  /**
   * Opens or closes the mobile results section.
   */
  toggleResultsMobile(): void {
    this.showResultsMobile =
      !this.showResultsMobile;
  }

  /**
   * Opens the create survey screen.
   */
  openCreateFromHeader(): void {
    this.openCreate.emit();
  }

  /**
   * Closes the current survey detail screen.
   */
  closeSurveyDetail(): void {
    this.closeDetail.emit();
  }
}