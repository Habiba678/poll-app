import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Output
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SurveyData } from '../../core/models/survey.model';
import { SurveyManagerService } from
  '../../core/services/survey-manager.service';

/** Represents a single answer while creating a survey. */
interface CreateAnswer {
  key: string;
  text: string;
  touched: boolean;
}

/** Represents a question while creating a survey. */
interface CreateQuestion {
  id: number;
  text: string;
  touched: boolean;
  multipleAnswers: boolean;
  answers: CreateAnswer[];
}

/** Provides the form for creating a new survey. */
@Component({
  selector: 'app-create-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-component.html',
  styleUrl: './create-component.scss'
})
export class CreateComponent {
  @Output() closeCreate = new EventEmitter<void>();
  @Output() surveyPublished = new EventEmitter<SurveyData>();

  surveyTitle = '';
  surveyEndDate = '';
  surveyDescription = '';

  titleTouched = false;
  categoryTouched = false;
  selectedCategory = '';
  categoryMenuOpen = false;

  publishAttempted = false;
  publishMessageVisible = false;
  publishClicked = false;

  private publishedSurvey: SurveyData | null = null;

  constructor(
    private readonly surveyManagerService: SurveyManagerService
  ) {}

  /** Categories available when creating a survey. */
  categoryOptions: string[] = [
    'All Surveys',
    'Team Activities',
    'Health & Wellness',
    'Gaming & Entertainment',
    'Education & Learning',
    'Lifestyle & Preferences',
    'Technology & Innovation'
  ];

  /** Questions currently included in the survey. */
  surveyQuestions: CreateQuestion[] = [
    this.createEmptyQuestion(1)
  ];

  /** Returns today's date for the date input. */
  get minimumDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /** Closes the create-survey view. */
  cancelCreate(): void {
    this.closeCreate.emit();
  }

  /** Marks the survey title as touched. */
  touchTitle(): void {
    this.titleTouched = true;
  }

  /** Marks a question as touched. */
  touchQuestion(question: CreateQuestion): void {
    question.touched = true;
  }

  /** Marks an answer as touched. */
  touchAnswer(answer: CreateAnswer): void {
    answer.touched = true;
  }

  /** Checks whether the title error should be visible. */
  showTitleError(): boolean {
    return (this.titleTouched || this.publishAttempted) &&
      !this.surveyTitle.trim();
  }

  /** Checks whether a question error should be visible. */
  showQuestionError(question: CreateQuestion): boolean {
    return (question.touched || this.publishAttempted) &&
      !question.text.trim();
  }

  /** Checks whether an answer error should be visible. */
  showAnswerError(answer: CreateAnswer): boolean {
    return (answer.touched || this.publishAttempted) &&
      !answer.text.trim();
  }

  /** Checks whether the category error should be visible. */
  showCategoryError(): boolean {
    return (this.categoryTouched || this.publishAttempted) &&
      !this.selectedCategory;
  }

  /** Clears the survey title. */
  resetTitle(): void {
    this.surveyTitle = '';
    this.titleTouched = true;
  }

  /** Clears the selected end date. */
  resetEndDate(): void {
    this.surveyEndDate = '';
  }

  /** Clears the survey description. */
  resetDescription(): void {
    this.surveyDescription = '';
  }

  /** Opens or closes the category dropdown. */
  toggleCategories(event: Event): void {
    event.stopPropagation();
    this.categoryTouched = true;
    this.categoryMenuOpen = !this.categoryMenuOpen;
  }

  /** Selects a survey category. */
  chooseCategory(category: string, event: Event): void {
    event.stopPropagation();
    this.selectedCategory = category;
    this.categoryTouched = true;
    this.categoryMenuOpen = false;
  }

  /** Closes the category dropdown. */
  @HostListener('document:click')
  closeCategoryMenu(): void {
    this.categoryMenuOpen = false;
  }

  /** Adds a new empty question. */
  addQuestion(): void {
    const ids = this.surveyQuestions.map(question => question.id);
    const nextId = Math.max(...ids) + 1;
    this.surveyQuestions.push(this.createEmptyQuestion(nextId));
  }

  /** Deletes a question. */
  deleteQuestion(questionIndex: number): void {
    if (questionIndex === 0) {
      this.clearQuestion(this.surveyQuestions[0]);
      return;
    }
    this.surveyQuestions.splice(questionIndex, 1);
  }

  /** Adds another answer option. */
  addAnswer(question: CreateQuestion): void {
    if (question.answers.length >= 5) return;

    const nextLetter = String.fromCharCode(
      65 + question.answers.length
    );
    question.answers.push(this.createEmptyAnswer(nextLetter));
  }

