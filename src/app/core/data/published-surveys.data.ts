import { SurveyData } from '../models/survey.model';

/**
 * Contains all currently published surveys.
 *
 * These surveys are used as the initial published survey data
 * throughout the application.
 */
export const PUBLISHED_SURVEYS: SurveyData[] = [
  {
    id: '1',
    title: 'Let’s Plan the Next Team Event Together',
    category: 'Team Activities',
    endsOn: '01.09.2026',
    badge: 'Ends in 1 Day',
    detailEndLabel: 'Ends in 1 Day',
    status: 'Published',
    isEndingSoon: true,
    description:
      'Help us plan the next team event by sharing your preferences.',
    questions: [
      {
        id: 1,
        number: 1,
        text: 'Which day would work best for you?',
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
        text: 'Which activities would you prefer?',
        subtitle: 'More than one answer is possible.',
        options: [
          {
            key: 'A',
            text: 'Outdoor adventure',
            percentage: 32
          },
          {
            key: 'B',
            text: 'Dinner together',
            percentage: 28
          },
          {
            key: 'C',
            text: 'Bowling or mini-golf',
            percentage: 25
          },
          {
            key: 'D',
            text: 'Escape room',
            percentage: 15
          }
        ]
      },
      {
        id: 3,
        number: 3,
        text: 'What is most important to you at a team event?',
        options: [
          {
            key: 'A',
            text: 'Team bonding',
            percentage: 40
          },
          {
            key: 'B',
            text: 'Fun and entertainment',
            percentage: 35
          },
          {
            key: 'C',
            text: 'Trying something new',
            percentage: 25
          }
        ]
      },
      {
        id: 4,
        number: 4,
        text: 'How long should the event last?',
        options: [
          {
            key: 'A',
            text: 'A few hours',
            percentage: 50
          },
          {
            key: 'B',
            text: 'Half a day',
            percentage: 35
          },
          {
            key: 'C',
            text: 'A full day',
            percentage: 15
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Fit & wellness survey!',
    category: 'Health & Wellness',
    endsOn: '02.09.2026',
    badge: 'Ends in 2 Days',
    detailEndLabel: 'Ends in 6 months',
    status: 'Published',
    isEndingSoon: true,
    description:
      'Tell us about your fitness, health and wellness habits.',
    questions: [
      {
        id: 1,
        number: 1,
        text: 'How often are you physically active?',
        options: [
          {
            key: 'A',
            text: 'Every day',
            percentage: 25
          },
          {
            key: 'B',
            text: 'Several times a week',
            percentage: 50
          },
          {
            key: 'C',
            text: 'Once a week',
            percentage: 15
          },
          {
            key: 'D',
            text: 'Rarely',
            percentage: 10
          }
        ]
      },
      {
        id: 2,
        number: 2,
        text: 'Which activities do you enjoy most?',
        subtitle: 'More than one answer is possible.',
        options: [
          {
            key: 'A',
            text: 'Gym workouts',
            percentage: 35
          },
          {
            key: 'B',
            text: 'Running or walking',
            percentage: 30
          },
          {
            key: 'C',
            text: 'Football or team sports',
            percentage: 25
          },
          {
            key: 'D',
            text: 'Cycling',
            percentage: 10
          }
        ]
      },
      {
        id: 3,
        number: 3,
        text: 'What helps you relax the most?',
        options: [
          {
            key: 'A',
            text: 'Listening to music',
            percentage: 40
          },
          {
            key: 'B',
            text: 'Exercise',
            percentage: 30
          },
          {
            key: 'C',
            text: 'Spending time with friends',
            percentage: 20
          },
          {
            key: 'D',
            text: 'Reading or watching a series',
            percentage: 10
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Gaming habits and favorite games!',
    category: 'Gaming & Entertainment',
    endsOn: '03.09.2026',
    badge: 'Ends in 3 Days',
    detailEndLabel: 'Ongoing',
    status: 'Published',
    isEndingSoon: true,
    description:
      'Share your gaming habits and entertainment preferences.',
    questions: [
      {
        id: 1,
        number: 1,
        text: 'Which gaming platform do you use most?',
        options: [
          {
            key: 'A',
            text: 'PC',
            percentage: 40
          },
          {
            key: 'B',
            text: 'PlayStation',
            percentage: 30
          },
          {
            key: 'C',
            text: 'Xbox',
            percentage: 15
          },
          {
            key: 'D',
            text: 'Mobile',
            percentage: 15
          }
        ]
      },
      {
        id: 2,
        number: 2,
        text: 'Which game genres do you enjoy?',
        subtitle: 'More than one answer is possible.',
        options: [
          {
            key: 'A',
            text: 'Sports games',
            percentage: 30
          },
          {
            key: 'B',
            text: 'Action games',
            percentage: 35
          },
          {
            key: 'C',
            text: 'Racing games',
            percentage: 20
          },
          {
            key: 'D',
            text: 'Strategy games',
            percentage: 15
          }
        ]
      },
      {
        id: 3,
        number: 3,
        text: 'How often do you play video games?',
        options: [
          {
            key: 'A',
            text: 'Every day',
            percentage: 35
          },
          {
            key: 'B',
            text: 'Several times a week',
            percentage: 40
          },
          {
            key: 'C',
            text: 'Only on weekends',
            percentage: 15
          },
          {
            key: 'D',
            text: 'Rarely',
            percentage: 10
          }
        ]
      },
      {
        id: 4,
        number: 4,
        text: 'How do you prefer to play?',
        options: [
          {
            key: 'A',
            text: 'Online with friends',
            percentage: 45
          },
          {
            key: 'B',
            text: 'Single player',
            percentage: 30
          },
          {
            key: 'C',
            text: 'Local multiplayer',
            percentage: 25
          }
        ]
      }
    ]
  }
];