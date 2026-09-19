# Poll App

Poll App is a responsive web application for creating and participating in surveys.

The application was developed with Angular and provides an easy way to explore surveys, answer questions and view results.

## ✨ What you can do

Users can:

- Browse published and past surveys
- Find surveys that are ending soon
- Filter surveys by different categories
- Open a survey to see its questions and information
- Select answers and complete a survey
- See current survey results
- Create new surveys
- View past surveys without voting again
- Use the application on desktop, tablet and mobile devices

## 🛠️ Built with

The project uses:

- [Angular](https://angular.dev/) 22.1.6
- [Angular CLI](https://angular.dev/tools/cli) 22.1.8
- [TypeScript](https://www.typescriptlang.org/) 6.0.3
- [Supabase](https://supabase.com/)
- HTML
- SCSS

## 📂 How the project is organized

The Poll App is separated into different areas to keep the code organized and easier to maintain.

**Core**

Contains the survey data, models and services used throughout the application.

**Home Page**

Displays the survey overview, ending-soon surveys, categories and filters.

**Create Survey**

Contains the form and validation used when creating a new survey.

**Survey Detail**

Displays survey information, questions, answer options and survey results.

**Assets**

Contains the icons, images and fonts used by the application.

## ⚙️ Run the project

First install the required packages:

```bash
npm install
```

Then start the Angular development server:

```bash
ng serve
```

## 🏗️ Create a build

To create the production version of the application, run:

```bash
ng build
```

Angular creates the finished build inside the `dist` folder.

## 💡 Poll App

The goal of Poll App is to provide a simple and responsive way to work with surveys.

The application combines survey creation, participation, filtering, validation and result viewing in one interface.
