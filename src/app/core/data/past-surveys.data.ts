import { SurveyData } from '../models/survey.model';

/**
 * Contains additional survey data used by the application.
 *
 * The collection includes published surveys as well as
 * a past survey used for the completed-survey view.
 */
export const PAST_SURVEYS: SurveyData[] = [
  {
    id: '4',
    title: 'Discover Your Learning Style',
    category: 'Education & Learning',
    endsOn: '10.08.2026',
    badge: 'Ends Ongoing',
    detailEndLabel: 'Ongoing',
    status: 'Published',
    isEndingSoon: false,
    description: 'Share which learning methods and study habits work best for you.',
    questions: [
      {
        id: 1,
        number: 1,
        text: 'Which learning method do you prefer?',
        options: [
          {
            key: 'A',
            text: 'Online courses',
            percentage: 40
          },
          {
            key: 'B',
            text: 'Learning in groups',
            percentage: 25
          },
          {
            key: 'C',
            text: 'Self-study',
            percentage: 35
          }
        ]
      },
      {
        id: 2,
        number: 2,
        text: 'Which study tools do you use regularly?',
        subtitle: 'More than one answer is possible.',
        options: [
          {
            key: 'A',
            text: 'Notes',
            percentage: 35
          },
          {
            key: 'B',
            text: 'Flashcards',
            percentage: 25
          },
          {
            key: 'C',
            text: 'Learning videos',
            percentage: 30
          },
          {
            key: 'D',
            text: 'Practice exercises',
            percentage: 10
          }
        ]
      },
      {
        id: 3,
        number: 3,
        text: 'When do you usually study best?',
        options: [
          {
            key: 'A',
            text: 'Morning',
            percentage: 20
          },
          {
            key: 'B',
            text: 'Afternoon',
            percentage: 35
          },
          {
            key: 'C',
            text: 'Evening',
            percentage: 45
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
    detailEndLabel: 'Ended on 12.08.2026',
    status: 'Past',
    isEndingSoon: false,
    description: 'Tell us about your everyday habits and personal preferences.',
    questions: [
      {
        id: 1,
        number: 1,
        text: 'How do you prefer to spend your free time?',
        options: [
          {
            key: 'A',
            text: 'Sports and activities',
            percentage: 35
          },
          {
            key: 'B',
            text: 'Meeting friends',
            percentage: 30
          },
          {
            key: 'C',
            text: 'Relaxing at home',
            percentage: 25
          },
          {
            key: 'D',
            text: 'Going out',
            percentage: 10
          }
        ]
      },
      {
        id: 2,
        number: 2,
        text: 'Which activities are part of your weekend?',
        subtitle: 'More than one answer is possible.',
        options: [
          {
            key: 'A',
            text: 'Sports',
            percentage: 30
          },
          {
            key: 'B',
            text: 'Shopping',
            percentage: 20
          },
          {
            key: 'C',
            text: 'Meeting friends',
            percentage: 35
          },
          {
            key: 'D',
            text: 'Watching movies or series',
            percentage: 15
          }
        ]
      },
      {
        id: 3,
        number: 3,
        text: 'What is most important to you in everyday life?',
        options: [
          {
            key: 'A',
            text: 'Health',
            percentage: 40
          },
          {
            key: 'B',
            text: 'Family and friends',
            percentage: 35
          },
          {
            key: 'C',
            text: 'Career',
            percentage: 15
          },
          {
            key: 'D',
            text: 'Free time',
            percentage: 10
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
    badge: 'Ends in 6 months',
    detailEndLabel: 'Ends in 6 months',
    status: 'Published',
    isEndingSoon: false,
    description: 'Share how technology influences your everyday routines.',
    questions: [
      {
        id: 1,
        number: 1,
        text: 'Which device do you use the most?',
        options: [
          {
            key: 'A',
            text: 'Smartphone',
            percentage: 50
          },
          {
            key: 'B',
            text: 'Laptop',
            percentage: 30
          },
          {
            key: 'C',
            text: 'Tablet',
            percentage: 10
          },
          {
            key: 'D',
            text: 'Desktop PC',
            percentage: 10
          }
        ]
      },
      {
        id: 2,
        number: 2,
        text: 'What do you mainly use technology for?',
        subtitle: 'More than one answer is possible.',
        options: [
          {
            key: 'A',
            text: 'Communication',
            percentage: 30
          },
          {
            key: 'B',
            text: 'Work or school',
            percentage: 35
          },
          {
            key: 'C',
            text: 'Entertainment',
            percentage: 25
          },
          {
            key: 'D',
            text: 'Shopping',
            percentage: 10
          }
        ]
      },
      {
        id: 3,
        number: 3,
        text: 'How much time do you spend online each day?',
        options: [
          {
            key: 'A',
            text: 'Less than 2 hours',
            percentage: 15
          },
          {
            key: 'B',
            text: '2 to 4 hours',
            percentage: 35
          },
          {
            key: 'C',
            text: '4 to 6 hours',
            percentage: 30
          },
          {
            key: 'D',
            text: 'More than 6 hours',
            percentage: 20
          }
        ]
      },
      {
        id: 4,
        number: 4,
        text: 'Which technology would you like to use more in the future?',
        options: [
          {
            key: 'A',
            text: 'Artificial intelligence',
            percentage: 45
          },
          {
            key: 'B',
            text: 'Smart home devices',
            percentage: 25
          },
          {
            key: 'C',
            text: 'Virtual reality',
            percentage: 20
          },
          {
            key: 'D',
            text: 'Wearable technology',
            percentage: 10
          }
        ]
      }
    ]
  }
];