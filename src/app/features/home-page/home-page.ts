import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit
} from '@angular/core';

import { SURVEY_DATA } from '../../core/data/survey-data';
import { SurveyData } from '../../core/models/survey.model';
import {
  SurveyManagerService
} from '../../core/services/survey-manager.service';
import { CreateComponent } from '../create-component/create-component';
import { SurveyDetailComponent } from '../survey-detail/survey-detail';

/** Represents the available survey states. */
type SurveyStatus = 'active' | 'past';

/** Represents survey information used on the homepage. */
interface Survey {
  id: string;
  category: string;
  title: string;
  deadline?: string;
  deadlineLabel: string;
  status: SurveyStatus;
  isEndingSoon: boolean;
}

/** Displays surveys on the homepage. */
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
export class HomePage implements OnInit {
  loadingSurveys = false;
  surveyError = '';

  currentStatus: SurveyStatus = 'active';
  activeCategory = 'All Surveys';

  categoryDropdownVisible = false;
  createSurveyVisible = false;

  selectedSurveyId: string | null = null;

  /** Contains all survey categories. */
  surveyCategories: string[] = [
    'All Surveys',
    ...Array.from(
      new Set(
        SURVEY_DATA.map(survey => survey.category)
      )
    )
  ];

  /** Contains surveys displayed on the homepage. */
  surveys: Survey[] = SURVEY_DATA.map(
    survey => this.mapSurvey(survey)
  );

  constructor(
    private readonly surveyManagerService: SurveyManagerService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  /** Loads stored surveys when the homepage starts. */
  async ngOnInit(): Promise<void> {
    await this.loadStoredSurveys();
  }

  /** Loads created surveys from Supabase. */
  private async loadStoredSurveys(): Promise<void> {
    this.loadingSurveys = true;

    try {
      const storedSurveys =
        await this.surveyManagerService.loadManagedSurveys();

      storedSurveys.forEach(storedSurvey => {
        this.addStoredSurvey(storedSurvey);
      });

      this.surveys = [...this.surveys];
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Could not load surveys:', error);
      this.surveyError = 'Could not load surveys.';
    }

    this.loadingSurveys = false;
    this.cdr.detectChanges();
  }

  /** Adds a stored survey to the application data. */
  private addStoredSurvey(storedSurvey: any): void {
    if (SURVEY_DATA.some(survey => survey.id === storedSurvey.id)) {
      return;
    }

    const survey = this.mapStoredSurvey(storedSurvey);

    SURVEY_DATA.push(survey);
    this.surveys.unshift(this.mapSurvey(survey));
    this.addCategory(survey.category);
  }

  /** Converts stored Supabase data into SurveyData. */
  private mapStoredSurvey(storedSurvey: any): SurveyData {
    const endsOn = storedSurvey.ends_on || undefined;
    const isPast = storedSurvey.status === 'Past';

    return {
      id: storedSurvey.id,
      title: storedSurvey.title,
      category: storedSurvey.category,
      endsOn,
      badge: this.getDeadlineLabel(endsOn),
      detailEndLabel: endsOn
        ? `Ends on ${endsOn}`
        : 'Ongoing',
      status: isPast ? 'Past' : 'Published',
      isEndingSoon: false,
      description: storedSurvey.description ?? '',
      questions: storedSurvey.questions ?? []
    };
  }

  /** Creates the deadline label for a stored survey. */
  private getDeadlineLabel(endsOn?: string): string {
    if (!endsOn) {
      return 'Ends Ongoing';
    }

    return `Ends ${endsOn}`;
  }

  /** Returns surveys marked as ending soon. */
  get endingSoonSurveys(): Survey[] {
    return this.surveys
      .filter(
        survey =>
          survey.status === 'active' &&
          survey.isEndingSoon
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

  /** Returns surveys matching the selected filters. */
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

  /** Changes between active and past surveys. */
  selectSurveyStatus(status: SurveyStatus): void {
    this.currentStatus = status;
    this.activeCategory = 'All Surveys';
    this.categoryDropdownVisible = false;
  }

  /** Opens or closes the category dropdown. */
  switchCategoryDropdown(event: MouseEvent): void {
    event.stopPropagation();

    this.categoryDropdownVisible =
      !this.categoryDropdownVisible;
  }

  /** Selects a survey category. */
  selectSurveyCategory(
    category: string,
    event: MouseEvent
  ): void {
    event.stopPropagation();

    this.activeCategory = category;
    this.categoryDropdownVisible = false;
  }

  /** Resets the category filter. */
  clearSurveyCategory(event: MouseEvent): void {
    event.stopPropagation();

    this.activeCategory = 'All Surveys';
    this.categoryDropdownVisible = false;
  }

  /** Closes the category dropdown. */
  @HostListener('document:click')
  closeCategoryDropdown(): void {
    this.categoryDropdownVisible = false;
  }

  /** Opens the create-survey overlay. */
  showCreateSurvey(): void {
    this.createSurveyVisible = true;
  }

  /** Closes the create-survey overlay. */
  hideCreateSurvey(): void {
    this.createSurveyVisible = false;
  }

  /** Adds a newly published survey to the homepage. */
  handleSurveyPublished(survey: SurveyData): void {
    if (!SURVEY_DATA.some(item => item.id === survey.id)) {
      SURVEY_DATA.push(survey);
    }

    if (!this.surveys.some(item => item.id === survey.id)) {
      this.surveys.unshift(this.mapSurvey(survey));
    }

    this.surveys = [...this.surveys];
    this.addCategory(survey.category);

    this.currentStatus = 'active';
    this.activeCategory = 'All Surveys';
    this.createSurveyVisible = false;

    this.cdr.detectChanges();
  }

  /** Adds a new category when necessary. */
  private addCategory(category: string): void {
    if (this.surveyCategories.includes(category)) {
      return;
    }

    this.surveyCategories.push(category);
  }

  /** Maps survey data for the homepage. */
  private mapSurvey(survey: SurveyData): Survey {
    return {
      id: survey.id,
      category: survey.category,
      title: survey.title,
      deadline: survey.endsOn,
      deadlineLabel: survey.badge,
      status:
        survey.status === 'Published'
          ? 'active'
          : 'past',
      isEndingSoon: survey.isEndingSoon
    };
  }

  /** Opens a selected survey. */
  showSurveyDetails(surveyId: string): void {
    this.selectedSurveyId = surveyId;
  }

  /** Closes the survey detail view. */
  closeSurveyDetails(): void {
    this.selectedSurveyId = null;
  }

  /** Converts DD.MM.YYYY into a Date. */
  private convertDate(date: string): Date {
    const [day, month, year] = date.split('.');

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );
  }
}