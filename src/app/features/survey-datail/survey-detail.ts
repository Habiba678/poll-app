import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface SurveyOption {
  key: string;
  text: string;
  percentage: number;
}

interface SurveyQuestion {
  id: number;
  number: number;
  text: string;
  subtitle?: string;
  options: SurveyOption[];
}

interface Survey {
  id: string;
  status: string;
  endsOn: string;
  category: string;
  title: string;
  description: string;
  questions: SurveyQuestion[];
}

@Component({
  selector: 'app-survey-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './survey-detail.htm',
  styleUrl: './survey-detail.scss'
})
export class SurveyDetailComponent implements OnInit {

  @Input() surveyId: string | null = null;

  @Output() closeDetail = new EventEmitter<void>();

  @Output() openCreate = new EventEmitter<void>();

  survey: Survey | null = {
    id: '1',
    status: 'Active',
    endsOn: 'September 1, 2026',
    category: 'Team Activities',
    title: 'Let’s Plan the Next Team Event Together',
    description: 'Help us decide what we should do for our next team event.',
    questions: [
      {
        id: 1,
        number: 1,
        text: 'What type of event would you prefer?',
        subtitle: 'Choose your favorite option.',
        options: [
          {
            key: 'A',
            text: 'Outdoor activity',
            percentage: 45
          },
          {
            key: 'B',
            text: 'Dinner together',
            percentage: 30
          },
          {
            key: 'C',
            text: 'Game night',
            percentage: 25
          }
        ]
      },
      {
        id: 2,
        number: 2,
        text: 'When would you prefer the event?',
        options: [
          {
            key: 'A',
            text: 'Friday',
            percentage: 40
          },
          {
            key: 'B',
            text: 'Saturday',
            percentage: 45
          },
          {
            key: 'C',
            text: 'Sunday',
            percentage: 15
          }
        ]
      }
    ]
  };

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
    if (!this.survey) {
      return;
    }

    if (this.surveyId) {
      this.survey = {
        ...this.survey,
        id: this.surveyId
      };
    }
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

    return this.survey.status.toLowerCase() === 'ended';
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