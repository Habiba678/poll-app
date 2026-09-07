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
    title: 'Let’s Plan the Next Team Event Together',
    category: 'Team Activities',
    endsOn: '01.09.2026',
    badge: 'Ends in 1 Day',
    status: 'Published',
    isEndingSoon: true,
    description: 'Help us plan the next team event by sharing your preferences.',
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
    status: 'Published',
    isEndingSoon: true,
    description: 'Tell us about your fitness, health and wellness habits.',
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
    status: 'Published',
    isEndingSoon: true,
    description: 'Share your gaming habits and entertainment preferences.',
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
  },
  {
    id: '4',
    title: 'Discover Your Learning Style',
    category: 'Education & Learning',
    endsOn: '10.08.2026',
    badge: 'Ended',
    status: 'Past',
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
    badge: 'Ended',
    status: 'Past',
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