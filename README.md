# Poll App

A responsive survey application built with **Angular** and **TypeScript**.

Poll App allows users to browse surveys, filter them by category, view survey details, answer questions and see survey results.

---

## ✨ Features

- 📋 **Survey Overview** – View active and past surveys
- 🔥 **Ending Soon** – See surveys that are ending soon
- 🏷️ **Category Filter** – Filter surveys by category
- 🔄 **Reset Filter** – Return to all surveys
- 🔎 **Survey Details** – View questions, options and additional information
- 🗳️ **Vote on Surveys** – Select answers for survey questions
- ✅ **Validation** – Required questions must be answered
- 📊 **Survey Results** – View current survey results
- 📝 **Create Surveys** – Create new surveys
- 🔒 **Past Surveys** – Past surveys can be viewed but not submitted again
- 📱 **Responsive Design** – Optimized for desktop, tablet and mobile

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---:|---|
| [Angular](https://angular.dev/) | 22.1.6 | Frontend framework |
| [Angular CLI](https://angular.dev/tools/cli) | 22.1.8 | Angular development tools |
| [TypeScript](https://www.typescriptlang.org/) | 6.0.3 | Application logic |
| [RxJS](https://rxjs.dev/) | 7.8.2 | Reactive programming |
| [Supabase](https://supabase.com/) | — | Backend connection |
| SCSS | — | Styling |
| HTML | — | Application structure |

---

## 🅰️ Angular

This project was built with **Angular 22**.

- Angular: **22.1.6**
- Angular CLI: **22.1.8**
- TypeScript: **6.0.3**

For more information about Angular, visit the
[official Angular documentation](https://angular.dev/).

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── core/
│   │   ├── data/
│   │   ├── models/
│   │   └── services/
│   │
│   └── features/
│       ├── home-page/
│       ├── create-component/
│       └── survey-detail/
│
├── scss/
│   ├── fonts.scss
│   └── mixins.scss
│
└── styles.scss

public/
└── assets/
    ├── fonts/
    ├── icons/
    └── img/
```

---

## 📌 Survey Status

The application supports different survey states:

| Status | Description |
|---|---|
| 🟢 **Published** | Survey is currently active |
| 🟠 **Ongoing** | Survey has no fixed end date |
| ⚪ **Past** | Survey has already ended |

Past surveys can still be viewed, but new answers cannot be submitted.

---

## 🚀 Getting Started

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
ng serve
```

The application will then run locally.

---

## 🏗️ Production Build

Create a production build:

```bash
ng build
```

The generated files are stored inside the `dist` directory.

---

## 💡 About the Project

Poll App is an Angular application for creating, browsing and participating in surveys.

The project focuses on a clear survey overview, category filtering, survey participation, results and a responsive user interface.
