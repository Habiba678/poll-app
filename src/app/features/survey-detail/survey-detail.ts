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
import { SurveyResponseService } from '../../core/services/survey-response.service';

type VoteMap = Record<number, Record<string, number>>;
type VoteResult = { key: string; votes: number };

/**
 * Displays a survey and handles selections,
 * live results and persisted responses.
 */
@Component({
  selector: 'app-survey-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './survey-detail.html',
  styleUrl: './survey-detail.scss'
})
export class SurveyDetailComponent implements OnInit {
  /** Selected survey and detail events. */
  @Input() surveyId: string | null = null;
  @Output() closeDetail = new EventEmitter<void>();
  @Output() openCreate = new EventEmitter<void>();

  /** Current survey and answer state. */
  survey: SurveyData | null = null;
  selectedOptions: Record<number, string[]> = {};
  private storedVotes: VoteMap = {};

  isSubmitted = false;
  submittedAttempted = false;
  showCompletePopup = false;
  showMissingPopup = false;
  showAlreadyCompletedPopup = false;
  showResultsMobile = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private surveyResponseService: SurveyResponseService
  ) {}

  /** Loads the selected survey on start. */
  ngOnInit(): void {
    void this.loadSurvey();
  }

  /** Loads the survey and its persisted results. */
  async loadSurvey(): Promise<void> {
    const source = SURVEY_DATA.find(item => item.id === this.surveyId);
    if (!source) {
      this.survey = null;
      return;
    }

    this.survey = structuredClone(source);
    this.resetState();
    this.restoreSubmittedState();
    await this.loadStoredResults();
  }

  /** Resets the temporary survey state. */
  private resetState(): void {
    this.selectedOptions = {};
    this.storedVotes = {};
    this.isSubmitted = false;
    this.submittedAttempted = false;
    this.showCompletePopup = false;
    this.showMissingPopup = false;
  }

  /** Restores whether this survey was already completed. */
  private restoreSubmittedState(): void {
    if (!this.survey) return;

    this.isSubmitted =
      localStorage.getItem(`survey-completed-${this.survey.id}`) === 'true';
  }

  /** Loads stored survey responses from Supabase. */
  private async loadStoredResults(): Promise<void> {
    if (!this.survey) return;

    const result = await this.surveyResponseService
      .loadResponses(this.survey.id);

    if (result.error) {
      console.error('Could not load survey responses:', result.error);
      return;
    }

    this.createVoteMap();
    this.countResponses(result.data ?? []);
    this.updateAllResults();
    this.cdr.detectChanges();
  }

  /** Creates vote counters for every answer option. */
  private createVoteMap(): void {
    this.storedVotes = {};

    this.survey?.questions.forEach(question => {
      this.storedVotes[question.id] = {};
      question.options.forEach(option =>
        this.storedVotes[question.id][option.key] = 0
      );
    });
  }

  /** Counts the responses stored in Supabase. */
  private countResponses(responses: any[]): void {
    responses.forEach(response => {
      const votes = this.storedVotes[response.question_id];
      if (!votes) return;

      (response.selected_options ?? []).forEach((key: string) => {
        if (votes[key] !== undefined) votes[key]++;
      });
    });
  }

  /** Updates the results of all survey questions. */
  private updateAllResults(): void {
    this.survey?.questions.forEach(
      question => this.updateQuestionResults(question)
    );
  }

  /** Updates the result of one survey question. */
  private updateQuestionResults(question: SurveyQuestion): void {
    const votes = this.getVotes(question);
    const total = votes.reduce((sum, item) => sum + item.votes, 0);

    if (!total) {
      question.options.forEach(option => option.percentage = 0);
      return;
    }

    this.applyPercentages(question, votes, total);
  }

  /** Combines stored votes with the live selection. */
  private getVotes(question: SurveyQuestion): VoteResult[] {
    const stored = this.storedVotes[question.id] ?? {};
    const selected = this.selectedOptions[question.id] ?? [];

    return question.options.map(option => ({
      key: option.key,
      votes: (stored[option.key] ?? 0) +
        (selected.includes(option.key) ? 1 : 0)
    }));
  }

  /** Calculates and applies the result percentages. */
  private applyPercentages(
    question: SurveyQuestion,
    votes: VoteResult[],
    total: number
  ): void {
    const values = votes.map(item =>
      Math.round((item.votes / total) * 100)
    );

    const difference = 100 - values.reduce((a, b) => a + b, 0);
    if (values.length) values[0] += difference;

    question.options.forEach((option, index) => {
      option.percentage = values[index];
    });
  }

  /** Returns the survey title as styled parts. */
  get titleParts(): {
    prefix: string;
    hasDot: boolean;
    suffix: string;
  } {
    const title = this.survey?.title ?? '';
    const index = title.indexOf("'");

    if (index < 0) {
      return { prefix: title, hasDot: false, suffix: '' };
    }

    return {
      prefix: title.substring(0, index),
      hasDot: true,
      suffix: title.substring(index + 1)
    };
  }

  /** Returns whether survey results are available. */
  get hasResults(): boolean {
    return this.survey?.questions.some(question =>
      question.options.some(option => option.percentage > 0)
    ) ?? false;
  }

  /** Returns whether the survey has ended. */
  get isSurveyEnded(): boolean {
    return this.survey?.status === 'Past';
  }

  /** Returns all unanswered survey questions. */
  get unansweredQuestions(): SurveyQuestion[] {
    return this.survey?.questions.filter(
      question => !this.selectedOptions[question.id]?.length
    ) ?? [];
  }

  /** Returns whether every question has an answer. */
  get allQuestionsAnswered(): boolean {
    return !!this.survey?.questions.length &&
      this.unansweredQuestions.length === 0;
  }

  /** Checks whether an answer option is selected. */
  isSelected(questionId: number, optionKey: string): boolean {
    return this.selectedOptions[questionId]?.includes(optionKey) ?? false;
  }

  /** Checks whether multiple answers are allowed. */
  allowsMultipleAnswers(question: SurveyQuestion): boolean {
    return question.subtitle ===
      'More than one answer is possible.';
  }

  /** Selects an option and updates its live result. */
  toggleOption(questionId: number, optionKey: string): void {
    if (this.isSubmitted || this.isSurveyEnded || !this.survey) return;

    const question = this.survey.questions.find(q => q.id === questionId);
    if (!question) return;

    this.changeSelection(question, optionKey);
    this.updateQuestionResults(question);

    if (this.showMissingPopup && this.allQuestionsAnswered) {
      this.showMissingPopup = false;
    }
  }

  /** Handles single- and multiple-choice selections. */
  private changeSelection(
    question: SurveyQuestion,
    optionKey: string
  ): void {
    const current = this.selectedOptions[question.id] ?? [];

    if (this.allowsMultipleAnswers(question)) {
      this.selectedOptions[question.id] = current.includes(optionKey)
        ? current.filter(key => key !== optionKey)
        : [...current, optionKey];
      return;
    }

    this.selectedOptions[question.id] =
      current.includes(optionKey) ? [] : [optionKey];
  }

  /** Validates and submits the completed survey. */
  async completeSurvey(): Promise<void> {
    if (this.isSubmitted || this.isSurveyEnded || !this.survey) return;

    if (!this.allQuestionsAnswered) {
      this.showValidationError();
      return;
    }

    if (!await this.saveResponses()) return;

    this.setSubmittedState();
    await this.reloadResults();
    this.hideCompletePopupLater();
  }

  /** Saves all selected answers to Supabase. */
  private async saveResponses(): Promise<boolean> {
    if (!this.survey) return false;

    for (const question of this.survey.questions) {
      const answers = this.selectedOptions[question.id] ?? [];
      const result = await this.surveyResponseService
        .saveResponse(this.survey.id, question.id, answers);

      if (result.error) {
        console.error('Could not save survey response:', result.error);
        return false;
      }
    }

    return true;
  }

  /** Sets the state after successful submission. */
  private setSubmittedState(): void {
    if (!this.survey) return;

    this.isSubmitted = true;
    this.submittedAttempted = false;
    this.showMissingPopup = false;
    this.showCompletePopup = true;

    localStorage.setItem(
      `survey-completed-${this.survey.id}`,
      'true'
    );
  }

  /** Reloads the persisted results after submission. */
  private async reloadResults(): Promise<void> {
    const answers = { ...this.selectedOptions };
    this.selectedOptions = {};

    await this.loadStoredResults();

    this.selectedOptions = answers;
    this.isSubmitted = true;
    this.cdr.detectChanges();
  }

  /** Hides the completion popup after three seconds. */
  private hideCompletePopupLater(): void {
    setTimeout(() => {
      this.showCompletePopup = false;
      this.cdr.detectChanges();
    }, 3000);
  }

  /** Shows the missing-answer validation popup. */
  private showValidationError(): void {
    this.submittedAttempted = true;
    this.showMissingPopup = true;

    setTimeout(() => {
      this.showMissingPopup = false;
      this.cdr.detectChanges();
    }, 3000);
  }

  /** Closes the missing-answer popup. */
  closeMissingPopup(): void {
    this.showMissingPopup = false;
  }

  /** Closes the completion popup. */
  closeCompletePopup(): void {
    this.showCompletePopup = false;
  }

  /** Closes the already-completed popup. */
  closeAlreadyCompletedPopup(): void {
    this.showAlreadyCompletedPopup = false;
  }

  /** Toggles the mobile results view. */
  toggleResultsMobile(): void {
    this.showResultsMobile = !this.showResultsMobile;
  }

  /** Opens the create-survey view. */
  openCreateFromHeader(): void {
    this.openCreate.emit();
  }

  /** Closes the survey detail view. */
  closeSurveyDetail(): void {
    this.closeDetail.emit();
  }
}