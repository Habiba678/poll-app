import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

import { SURVEY_DATA } from '../../core/data/survey-data';
import { CreateComponent } from '../create-component/create-component';
import { SurveyDetailComponent } from '../survey-detail/survey-detail';

type SurveyStatus = 'active' | 'past';

interface Survey {
  id: string;
  category: string;
  title: string;
  deadline: string;
  deadlineLabel: string;
  status: SurveyStatus;
}

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

  surveyCategories: string[] = [
    'All Surveys',
    ...Array.from(
      new Set(SURVEY_DATA.map(survey => survey.category))
    )
  ];

  surveys: Survey[] = SURVEY_DATA.map(survey => ({
    id: survey.id,
    category: survey.category,
    title: this.getHomepageTitle(survey.id, survey.title),
    deadline: survey.endsOn,
    deadlineLabel: survey.badge,
    status: survey.status === 'Published' ? 'active' : 'past'
  }));

  get endingSoonSurveys(): Survey[] {
    return this.surveys
      .filter(survey => survey.status === 'active')
      .sort(
        (firstSurvey, secondSurvey) =>
          this.convertDate(firstSurvey.deadline).getTime() -
          this.convertDate(secondSurvey.deadline).getTime()
      )
      .slice(0, 3);
  }

  get displayedSurveys(): Survey[] {
    return this.surveys.filter(survey => {
      const matchesStatus = survey.status === this.currentStatus;

      const matchesCategory =
        this.activeCategory === 'All Surveys' ||
        survey.category === this.activeCategory;

      return matchesStatus && matchesCategory;
    });
  }

  selectSurveyStatus(status: SurveyStatus): void {
    this.currentStatus = status;
    this.activeCategory = 'All Surveys';
    this.categoryDropdownVisible = false;
  }

  switchCategoryDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.categoryDropdownVisible = !this.categoryDropdownVisible;
  }

  selectSurveyCategory(category: string, event: MouseEvent): void {
    event.stopPropagation();
    this.activeCategory = category;
    this.categoryDropdownVisible = false;
  }

  clearSurveyCategory(event: MouseEvent): void {
    event.stopPropagation();
    this.activeCategory = 'All Surveys';
    this.categoryDropdownVisible = false;
  }

  @HostListener('document:click')
  closeCategoryDropdown(): void {
    this.categoryDropdownVisible = false;
  }

  showCreateSurvey(): void {
    this.createSurveyVisible = true;
  }

  hideCreateSurvey(): void {
    this.createSurveyVisible = false;
  }

  showSurveyDetails(surveyId: string): void {
    this.selectedSurveyId = surveyId;
  }

  closeSurveyDetails(): void {
    this.selectedSurveyId = null;
  }

  private getHomepageTitle(surveyId: string, originalTitle: string): string {
    if (surveyId === '1') {
      return 'Let’s Plan the Next Team Event Together';
    }

    if (surveyId === '2') {
      return 'Fit & wellness survey!';
    }

    if (surveyId === '3') {
      return 'Gaming habits and favorite games!';
    }

    return originalTitle;
  }

  private convertDate(date: string): Date {
    const [day, month, year] = date.split('.');

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );
  }
}