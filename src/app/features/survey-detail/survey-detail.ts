import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { SURVEY_DATA } from '../../core/data/survey-data';
import { SurveyData, SurveyQuestion } from '../../core/models/survey.model';

/**
 * Displays the detail view of a selected survey.
 *
 * Handles answer selection, validation, live results
 * and survey completion.
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
  selectedOptions: { [questionId: number]: string[] } = {};

  /**
   * Stores the result percentages before the current selection.
   */
  private originalPercentages: {
    [questionId: number]: { [optionKey: string]: number };
  } = {};

  isSubmitted = false;
  submittedAttempted = false;
  showCompletePopup = false;
  showMissingPopup = false;
  showAlreadyCompletedPopup = false;
  showResultsMobile = false;

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Loads the selected survey when the component starts.
   */
  ngOnInit(): void {
    this.loadSurvey();
  }

  /**
   * Loads the selected survey and resets its answer state.
   */
  loadSurvey(): void {
    if (!this.surveyId) {
      this.survey = null;
      return;
    }

    this.survey =
      SURVEY_DATA.find(survey => survey.id === this.surveyId) ?? null;

    this.selectedOptions = {};
    this.isSubmitted = false;
    this.submittedAttempted = false;
    this.storeOriginalPercentages();
  }

  /**
   * Stores the current percentages for live result calculations.
   */
  private storeOriginalPercentages(): void {
    this.originalPercentages = {};

    if (!this.survey) return;

    for (const question of this.survey.questions) {
      this.originalPercentages[question.id] = {};

      for (const option of question.options) {
        this.originalPercentages[question.id][option.key] = option.percentage;
      }
    }
  }

  /**
   * Restores the result percentages that existed
   * before the current answer selection.
   */
  private restoreOriginalPercentages(): void {
    if (!this.survey) return;

    for (const question of this.survey.questions) {
      const original = this.originalPercentages[question.id];

      if (!original) continue;

      for (const option of question.options) {
        option.percentage =
          original[option.key] ?? option.percentage;
      }
    }
  }

  /**
   * Splits the survey title for the styled headline.
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
      return { prefix: '', hasDot: false, suffix: '' };
    }

    const index = title.indexOf("'");

    if (index === -1) {
      return { prefix: title, hasDot: false, suffix: '' };
    }

    return {
      prefix: title.substring(0, index),
      hasDot: true,
      suffix: title.substring(index + 1)
    };
  }

  /**
   * Checks whether the survey contains result values.
   *
   * @returns True when at least one result is available.
   */
  get hasResults(): boolean {
    return (
      this.survey?.questions.some(question =>
        question.options.some(option => option.percentage > 0)
      ) ?? false
    );
  }

  /**
   * Checks whether the selected survey has ended.
   *
   * @returns True when the survey has the Past status.
   */
  get isSurveyEnded(): boolean {
    return this.survey?.status === 'Past';
  }

  /**
   * Returns all questions without a selected answer.
   *
   * @returns The unanswered questions.
   */
  get unansweredQuestions(): SurveyQuestion[] {
    if (!this.survey) return [];

    return this.survey.questions.filter(
      question => !this.selectedOptions[question.id]?.length
    );
  }

  /**
   * Checks whether every survey question has been answered.
   *
   * @returns True when all questions have an answer.
   */
  get allQuestionsAnswered(): boolean {
    return !!this.survey?.questions.length &&
      this.unansweredQuestions.length === 0;
  }

  /**
   * Checks whether an answer option is selected.
   *
   * @param questionId Identifier of the question.
   * @param optionKey Key of the answer option.
   * @returns True when the option is selected.
   */
  isSelected(questionId: number, optionKey: string): boolean {
    return this.selectedOptions[questionId]?.includes(optionKey) ?? false;
  }

  /**
   * Checks whether a question allows multiple answers.
   *
   * @param question Question that should be checked.
   * @returns True when multiple answers are allowed.
   */
  allowsMultipleAnswers(question: SurveyQuestion): boolean {
    return question.subtitle === 'More than one answer is possible.';
  }

  /**
   * Selects or removes an answer option.
   *
   * Multiple-choice questions allow several selections.
   * All other questions allow only one selection.
   *
   * @param questionId Identifier of the question.
   * @param optionKey Key of the selected answer.
   */
  toggleOption(questionId: number, optionKey: string): void {
    if (this.isSubmitted || this.isSurveyEnded || !this.survey) return;

    const question = this.survey.questions.find(
      question => question.id === questionId
    );

    if (!question) return;

    const currentOptions = this.selectedOptions[questionId] ?? [];

    if (this.allowsMultipleAnswers(question)) {
      this.selectedOptions[questionId] = currentOptions.includes(optionKey)
        ? currentOptions.filter(key => key !== optionKey)
        : [...currentOptions, optionKey];
    } else {
      this.selectedOptions[questionId] = currentOptions.includes(optionKey)
        ? []
        : [optionKey];
    }

    this.updateLiveResults(question);

    if (this.showMissingPopup && this.allQuestionsAnswered) {
      this.showMissingPopup = false;
    }
  }

  /**
   * Updates the displayed result percentages while answers are selected.
   *
   * @param question Question whose results should be updated.
   */
  private updateLiveResults(question: SurveyQuestion): void {
    const original = this.originalPercentages[question.id];

    if (!original) return;

    const selected = this.selectedOptions[question.id] ?? [];

    if (!selected.length) {
      question.options.forEach(option => {
        option.percentage = original[option.key] ?? 0;
      });
      return;
    }

    const weightedValues = question.options.map(option => ({
      option,
      value:
        (original[option.key] ?? 0) +
        (selected.includes(option.key) ? 10 : 0)
    }));

    const total = weightedValues.reduce(
      (sum, item) => sum + item.value,
      0
    );

    if (!total) return;

    const percentages = weightedValues.map(item => ({
      option: item.option,
      percentage: Math.round((item.value / total) * 100)
    }));

    const percentageTotal = percentages.reduce(
      (sum, item) => sum + item.percentage,
      0
    );

    if (percentages.length && percentageTotal !== 100) {
      percentages[0].percentage += 100 - percentageTotal;
    }

    percentages.forEach(item => {
      item.option.percentage = item.percentage;
    });
  }

  /**
   * Completes the survey when all questions are answered.
   */
  completeSurvey(): void {
    if (this.isSubmitted || this.isSurveyEnded) return;

    if (!this.allQuestionsAnswered) {
      this.showValidationError();
      return;
    }

    this.isSubmitted = true;
    this.submittedAttempted = false;
    this.showMissingPopup = false;
    this.showCompletePopup = true;

    this.storeOriginalPercentages();

    setTimeout(() => {
      this.showCompletePopup = false;
      this.cdr.detectChanges();
    }, 3000);
  }

  /**
   * Displays the validation message for unanswered questions.
   */
  private showValidationError(): void {
    this.submittedAttempted = true;
    this.showMissingPopup = true;

    setTimeout(() => {
      this.showMissingPopup = false;
    }, 3000);
  }

  /**
   * Closes the missing-answer popup.
   */
  closeMissingPopup(): void {
    this.showMissingPopup = false;
  }

  /**
   * Closes the completion popup.
   */
  closeCompletePopup(): void {
    this.showCompletePopup = false;
  }

  /**
   * Closes the already-completed popup.
   */
  closeAlreadyCompletedPopup(): void {
    this.showAlreadyCompletedPopup = false;
  }

  /**
   * Shows or hides survey results on mobile devices.
   */
  toggleResultsMobile(): void {
    this.showResultsMobile = !this.showResultsMobile;
  }

  /**
   * Opens the create-survey view.
   */
  openCreateFromHeader(): void {
    this.openCreate.emit();
  }

  /**
   * Closes the survey detail view.
   */
  closeSurveyDetail(): void {
    if (!this.isSubmitted) {
      this.restoreOriginalPercentages();
    }

    this.closeDetail.emit();
  }
}