# Yeinier Valdes — Business Intelligence Portfolio

Portfolio of business intelligence, data analytics, and data engineering projects focused on turning operational data into clear, actionable insights.

**View the portfolio:** [yeinier-personal-portfolio.netlify.app](https://yeinier-personal-portfolio.netlify.app/)

## Profile

I am a Business Intelligence professional focused on dashboard development, data modeling, KPI design, and data transformation. My projects demonstrate how I use Power BI, DAX, Power Query, SQL, and Python to analyze business performance and communicate findings clearly.

## Featured projects

### Emergency Operations & Patient Flow

An executive Power BI dashboard for monitoring emergency-department demand, patient flow, staffing, operational efficiency, and financial performance.

- Operational, workforce, and financial KPIs
- Patient-volume and wait-time analysis
- Executive overview with drill-down report pages

[View Power BI report](https://app.powerbi.com/view?r=eyJrIjoiNDA4NTVlY2MtYmNmZC00MzZiLTkyOWUtMmIyODJkNGE4YzE3IiwidCI6IjA1MjEzYjk4LTdiNzAtNDNlOS05YjVmLWVkYmMzODhmNjRkMCJ9) · [View repository](https://github.com/Yeinier22/emergency-operation-dashboard)

### Airport ETL Pipeline

A Python data pipeline that extracts, validates, transforms, and stores more than 85,000 airport records for reporting and analysis.

- Automated extraction and transformation workflow
- Data-quality validation and structured logging
- Parquet and SQLite outputs prepared for analytics

[View repository](https://github.com/Yeinier22/airport-etl-pipeline)

### Banking Analytics Dashboard

An interactive Power BI report for understanding customer demographics, financial health, transaction behavior, and card activity.

- Customer segmentation and demographic analysis
- Debt, balance, and financial-risk indicators
- Transaction and card-performance reporting

[View repository](https://github.com/Yeinier22/banking-analytics-dashboard)

### Pharmaceutical Sales Dashboard

A Power BI case study analyzing pharmaceutical sales performance across products, customers, teams, and geographic markets.

- Revenue and product-performance KPIs
- Customer and sales-team analysis
- Geographic and period-over-period comparisons

[View repository](https://github.com/Yeinier22/pharmaceutical-sales-dashboard)

## Core capabilities represented

- Power BI dashboard development
- DAX measures and KPI design
- Power Query and data transformation
- Data modeling and analytical storytelling
- SQL-based analysis
- Python ETL development
- Data validation and reporting automation

## Contact

Use the contact form on the [portfolio website](https://yeinier-personal-portfolio.netlify.app/) or connect with me through the professional links provided there.

## Analytics & Recruiter Traffic Tracking

The portfolio uses a first-party GA4 client in `src/analytics.js`, centralized thresholds in `src/analyticsConfig.js`, session attribution helpers in `src/analyticsAttribution.js`, and browser engagement observers in `src/engagementTracking.js`. GA4 is initialized once, automatic page-view delivery is disabled, and one manual `page_view` is sent with the original landing URL.

Analytics cannot prove that a visitor is a recruiter. It measures anonymous traffic attribution and behavior. It does not collect names, form values, email addresses, phone numbers, manually collected IP addresses, precise location, fingerprints, or inferred employer identity.

### Events

| Event | Meaning |
| --- | --- |
| `page_view` | Initial SPA page load; sent once |
| `project_view` | A project remains at least 40% visible for one second; once per project per session |
| `project_click` | A featured project repository is opened |
| `github_click` | The main GitHub profile is opened |
| `linkedin_click` | LinkedIn is opened from the header, contact section, or footer |
| `live_dashboard_click` | A Power BI or Microsoft Fabric report is opened |
| `external_link_click` | A deployed web project is opened |
| `scroll_depth` | First reach of 25%, 50%, 75%, or 100% during the page view |
| `engagement_15s`, `engagement_30s`, `engagement_60s`, `engagement_120s` | Active, visible, focused-tab time milestones |
| `resume_engaged_visit` | Resume-attributed visit meeting the documented engagement rule |
| `high_intent_visit` | Anonymous visit meeting the documented high-intent rule |

Every event receives the original available attribution: `traffic_source`, `traffic_medium`, `traffic_campaign`, `traffic_content`, `traffic_term`, `landing_page`, and `traffic_type`. It also receives a random, session-scoped `portfolio_session_id`. This ID contains no personal information, does not fingerprint the device, and does not replace GA4's identifiers.

Project events add `project_name`, `project_slug`, and `link_location`. Outbound events add `link_url`, `link_text`, and `destination_type` (`github`, `linkedin`, `live_dashboard`, or `external`).

### Behavioral definitions

`resume_engaged_visit` fires once per browser session when all three conditions are true:

1. `traffic_type` is `resume`.
2. The visitor accumulates at least 30 seconds of active time.
3. At least one project is meaningfully viewed or interacted with.

`high_intent_visit` fires once per browser session when active time reaches 60 seconds and at least one of these conditions is true:

- Two different projects were meaningfully viewed or interacted with.
- A live dashboard was opened.
- A featured project GitHub repository was opened.

Time accumulates only while the document is visible and the browser document has focus. Hidden or background tabs do not accumulate active time.

### Resume and job-application campaigns

Use lowercase `snake_case` for `utm_campaign`. Do not place names, email addresses, or other personal information in UTM values.

Generic résumé URL:

```text
https://yeinier-personal-portfolio.netlify.app/?utm_source=resume&utm_medium=pdf&utm_campaign=job_search&utm_content=portfolio_link
```

Company-specific example:

```text
https://yeinier-personal-portfolio.netlify.app/?utm_source=resume&utm_medium=pdf&utm_campaign=relativistic_engine&utm_content=portfolio_link
```

Additional campaign examples: `porsche_bi_analyst`, `royal_caribbean_bi`, `baptist_health`, and `uhealth`.

The first landing attribution is saved in `sessionStorage` and is not overwritten by later URL changes during the same browser session. Localhost is always classified as `internal_test`, even if its URL contains `utm_source=resume`.

Internal production test URL:

```text
https://yeinier-personal-portfolio.netlify.app/?utm_source=testing&utm_medium=internal&utm_campaign=analytics_qa
```

### Environment and local debug mode

Netlify requires:

```text
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Local development sends no analytics by default. To explicitly test locally, create an uncommitted `.env.local` containing:

```text
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
REACT_APP_GA_ENABLE_LOCAL_ANALYTICS=true
REACT_APP_GA_DEBUG=true
```

Restart the development server after changing environment variables. Debug mode adds `debug_mode: true` and logs the event name, complete parameters, attribution, project context, session ID, and milestones in the browser console. Production builds never emit these debug logs.

### GA4 configuration and reporting

In **Admin → Data display → Events**, mark these as Key Events:

- `resume_engaged_visit`
- `high_intent_visit`
- `live_dashboard_click`
- `github_click`

In **Admin → Data display → Custom definitions**, create event-scoped dimensions for `traffic_type`, `traffic_campaign`, `traffic_content`, `project_name`, `project_slug`, `link_location`, and `destination_type`. `portfolio_session_id` is intentionally high-cardinality; use it only for focused debugging or exported event-level analysis rather than routine standard reports.

Use:

- **Reports → Acquisition → Traffic acquisition** for GA4's native source, medium, and campaign reporting.
- **Reports → Engagement → Events** for event totals and Key Events.
- **Explore → Funnel exploration** for landing → engagement → project view → outbound project action.
- **Explore → Free form** with `traffic_campaign`, `project_slug`, and event name for application-level engagement.
- **Reports → Realtime** and **Admin → DebugView** for validation.

The SPA sends its own page view. In the web stream's Enhanced Measurement settings, disable **Page changes based on browser history events**. Because important outbound links have explicit custom events, also disable Enhanced Measurement's generic **Outbound clicks** event if you want one intentional analytics event per click instead of both GA4's generic `click` and the portfolio event.

### Development

```text
npm start
```

---

This repository contains the source code for the portfolio website. The website is the presentation layer for the business intelligence projects documented above.
