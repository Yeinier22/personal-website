# Yeinier Valdes — BI Developer Portfolio

A minimal portfolio focused on business intelligence, data analytics, data engineering, and selected React applications.

**Live site:** [yeinier-personal-portfolio.netlify.app](https://yeinier-personal-portfolio.netlify.app/)

## Featured work

- **Emergency Operations & Patient Flow** — Executive Power BI dashboard for operational, workforce, and financial analysis.
- **Airport ETL Pipeline** — Automated Python pipeline for extracting, transforming, and storing 85,000+ airport records.
- **Banking Analytics Dashboard** — Interactive Power BI report for customer, transaction, and financial-health analysis.

Additional React projects include Flight Finder, Movie Explorer, and Little Lemon.

## Design

The site uses a restrained, editorial layout with:

- White and neutral surfaces
- A single blue accent color
- Consistent 16:10 project imagery
- Responsive navigation and layouts
- Semantic HTML and accessible form controls
- Typography capped at 50 px for a compact visual hierarchy

## Technology

- React 18
- CSS
- Formik and Yup
- EmailJS
- Create React App
- Netlify

The interface is built with semantic React components and custom CSS. It does not depend on a component library.

## Local development

```bash
git clone https://github.com/Yeinier22/personal-website.git
cd personal-website
npm install
npm start
```

The development server runs at `http://localhost:3000`.

## Contact form configuration

Create a `.env` file:

```env
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
```

Use the same variables in the Netlify environment configuration.

## Validation

```bash
npm test -- --watchAll=false
npm run build
```

## Project structure

```text
src/
├── components/    Reusable page sections and UI
├── context/       Global alert state
├── hooks/         Contact form submission
├── images/        Project imagery
├── App.js
└── App.css
```
