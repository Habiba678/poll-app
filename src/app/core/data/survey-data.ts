export interface SurveyOption {
  key: string;
  text: string;
  percentage: number;
}

export interface SurveyQuestion {
  id: number;
  number: number;
  text: string;
  subtitle?: string;
  options: SurveyOption[];
}

export interface SurveyData {
  id: string;
  title: string;
  category: string;
  endsOn: string;
  badge: string;
  status: 'Published' | 'Past';
  isEndingSoon: boolean;
  description: string;
  questions: SurveyQuestion[];
}

export const SURVEY_DATA: SurveyData[] = [
  {
    id: '1',
    title: 'Choose Our Next Team Activity',
    category: 'Team Activities',
    endsOn: '01.09.2026',
    badge: 'Ends in 1 Day',
    status: 'Published',
    isEndingSoon: true,
    description: 'Share your ideas for our next team activity.',
    questions: [
      {
        id: 1,
        number: 1,
        text: 'Which day works best for you?',
        subtitle: 'More than one answer is possible.',
        options: [
          {
            key: 'A',
            text: 'Friday',
            percentage: 27
          },
          {
            key: 'B',
            text: 'Saturday',
            percentage: 44
          },
          {
            key: 'C',
            text: 'Sunday',
            percentage: 29
          }
        ]
      },
      {
        id: 2,
        number: 2,
        text: 'What kind of activity would you enjoy?',
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
      }
    ]
  },
  {
    id: '2',
    title: 'Your Health and Fitness Routine',
    category: 'Health & Wellness',
    endsOn: '02.09.2026',
    badge: 'Ends in 2 Days',
    status: 'Published',
    isEndingSoon: true,
    description: 'Tell us about your health and fitness habits.',
    questions: [
      {
        id: 1,
        number: 1,
        text: 'How often are you physically active?',
        options: [
          {
            key: 'A',
            text: 'Every day',
            percentage: 35
          },
          {
            key: 'B',
            text: 'Several times a week',
            percentage: 50
          },
          {
            key: 'C',
            text: 'Rarely',
            percentage: 15
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'How Do You Like to Play?',
    category: 'Gaming & Entertainment',
    endsOn: '03.09.2026',
    badge: 'Ends in 3 Days',
    status: 'Published',
    isEndingSoon: true,
    description: 'Share your gaming and entertainment preferences.',
    questions: [
      {
        id: 1,
        number: 1,
        text: 'Which gaming platform do you use most?',
        options: [
          {
            key: 'A',
            text: 'PC',
            percentage: 45
          },
          {
            key: 'B',
            text: 'Console',
            percentage: 35
          },
          {
            key: 'C',
            text: 'Mobile',
            percentage: 20
          }
        ]
      }
    ]
  },
  {
    id: '4',
    title: 'Discover Your Learning Style',
    category: 'Education & Learning',
    endsOn: '10.08.2026',
    badge: 'Ended',
    status: 'Past',
    isEndingSoon: false,
    description: 'Share which learning methods work best for you.',
    questions: [
      {
        id: 1,
        number: 1,
        text: 'Which learning method do you prefer?',
        options: [
          {
            key: 'A',
            text: 'Online courses',
            percentage: 50
          },
          {
            key: 'B',
            text: 'Learning in groups',
            percentage: 30
          },
          {
            key: 'C',
            text: 'Self-study',
            percentage: 20
          }
        ]
      }
    ]
  },
  {
    id: '5',
    title: 'Everyday Choices and Preferences',
    category: 'Lifestyle & Preferences',
    endsOn: '12.08.2026',
    badge: 'Ended',
    status: 'Past',
    isEndingSoon: false,
    description: 'Tell us about some of your everyday preferences.',
    questions: [
      {
        id: 1,
        number: 1,
        text: 'How do you prefer to spend your free time?',
        options: [
          {
            key: 'A',
            text: 'Sports and activities',
            percentage: 40
          },
          {
            key: 'B',
            text: 'Meeting friends',
            percentage: 35
          },
          {
            key: 'C',
            text: 'Relaxing at home',
            percentage: 25
          }
        ]
      }
    ]
  },
  {
    id: '6',
    title: 'Technology in Everyday Life',
    category: 'Technology & Innovation',
    endsOn: '14.08.2026',
    badge: 'Ended',
    status: 'Past',
    isEndingSoon: false,
    description: 'Share how technology influences your everyday life.',
    questions: [
      {
        id: 1,
        number: 1,
        text: 'Which device do you use the most?',
        options: [
          {
            key: 'A',
            text: 'Smartphone',
            percentage: 55
          },
          {
            key: 'B',
            text: 'Laptop',
            percentage: 30
          },
          {
            key: 'C',
            text: 'Tablet',
            percentage: 15
          }
        ]
      }
    ]
  }
];