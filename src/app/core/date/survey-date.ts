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
      description: 'Help us plan the next team event together.',
      questions: [
        {
          id: 1,
          number: 1,
          text: 'Which date would work best for you?',
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
          text: 'Which activity would you prefer?',
          subtitle: 'More than one answer is possible.',
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
      title: 'Fit & wellness survey!',
      category: 'Health & Wellness',
      endsOn: '02.09.2026',
      badge: 'Ends in 2 Days',
      status: 'Published',
      isEndingSoon: true,
      description: 'Tell us about your wellness preferences.',
      questions: [
        {
          id: 1,
          number: 1,
          text: 'How often do you exercise?',
          options: [
            {
              key: 'A',
              text: 'Daily',
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
      title: 'Gaming habits and favorite games!',
      category: 'Gaming & Entertainment',
      endsOn: '03.09.2026',
      badge: 'Ends in 3 Days',
      status: 'Published',
      isEndingSoon: true,
      description: 'Tell us about your gaming habits and favorite games.',
      questions: [
        {
          id: 1,
          number: 1,
          text: 'What is your favorite gaming platform?',
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
      title: 'What makes a great workplace?',
      category: 'Workplace Culture',
      endsOn: '15.08.2026',
      badge: 'Ended',
      status: 'Past',
      isEndingSoon: false,
      description: 'Share your thoughts about workplace culture.',
      questions: [
        {
          id: 1,
          number: 1,
          text: 'What is most important in a good workplace?',
          options: [
            {
              key: 'A',
              text: 'Good communication',
              percentage: 40
            },
            {
              key: 'B',
              text: 'Flexible working',
              percentage: 35
            },
            {
              key: 'C',
              text: 'Team atmosphere',
              percentage: 25
            }
          ]
        }
      ]
    },
    {
      id: '5',
      title: 'Favorite ways to learn',
      category: 'Education & Learning',
      endsOn: '10.08.2026',
      badge: 'Ended',
      status: 'Past',
      isEndingSoon: false,
      description: 'Tell us which learning methods you prefer.',
      questions: [
        {
          id: 1,
          number: 1,
          text: 'How do you prefer to learn?',
          options: [
            {
              key: 'A',
              text: 'Online courses',
              percentage: 50
            },
            {
              key: 'B',
              text: 'Workshops',
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
    }
  ];