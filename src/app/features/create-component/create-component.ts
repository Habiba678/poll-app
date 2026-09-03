import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface CreateAnswer {
  key: string;
  text: string;
}

interface CreateQuestion {
  id: number;
  text: string;
  multipleAnswers: boolean;
  answers: CreateAnswer[];
}

@Component({
  selector: 'app-create-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-component.html',
  styleUrl: './create-component.scss'
})
export class CreateComponent {

  @Output() closeCreate = new EventEmitter<void>();
  @Output() surveyPublished = new EventEmitter<void>();

  surveyTitle = '';
  surveyEndDate = '';
  surveyDescription = '';

  selectedCategory = '';
  categoryMenuOpen = false;

  publishAttempted = false;
  publishMessageVisible = false;

  categoryOptions: string[] = [
    'Team Activities',
    'Health & Wellness',
    'Gaming & Entertainment',
    'Education & Learning',
    'Lifestyle & Preferences',
    'Technology & Innovation',
    'Workplace Culture'
  ];

  surveyQuestions: CreateQuestion[] = [
    {
      id: 1,
      text: '',
      multipleAnswers: false,
      answers: [
        {
          key: 'A',
          text: ''
        },
        {
          key: 'B',
          text: ''
        }
      ]
    }
  ];

  get minimumDate(): string {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(
      today.getMonth() + 1
    ).padStart(2, '0');

    const day = String(
      today.getDate()
    ).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  cancelCreate(): void {
    this.closeCreate.emit();
  }

  resetTitle(): void {
    this.surveyTitle = '';
  }

  resetEndDate(): void {
    this.surveyEndDate = '';
  }

  resetDescription(): void {
    this.surveyDescription = '';
  }

  toggleCategories(event: Event): void {
    event.stopPropagation();

    this.categoryMenuOpen = !this.categoryMenuOpen;
  }

  chooseCategory(
    category: string,
    event: Event
  ): void {
    event.stopPropagation();

    this.selectedCategory = category;
    this.categoryMenuOpen = false;
  }

  clearCategory(event: Event): void {
    event.stopPropagation();

    this.selectedCategory = '';
    this.categoryMenuOpen = false;
  }

  @HostListener('document:click')
  closeCategoryMenu(): void {
    this.categoryMenuOpen = false;
  }

  addQuestion(): void {
    const newQuestionId =
      this.surveyQuestions.length > 0
        ? Math.max(
            ...this.surveyQuestions.map(question => question.id)
          ) + 1
        : 1;

    this.surveyQuestions.push({
      id: newQuestionId,
      text: '',
      multipleAnswers: false,
      answers: [
        {
          key: 'A',
          text: ''
        },
        {
          key: 'B',
          text: ''
        }
      ]
    });
  }

  deleteQuestion(questionIndex: number): void {
    if (this.surveyQuestions.length === 1) {
      this.clearQuestion(this.surveyQuestions[0]);
      return;
    }

    this.surveyQuestions.splice(questionIndex, 1);
  }

  addAnswer(question: CreateQuestion): void {
    if (question.answers.length >= 5) {
      return;
    }

    const nextLetter = String.fromCharCode(
      65 + question.answers.length
    );

    question.answers.push({
      key: nextLetter,
      text: ''
    });
  }

  deleteAnswer(
    question: CreateQuestion,
    answerIndex: number
  ): void {
    if (question.answers.length <= 2) {
      question.answers[answerIndex].text = '';
      return;
    }

    question.answers.splice(answerIndex, 1);

    this.updateAnswerLetters(question);
  }

  publishSurvey(): void {
    this.publishAttempted = true;

    if (!this.formIsComplete()) {
      return;
    }

    this.publishMessageVisible = true;
    this.surveyPublished.emit();

    setTimeout(() => {
      this.publishMessageVisible = false;
    }, 6000);
  }

  closePublishMessage(): void {
    this.publishMessageVisible = false;
  }

  private formIsComplete(): boolean {
    if (!this.surveyTitle.trim()) {
      return false;
    }

    if (!this.selectedCategory) {
      return false;
    }

    if (
      this.surveyEndDate &&
      this.surveyEndDate < this.minimumDate
    ) {
      return false;
    }

    for (const question of this.surveyQuestions) {
      if (!question.text.trim()) {
        return false;
      }

      for (const answer of question.answers) {
        if (!answer.text.trim()) {
          return false;
        }
      }
    }

    return true;
  }

  private clearQuestion(question: CreateQuestion): void {
    question.text = '';
    question.multipleAnswers = false;

    question.answers = [
      {
        key: 'A',
        text: ''
      },
      {
        key: 'B',
        text: ''
      }
    ];
  }

  private updateAnswerLetters(
    question: CreateQuestion
  ): void {
    question.answers.forEach(
      (answer, index) => {
        answer.key = String.fromCharCode(65 + index);
      }
    );
  }
}