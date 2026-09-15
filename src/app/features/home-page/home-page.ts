import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener
} from '@angular/core';

import { SURVEY_DATA } from '../../core/data/survey-data';
import { CreateComponent } from '../create-component/create-component';
import { SurveyDetailComponent } from '../survey-detail/survey-detail';

/**
 * Represents the available survey states on the homepage.
 */
type SurveyStatus = 'active' | 'past';

/**
 * Represents the survey information required by the homepage.
 */
interface Survey {
  id: string;
  category: string;
  title: string;
  deadline?: string;
  deadlineLabel: string;
  status: SurveyStatus;
}

/**
 * Displays active and past surveys on the homepage.
 *
 * The component handles ending-soon surveys, status tabs,
 * category filtering, survey details and the create-survey view.
 */
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    CreateComponent,
    SurveyDetailComponent
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {

  loadingSurveys = false;
  surveyError = '';

  currentStatus: SurveyStatus = 'active';
  activeCategory = 'All Surveys';

  categoryDropdownVisible = false;
  createSurveyVisible = false;

  selectedSurveyId: string | null = null;

  /**
   * Contains all available survey categories including
   * the option to display all surveys.
   */
  surveyCategories: string[] = [
    'All Surveys',
    ...Array.from(
      new Set(
        SURVEY_DATA.map(
          survey => survey.category
        )
      )
    )
  ];

  /**
   * Maps the central survey data to the structure
   * required by the homepage.
   */
  surveys: Survey[] = SURVEY_DATA.map(
    survey => ({
      id: survey.id,
      category: survey.category,
      title: survey.title,
      deadline: survey.endsOn,
      deadlineLabel: survey.badge,
      status:
        survey.status === 'Published'
          ? 'active'
          : 'past'
    })
  );

  /**
   * Returns up to three active surveys with the
   * earliest deadlines first.
   */
  get endingSoonSurveys(): Survey[] {
    return this.surveys
      .filter(
        survey =>
          survey.status === 'active' &&
          survey.deadline
      )
      .sort(
        (firstSurvey, secondSurvey) =>
          this.convertDate(
            firstSurvey.deadline!
          ).getTime() -
          this.convertDate(
            secondSurvey.deadline!
          ).getTime()
      )
      .slice(0, 3);
  }

  /**
   * Returns surveys matching the currently selected
   * status and category.
   */
  get displayedSurveys(): Survey[] {
    return this.surveys.filter(survey => {
      const matchesStatus =
        survey.status === this.currentStatus;

      const matchesCategory =
        this.activeCategory === 'All Surveys' ||
        survey.category === this.activeCategory;

      return matchesStatus && matchesCategory;
    });
  }

  /**
   * Changes between active and past surveys.
   *
   * The selected category is reset when switching tabs.
   *
   * @param status Status that should be displayed.
   */
  selectSurveyStatus(status: SurveyStatus): void {
    this.currentStatus = status;
    this.activeCategory = 'All Surveys';
    this.categoryDropdownVisible = false;
  }

  /**
   * Opens or closes the category dropdown.
   *
   * @param event Click event of the category button.
   */
  switchCategoryDropdown(event: MouseEvent): void {
    event.stopPropagation();

    this.categoryDropdownVisible =
      !this.categoryDropdownVisible;
  }

  /**
   * Selects a category used to filter the surveys.
   *
   * @param category Category selected by the user.
   * @param event Click event of the category option.
   */
  selectSurveyCategory(
    category: string,
    event: MouseEvent
  ): void {
    event.stopPropagation();

    this.activeCategory = category;
    this.categoryDropdownVisible = false;
  }

  /**
   * Resets the category filter to all surveys.
   *
   * @param event Click event of the reset action.
   */
  clearSurveyCategory(event: MouseEvent): void {
    event.stopPropagation();

    this.activeCategory = 'All Surveys';
    this.categoryDropdownVisible = false;
  }

  /**
   * Closes the category dropdown when clicking
   * outside of the dropdown.
   */
  @HostListener('document:click')
  closeCategoryDropdown(): void {
    this.categoryDropdownVisible = false;
  }

  /**
   * Opens the create-survey view.
   */
  showCreateSurvey(): void {
    this.createSurveyVisible = true;
  }

  /**
   * Closes the create-survey view.
   */
  hideCreateSurvey(): void {
    this.createSurveyVisible = false;
  }

  /**
   * Opens the detail view for a selected survey.
   *
   * @param surveyId Identifier of the selected survey.
   */
  showSurveyDetails(surveyId: string): void {
    this.selectedSurveyId = surveyId;
  }

  /**
   * Closes the currently displayed survey detail view.
   */
  closeSurveyDetails(): void {
    this.selectedSurveyId = null;
  }

  /**
   * Converts a date from DD.MM.YYYY into a Date object.
   *
   * @param date Date string that should be converted.
   * @returns Converted JavaScript Date object.
   */
  private convertDate(date: string): Date {
    const [day, month, year] = date.split('.');

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );
  }
}