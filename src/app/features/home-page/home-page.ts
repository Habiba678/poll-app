import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

import { CreateComponent } from '../create-component/create-component';
import { SurveyDetailComponent } from '../survey-detail/survey-detail';

type SurveyStatus = 'active' | 'past';

interface Survey {
  id: number;
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
    SurveyDetailComponent,
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

  selectedSurveyId: number | null = null;

  surveyCategories: string[] = [
    'All Surveys',
    'Team Activities',
    'Health & Wellness',
    'Gaming & Entertainment',
    'Education & Learning',
    'Lifestyle & Preferences',
    'Technology & Innovation',
    'Workplace Culture'
  ];

  surveys: Survey[] = [
    {
      id: 1,
      category: 'Team Activities',
      title: 'Let’s Plan the Next Team Event Together',
      deadline: '2026-09-01',
      deadlineLabel: 'Ends in 1 Day',
      status: 'active'
    },
    {
      id: 2,
      category: 'Health & Wellness',
      title: 'Fit & wellness survey!',
      deadline: '2026-09-02',
      deadlineLabel: 'Ends in 2 Days',
      status: 'active'
    },
    {
      id: 3,
      category: 'Gaming & Entertainment',
      title: 'Gaming habits and favorite games!',
      deadline: '2026-09-03',
      deadlineLabel: 'Ends in 3 Days',
      status: 'active'
    },
    {
      id: 4,
      category: 'Team Activities',
      title: 'Let’s Plan the Next Team Event Together',
      deadline: '2026-09-04',
      deadlineLabel: 'Ends in 4 Days',
      status: 'active'
    },
    {
      id: 5,
      category: 'Gaming & Entertainment',
      title: 'Gaming habits and favorite games!',
      deadline: '2026-09-05',
      deadlineLabel: 'Ends in 5 Days',
      status: 'active'
    },
    {
      id: 6,
      category: 'Health & Wellness',
      title: 'Healthier future: Fit & wellness survey!',
      deadline: '2026-09-06',
      deadlineLabel: 'Ends in 6 Days',
      status: 'active'
    },
    {
      id: 7,
      category: 'Workplace Culture',
      title: 'What makes a great workplace?',
      deadline: '2026-08-15',
      deadlineLabel: 'Ended',
      status: 'past'
    },
    {
      id: 8,
      category: 'Education & Learning',
      title: 'Favorite ways to learn',
      deadline: '2026-08-10',
      deadlineLabel: 'Ended',
      status: 'past'
    }
  ];

  get endingSoonSurveys(): Survey[] {
    return this.surveys
      .filter((survey) => survey.status === 'active')
      .sort(
        (firstSurvey, secondSurvey) =>
          new Date(firstSurvey.deadline).getTime() -
          new Date(secondSurvey.deadline).getTime()
      )
      .slice(0, 3);
  }

  get displayedSurveys(): Survey[] {
    return this.surveys.filter((survey) => {
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

  showSurveyDetails(surveyId: number): void {
    this.selectedSurveyId = surveyId;
  }

  closeSurveyDetails(): void {
    this.selectedSurveyId = null;
  }
}