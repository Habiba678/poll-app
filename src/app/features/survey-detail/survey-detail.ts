import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  SURVEY_DATA,
  SurveyData,
  SurveyQuestion
}  from '../../core/data/survey-data';
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

  selectedOptions: { [questionId: number]: string[] } = {};

  isSubmitted = false;
  submittedAttempted = false;

  showCompletePopup = false;
  showMissingPopup = false;
  showAlreadyCompletedPopup = false;
  showResultsMobile = false;

  ngOnInit(): void {
    this.loadSurvey();
  }

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

  get hasResults(): boolean {
    if (!this.survey) {
      return false;
    }

    return this.survey.questions.some(question =>
      question.options.some(option => option.percentage > 0)
    );
  }

  get isSurveyEnded(): boolean {
    if (!this.survey) {
      return false;
    }

    return this.survey.status === 'Past';
  }

  get unansweredQuestions(): SurveyQuestion[] {
    if (!this.survey) {
      return [];
    }

    return this.survey.questions.filter(
      question => !this.selectedOptions[question.id]?.length
    );
  }

  get answeredQuestionsCount(): number {
    if (!this.survey) {
      return 0;
    }

    return this.survey.questions.filter(
      question => this.selectedOptions[question.id]?.length
    ).length;
  }

  get allQuestionsAnswered(): boolean {
    return this.unansweredQuestions.length === 0;
  }

  isSelected(questionId: number, optionKey: string): boolean {
    return this.selectedOptions[questionId]?.includes(optionKey) ?? false;
  }

  toggleOption(questionId: number, optionKey: string): void {
    if (this.isSubmitted || this.isSurveyEnded) {
      return;
    }

    const currentOptions = this.selectedOptions[questionId] ?? [];

    if (currentOptions.includes(optionKey)) {
      this.selectedOptions[questionId] = currentOptions.filter(
        key => key !== optionKey
      );
    } else {
      this.selectedOptions[questionId] = [
        ...currentOptions,
        optionKey
      ];
    }

    if (this.showMissingPopup && this.allQuestionsAnswered) {
      this.showMissingPopup = false;
    }
  }

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

  private showValidationError(): void {
    this.submittedAttempted = true;
    this.showMissingPopup = true;

    setTimeout(() => {
      this.showMissingPopup = false;
    }, 6000);
  }

  closeMissingPopup(): void {
    this.showMissingPopup = false;
  }

  closeCompletePopup(): void {
    this.showCompletePopup = false;
  }

  closeAlreadyCompletedPopup(): void {
    this.showAlreadyCompletedPopup = false;
  }

  toggleResultsMobile(): void {
    this.showResultsMobile = !this.showResultsMobile;
  }

  openCreateFromHeader(): void {
    this.openCreate.emit();
  }

  closeSurveyDetail(): void {
    this.closeDetail.emit();
  }
}