  /** Deletes an answer option. */
  deleteAnswer(
    question: CreateQuestion,
    answerIndex: number
  ): void {
    if (question.answers.length <= 2) {
      question.answers[answerIndex].text = '';
      question.answers[answerIndex].touched = true;
      return;
    }
    question.answers.splice(answerIndex, 1);
    this.updateAnswerLetters(question);
  }

  /** Validates, stores and publishes the survey. */
  async publishSurvey(): Promise<void> {
    this.publishAttempted = true;

    if (!this.formIsComplete()) {
      this.publishClicked = false;
      return;
    }

    const survey = this.createSurveyData();
    if (!await this.saveSurvey(survey)) return;

    this.publishedSurvey = survey;
    this.surveyPublished.emit(survey);
    this.publishClicked = true;
    this.publishMessageVisible = true;
  }

  /** Saves the new survey in Supabase. */
  private async saveSurvey(survey: SurveyData): Promise<boolean> {
    const result = await this.surveyManagerService
      .createSurvey(this.toStorageData(survey));

    if (!result.error) return true;

    console.error('Could not save survey:', result.error);
    this.publishClicked = false;
    return false;
  }

  /** Converts survey data for the Supabase table. */
  private toStorageData(survey: SurveyData): object {
    return {
      id: survey.id,
      title: survey.title,
      category: survey.category,
      ends_on: survey.endsOn ?? null,
      description: survey.description,
      questions: survey.questions
    };
  }

  /** Closes the publish confirmation. */
  closePublishMessage(): void {
    this.publishMessageVisible = false;
    this.closeCreate.emit();
  }

  /** Checks whether all required fields are valid. */
  formIsComplete(): boolean {
    if (!this.surveyTitle.trim() || !this.selectedCategory) {
      return false;
    }

    if (this.surveyEndDate &&
        this.surveyEndDate < this.minimumDate) {
      return false;
    }

    return this.questionsAreComplete();
  }

  /** Creates the finished survey data. */
  private createSurveyData(): SurveyData {
    const endDate = this.formatEndDate();
    const ongoing = !endDate;

    return {
      id: this.createSurveyId(),
      title: this.surveyTitle.trim(),
      category: this.selectedCategory,
      endsOn: endDate || undefined,
      badge: ongoing ? 'Ends Ongoing' : `Ends ${endDate}`,
      detailEndLabel: ongoing ? 'Ongoing' : `Ends on ${endDate}`,
      status: 'Published',
      isEndingSoon: false,
      description: this.surveyDescription.trim(),
      questions: this.createSurveyQuestions()
    };
  }

  /** Creates the questions used by the detail page. */
  private createSurveyQuestions() {
    return this.surveyQuestions.map((question, index) => ({
      id: question.id,
      number: index + 1,
      text: question.text.trim(),
      subtitle: question.multipleAnswers
        ? 'More than one answer is possible.'
        : undefined,
      options: question.answers.map(answer => ({
        key: answer.key,
        text: answer.text.trim(),
        percentage: 0
      }))
    }));
  }

  /** Creates a unique survey identifier. */
  private createSurveyId(): string {
    return `created-${Date.now()}`;
  }

  /** Converts the date input into DD.MM.YYYY. */
  private formatEndDate(): string {
    if (!this.surveyEndDate) return '';

    const [year, month, day] = this.surveyEndDate.split('-');
    return `${day}.${month}.${year}`;
  }

  /** Checks all questions and answers. */
  private questionsAreComplete(): boolean {
    return this.surveyQuestions.every(question =>
      !!question.text.trim() && this.answersAreComplete(question)
    );
  }

  /** Checks all answers of one question. */
  private answersAreComplete(question: CreateQuestion): boolean {
    return question.answers.every(answer => !!answer.text.trim());
  }

  /** Creates a new empty question. */
  private createEmptyQuestion(id: number): CreateQuestion {
    return {
      id,
      text: '',
      touched: false,
      multipleAnswers: false,
      answers: [
        this.createEmptyAnswer('A'),
        this.createEmptyAnswer('B')
      ]
    };
  }

  /** Creates a new empty answer. */
  private createEmptyAnswer(key: string): CreateAnswer {
    return {
      key,
      text: '',
      touched: false
    };
  }

  /** Restores a question to its empty state. */
  private clearQuestion(question: CreateQuestion): void {
    question.text = '';
    question.touched = true;
    question.multipleAnswers = false;
    question.answers = [
      this.createEmptyAnswer('A'),
      this.createEmptyAnswer('B')
    ];
  }

  /** Reassigns answer letters. */
  private updateAnswerLetters(question: CreateQuestion): void {
    question.answers.forEach((answer, index) => {
      answer.key = String.fromCharCode(65 + index);
    });
  }
}