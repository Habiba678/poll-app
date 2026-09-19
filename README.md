# Poll App

Poll App is a responsive survey application built with Angular and TypeScript.

The application allows users to browse surveys, filter them by category, view survey details, answer questions and see survey results.

## Features

- View active and past surveys
- View surveys that are ending soon
- Filter surveys by category
- Reset the category filter to show all surveys
- View detailed survey information
- Answer survey questions
- Select one or multiple answer options
- Validate required questions before completing a survey
- Complete active surveys
- Prevent voting on past surveys
- View survey results
- Create new surveys
- Responsive layout for desktop, tablet and mobile

## Technologies

- Angular 22
- Angular CLI 22.1.8
- Angular 22.1.6
- TypeScript 6.0.3
- RxJS 7.8.2
- HTML
- SCSS
- Supabase

## Angular

This project was built using Angular 22 and Angular CLI 22.1.8.

The installed Angular version is 22.1.6.

## Project Structure

The application is separated into different areas to keep the project organized.

- `core/data` – survey data
- `core/models` – survey models and interfaces
- `core/services` – services used by the application
- `features/home-page` – survey overview, categories and filters
- `features/create-component` – form for creating surveys
- `features/survey-detail` – survey questions, answers and results
- `scss` – shared styles and responsive mixins
- `public/assets` – icons, images and fonts

## Survey Status

Surveys can have different states:

- **Published** – surveys that are currently active
- **Past** – surveys that have already ended
- **Ongoing** – surveys without a fixed end date

Past surveys can still be viewed, but users cannot submit new answers to them.

## Development Server

Install the project dependencies:

```bash
npm install
```

Start the Angular development server:

```bash
ng serve
```

The application can then be opened locally in the browser.

## Production Build

Create a production build with:

```bash
ng build
```

The generated production files are stored inside the `dist` directory.

## About the Project

Poll App was created as an Angular project for working with surveys.

The main focus is on a clear survey overview, category filtering, survey participation, results and a responsive user interface.
