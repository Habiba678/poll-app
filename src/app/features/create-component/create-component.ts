import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Output
} from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * Represents a single answer while creating a survey.
 */
interface CreateAnswer {
  key: string;
  text: string;
}

/**
 * Represents a question while creating a survey.
 */
interface CreateQuestion {
  id: number;
  text: string;
  multipleAnswers: boolean;
  answers: CreateAnswer[];
}

/**
 * Provides the form for creating a new survey.
 *
 * The component handles survey information, questions,
 * answer options, category selection and form validation.
 */
@Component({
  selector: 'app-create-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-component.html',
  styleUrl: './create-component.scss'
})
export class CreateComponent {

  /**
   * Emits when the create-survey view should be closed.
   */
  @Output() closeCreate = new EventEmitter<void>();

  /**
   * Emits after a survey has successfully passed validation
   * and the publish confirmation has been closed.
   */
  @Output() surveyPublished = new EventEmitter<void>();

  surveyTitle = '';
  surveyEndDate = '';
  surveyDescription = '';

  selectedCategory = '';
  categoryMenuOpen = false;

  publishAttempted = false;
  publishMessageVisible = false;
  publishClicked = false;

  /**
   * Categories available when creating a survey.
   */
  categoryOptions: string[] = [
    'Team Activities',
    'Health & Wellness',
    'Gaming & Entertainment',
    'Education & Learning',
    'Lifestyle & Preferences',
    'Technology & Innovation'
  ];

  /**
   * Questions currently included in the survey.
   */
  surveyQuestions: CreateQuestion[] = [
    this.createEmptyQuestion(1)
  ];

  /**
   * Returns today's date in the format required by
   * an HTML date input.
   */
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

  /**
   * Closes the create-survey view.
   */
  cancelCreate(): void {
    this.closeCreate.emit();
  }

  /**
   * Clears the entered survey title.
   */
  resetTitle(): void {
    this.surveyTitle = '';
  }

  /**
   * Clears the selected survey end date.
   */
  resetEndDate(): void {
    this.surveyEndDate = '';
  }

  /**
   * Clears the entered survey description.
   */
  resetDescription(): void {
    this.surveyDescription = '';
  }

  /**
   * Opens or closes the category dropdown.
   *
   * @param event Click event used to prevent the document
   * click listener from immediately closing the dropdown.
   */
  toggleCategories(event: Event): void {
    event.stopPropagation();

    this.categoryMenuOpen = !this.categoryMenuOpen;
  }

  /**
   * Selects a survey category and closes the category menu.
   *
   * @param category Category selected by the user.
   * @param event Click event of the selected category.
   */
  chooseCategory(
    category: string,
    event: Event
  ): void {
    event.stopPropagation();

    this.selectedCategory = category;
    this.categoryMenuOpen = false;
  }

  /**
   * Closes the category dropdown when the user clicks
   * somewhere outside of it.
   */
  @HostListener('document:click')
  closeCategoryMenu(): void {
    this.categoryMenuOpen = false;
  }

  /**
   * Adds a new empty question to the survey.
   */
  addQuestion(): void {
    const nextId =
      Math.max(
        ...this.surveyQuestions.map(
          question => question.id
        )
      ) + 1;

    this.surveyQuestions.push(
      this.createEmptyQuestion(nextId)
    );
  }

  /**
   * Deletes a question.
   *
   * The first question always remains available and is
   * cleared instead of being removed.
   *
   * @param questionIndex Index of the question to delete.
   */
  deleteQuestion(questionIndex: number): void {
    if (questionIndex === 0) {
      this.clearQuestion(
        this.surveyQuestions[0]
      );

      return;
    }

    this.surveyQuestions.splice(
      questionIndex,
      1
    );
  }

  /**
   * Adds another answer option to a question.
   *
   * A question can contain a maximum of five answers.
   *
   * @param question Question receiving the new answer.
   */
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

  /**
   * Deletes an answer option from a question.
   *
   * Every question keeps at least two answer options.
   *
   * @param question Question containing the answer.
   * @param answerIndex Index of the answer to delete.
   */
  deleteAnswer(
    question: CreateQuestion,
    answerIndex: number
  ): void {
    if (question.answers.length <= 2) {
      question.answers[answerIndex].text = '';

      return;
    }

    question.answers.splice(
      answerIndex,
      1
    );

    this.updateAnswerLetters(question);
  }

  /**
   * Validates the survey before publishing.
   *
   * If all required information is available,
   * the publish confirmation is displayed.
   */
  publishSurvey(): void {
    this.publishAttempted = true;

    if (!this.formIsComplete()) {
      this.publishClicked = false;
      return;
    }

    this.publishClicked = true;
    this.publishMessageVisible = true;
  }

  /**
   * Closes the publish confirmation and informs
   * the parent component that publishing was completed.
   */
  closePublishMessage(): void {
    this.publishMessageVisible = false;
    this.surveyPublished.emit();
  }

  /**
   * Checks whether all required survey fields contain
   * valid values.
   *
   * @returns True when the survey can be published.
   */
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

  /**
   * Creates a new question with two empty answer options.
   *
   * @param id Identifier assigned to the question.
   * @returns Newly created empty question.
   */
  private createEmptyQuestion(
    id: number
  ): CreateQuestion {
    return {
      id,
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
    };
  }

  /**
   * Restores a question to its initial empty state.
   *
   * @param question Question that should be cleared.
   */
  private clearQuestion(
    question: CreateQuestion
  ): void {
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

  /**
   * Reassigns answer letters after an answer was deleted.
   *
   * @param question Question whose answers should be updated.
   */
  private updateAnswerLetters(
    question: CreateQuestion
  ): void {
    question.answers.forEach(
      (answer, index) => {
        answer.key = String.fromCharCode(
          65 + index
        );
      }
    );
  }
}