# GrowthScope Application Plan

## Application Structure

GrowthScope will be built as a single-page interactive web application. Users will move through a guided analysis process without needing to load separate pages.

## User Journey

### 1. Landing / Introduction

Purpose:
Introduce GrowthScope and explain what the application helps users do.

Content:
- GrowthScope name and short value proposition
- Brief explanation of funnel analysis
- "Start analysing" button
- Simple explanation that users do not need every metric to use the tool

### 2. Funnel Setup

Purpose:
Help the user understand what data they can enter.

Content:
- Marketing funnel stages:
  - Spend
  - Impressions
  - Clicks
  - Website visits
  - Leads
  - MQLs
  - Opportunities
  - Customers
  - Revenue
- Plain-English explanation for each metric
- "Where do I find this?" guidance
- Data entry fields
- Users can leave unavailable metrics blank

### 3. Data Validation

Purpose:
Check the user's data before analysis.

Functionality:
- Detect invalid numbers
- Prevent negative values
- Check for potentially inconsistent funnel data
- Give clear feedback explaining what needs attention
- Allow valid partial data to continue

### 4. Analysis Results

Purpose:
Turn the user's raw data into useful marketing KPIs.

Possible calculations include:
- CTR
- CPC
- CPM
- Visit-to-lead conversion rate
- CPL
- Lead-to-MQL conversion rate
- MQL-to-opportunity conversion rate
- Opportunity-to-customer conversion rate
- CAC
- ROAS

Only metrics that can be calculated from the available data will be displayed.

### 5. Funnel Diagnosis

Purpose:
Help the user understand where to investigate performance.

Functionality:
- Compare conversion rates between funnel stages
- Identify the largest proportional drop
- Explain that the result indicates an area to investigate rather than proving the cause
- Provide relevant investigation prompts

### 6. Scenario Planner

Purpose:
Allow users to explore the potential effect of improving a funnel stage.

Functionality:
- Select a funnel conversion stage
- Enter a new target conversion rate
- Recalculate downstream funnel numbers
- Display projected differences clearly
- Label results as projections rather than guaranteed outcomes

### 7. Reset / New Analysis

Purpose:
Allow the user to analyse another campaign or dataset.

Functionality:
- Clear the current analysis
- Return to the starting state