const setupForm = document.getElementById("setup-form");
const setupStep = document.getElementById("analysis");

const funnelForm = document.getElementById("funnel-form");
const funnelStep = document.getElementById("funnel-step");

const reviewStep = document.getElementById("review-step");

const backToSetupButton = document.getElementById("back-to-setup");
const backToFunnelButton = document.getElementById("back-to-funnel");

const funnelFeedback = document.getElementById("funnel-feedback");
const dataCheck = document.getElementById("data-check");

const resultsStep = document.getElementById("results-step");

const analyseFunnelButton = document.getElementById("analyse-funnel");
const backToReviewButton = document.getElementById("back-to-review");

const beginnerGuidance = document.getElementById("beginner-guidance");
const funnelGuidance = document.querySelector(".funnel-guidance");

const funnelInsight = document.getElementById("funnel-insight");

let userExperience = "";
let userTools = [];

const trafficGuidance = {
    spend: {
        definition:
            "The total amount you spent on paid advertising during the period you are analysing.",

        tools: {
            "google-ads":
                "<strong>Google Ads</strong><br>" +
                "1. Open Google Ads and go to Campaigns.<br>" +
                "2. Set the date range to the period you are analysing.<br>" +
                "3. Find the Cost column.<br>" +
                "4. Copy the total Cost for that period.<br>" +
                "Can't see it? Use Columns to add Cost.",

            "meta-ads":
                "<strong>Meta Ads</strong><br>" +
                "1. Open Ads Manager.<br>" +
                "2. Set the date range to the period you are analysing.<br>" +
                "3. Find Amount spent in your reporting columns.<br>" +
                "4. Copy the total for that period.",

            "linkedin-ads":
                "<strong>LinkedIn Ads</strong><br>" +
                "1. Open Campaign Manager and select your ad account.<br>" +
                "2. Set the reporting date range.<br>" +
                "3. Choose the Performance columns.<br>" +
                "4. Find Spent and copy the total.",
            
            "other":
                "<strong>Other tool</strong><br>" +
                "Look in the advertising platform or reporting tool where your campaign costs are recorded. " +
                "Set the same reporting period and find the total amount spent on paid advertising.",

            "not-sure":
                "<strong>Not sure where to look?</strong><br>" +
                "Spend normally comes from the platform where your paid ads are running. " +
                "Look for a metric called Cost, Spend or Amount spent. " +
                "If you are not running paid advertising, you can leave this field blank."
        },

        note:
            "Using more than one ad platform? Add the spend from each platform together."
    },

    impressions: {
        definition:
            "The total number of times your ads were shown during the reporting period.",

        tools: {
            "google-ads":
                "<strong>Google Ads</strong><br>" +
                "Go to Campaigns, set your date range and copy the total from the Impr. column.",

            "meta-ads":
                "<strong>Meta Ads</strong><br>" +
                "Open Ads Manager, set your date range and find Impressions in the reporting columns.",

            "linkedin-ads":
                "<strong>LinkedIn Ads</strong><br>" +
                "Open Campaign Manager, choose Performance columns and copy Impressions.",
            
            "other":
                "<strong>Other tool</strong><br>" +
                "Look in the advertising platform or reporting tool where your campaigns are running. " +
                "Find a metric called Impressions, Views or Times shown, and use the total for the same reporting period.",

            "not-sure":
                "<strong>Not sure where to look?</strong><br>" +
                "Impressions usually come from your advertising platform. " +
                "Look for a metric called Impressions or Views. " +
                "If you are not running paid campaigns, you can leave this field blank."
        },

        note:
            "If you use several ad platforms, add their impressions together."
    },

    clicks: {
        definition:
            "The number of times people clicked through from your paid ads.",

        tools: {
            "google-ads":
                "<strong>Google Ads</strong><br>" +
                "Go to Campaigns, set the same date range and copy Clicks.",

            "meta-ads":
                "<strong>Meta Ads</strong><br>" +
                "Open Ads Manager and use Link clicks so the figure represents clicks through from your ads.",

            "linkedin-ads":
                "<strong>LinkedIn Ads</strong><br>" +
                "Open Campaign Manager, choose Performance columns and copy Clicks.",
            
            "other":
                "<strong>Other tool</strong><br>" +
                "Look in the platform where your ads or campaigns are running. " +
                "Find Clicks, Link clicks or a similar click-through metric for the same reporting period.",

            "not-sure":
                "<strong>Not sure where to look?</strong><br>" +
                "Clicks are usually tracked in your advertising platform. " +
                "Look for Clicks or Link clicks. " +
                "If you cannot find a reliable click number, leave this field blank."
        },

        note:
            "Use the same type of click across your channels where possible."
    },

    visits: {
        definition:
            "The total number of website sessions during the period you are analysing.",

        tools: {
            "ga4":
                "<strong>GA4</strong><br>" +
                "1. Open Google Analytics.<br>" +
                "2. Go to Reports → Acquisition → Traffic acquisition.<br>" +
                "3. Set the same date range as your campaign data.<br>" +
                "4. Copy the Sessions total.",
            "other":
                "<strong>Other tool</strong><br>" +
                "Use your website analytics platform and look for Sessions, Visits or Website traffic. " +
                "Set the same reporting period and use the total number of visits or sessions.",

            "not-sure":
                "<strong>Not sure where to look?</strong><br>" +
                "Website sessions usually come from an analytics tool such as Google Analytics. " +
                "Look for Sessions, Visits or Website traffic. " +
                "If you do not have website analytics set up, leave this field blank."
        },

        note:
            "Use GA4 for website sessions rather than adding clicks from your ad platforms."
    },

    leads: {
        definition:
            "People or organisations who have shown enough interest to become a potential sales contact.",

        tools: {
            "hubspot":
                "<strong>HubSpot</strong><br>" +
                "1. Open Contacts.<br>" +
                "2. Filter by Lifecycle stage = Lead.<br>" +
                "3. Use the reporting period you are analysing.<br>" +
                "4. Count the leads for that period.<br>" +
                "If your team uses custom lifecycle stages, use your organisation's definition of a lead.",

            "salesforce":
                "<strong>Salesforce</strong><br>" +
                "1. Open the Reports tab.<br>" +
                "2. Create or open a Leads report.<br>" +
                "3. Set Created Date to the period you are analysing.<br>" +
                "4. Use the total number of leads in the report.",

            "other":
                "<strong>Other tool</strong><br>" +
                "Open the system where your organisation stores leads or contacts. " +
                "Find a lead report or contact list, set the same reporting period and use the number of new leads.",

            "not-sure":
                "<strong>Not sure where to look?</strong><br>" +
                "Leads are usually stored in a CRM or marketing platform. " +
                "Look for a contacts, leads or form-submissions area. " +
             "If your organisation does not track leads, you can leave this field blank."
            },

            note:
                "Use your organisation's definition of a lead consistently across the whole reporting period."
    }, 
    
    mqls: {
        definition:
            "Leads that meet your marketing team's criteria for being ready for further sales attention.",

        tools: {
            "hubspot":
                "<strong>HubSpot</strong><br>" +
                "1. Open Contacts.<br>" +
                "2. Filter by Lifecycle stage = Marketing Qualified Lead.<br>" +
                "3. Set the reporting period you are analysing.<br>" +
                "4. Use the number of contacts that became MQLs during that period.",

            "salesforce":
                "<strong>Salesforce</strong><br>" +
                "MQL is not always a standard Salesforce field.<br>" +
                "1. Check whether your organisation uses Lead Status, a custom MQL field or a marketing integration.<br>" +
                "2. Filter to the period you are analysing.<br>" +
                "3. Use the number your organisation defines as MQLs.",

            "other":
                "<strong>Other tool</strong><br>" +
                "Look for a lifecycle stage, lead status or qualification field that identifies marketing-qualified leads. " +
                "Use the count for the same reporting period.",

            "not-sure":
                "<strong>Not sure where to look?</strong><br>" +
                "Ask how your organisation defines an MQL. It may be based on lead score, behaviour, job role or another qualification rule. " +
                "If MQLs are not tracked, leave this field blank."
        },

        note:
            "Use the same MQL definition your organisation uses internally."
    },

    opportunities: {
        definition:
            "Qualified potential deals that have progressed into an active sales opportunity.",

        tools: {
            "hubspot":
                "<strong>HubSpot</strong><br>" +
                "1. Open Contacts or Deals.<br>" +
                "2. Filter by Lifecycle stage = Opportunity, or use your Deals pipeline.<br>" +
                "3. Set the same reporting period.<br>" +
                "4. Count the opportunities created during that period.",

            "salesforce":
                "<strong>Salesforce</strong><br>" +
                "1. Open the Reports tab.<br>" +
                "2. Create or open an Opportunities report.<br>" +
                "3. Set Created Date to the reporting period.<br>" +
                "4. Use the total number of opportunities created.",

            "other":
                "<strong>Other tool</strong><br>" +
                "Look in your CRM or sales platform for deals, opportunities or pipeline records. " +
                "Use the number created during the same reporting period.",

            "not-sure":
                "<strong>Not sure where to look?</strong><br>" +
                "Opportunities are usually tracked by the sales team in a CRM. " +
                "Look for areas called Deals, Opportunities or Pipeline. " +
                "If your organisation does not track this stage, leave it blank."
        },

        note:
            "Count opportunities using the same definition and date period across your funnel."
    },

    customers: {
    definition:
        "The number of new customers won during the period you are analysing.",

    tools: {
        "hubspot":
            "<strong>HubSpot</strong><br>" +
            "1. Open Contacts.<br>" +
            "2. Filter by Lifecycle stage = Customer.<br>" +
            "3. Set the reporting period you are analysing.<br>" +
            "4. Use the number of contacts that became customers during that period.",

        "salesforce":
            "<strong>Salesforce</strong><br>" +
            "1. Open the Reports tab.<br>" +
            "2. Use an Opportunities report.<br>" +
            "3. Filter Stage = Closed Won.<br>" +
            "4. Set the reporting period.<br>" +
            "5. Use the number of won opportunities as your customer count.",

        "other":
            "<strong>Other tool</strong><br>" +
            "Look in your CRM, sales platform or customer database for new customers, closed-won deals or completed sales. " +
            "Use the count for the same reporting period.",

        "not-sure":
            "<strong>Not sure where to look?</strong><br>" +
            "Customer numbers are usually tracked in a CRM, sales system or billing platform. " +
            "Look for Closed Won, Customers or Completed Sales. " +
            "If you cannot find a reliable number, leave this field blank."
    },

    note:
        "Use the same customer definition your organisation uses for reporting."
},

    revenue: {
        definition:
            "The total revenue generated from the customers included in this funnel period.",

        tools: {
            "hubspot":
                "<strong>HubSpot</strong><br>" +
                "1. Open Deals or your sales reports.<br>" +
                "2. Filter to closed-won deals for the reporting period.<br>" +
                "3. Find the Amount or revenue value.<br>" +
                "4. Use the total revenue for those deals.",

            "salesforce":
                "<strong>Salesforce</strong><br>" +
                "1. Open an Opportunities report.<br>" +
                "2. Filter Stage = Closed Won.<br>" +
                "3. Set the reporting period.<br>" +
                "4. Sum the Amount field for those opportunities.",

            "other":
                "<strong>Other tool</strong><br>" +
                "Use your CRM, sales system or finance platform to find revenue from new customers or won deals during the same period.",

            "not-sure":
                "<strong>Not sure where to look?</strong><br>" +
                "Revenue is usually available in your CRM, sales system, ecommerce platform or finance software. " +
                "Use the total linked to the customers in this funnel if possible. " +
                "If you cannot match revenue reliably, leave it blank."
        },

        note:
            "Make sure the revenue period matches the rest of the funnel data." 
    }   

};

function renderTrafficGuidance(metric) {
    const panel = document.getElementById(`${metric}-guidance`);
    const content = document.getElementById(
        `${metric}-guidance-content`
    );

    const guidance = trafficGuidance[metric];

    panel.hidden = true;
    panel.removeAttribute("open");
    content.innerHTML = "";

    if (userExperience === "experienced") {
        return;
    }

    const instructions = userTools
        .filter(function (tool) {
            return guidance.tools[tool];
        })
       .map(function (tool) {
        return `
            <div class="tool-guidance-card">
                ${guidance.tools[tool]}
            </div>
        `;
    });

    if (instructions.length === 0) {
        return;
    }

    content.innerHTML =
        `<div class="guidance-definition">
            <strong>What is this?</strong>
            <p>${guidance.definition}</p>
        </div>` +
        `<div class="tool-guidance-grid">
            ${instructions.join("")}
        </div>` +
        `<div class="guidance-note">
            <strong>Tip:</strong> ${guidance.note}
        </div>`;

    panel.hidden = false;

    if (userExperience === "beginner" && metric === "spend") {
        panel.setAttribute("open", "");
    }
}

setupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedExperience = document.querySelector(
    'input[name="experience"]:checked'
    );

    userExperience=selectedExperience.value;

    if (userExperience === "beginner") {
    beginnerGuidance.textContent =
        "New to funnel metrics? We’ll explain what each number means and help you find it in the tools you selected.";

    beginnerGuidance.hidden = false;
    funnelGuidance.hidden = false;

    } else if (userExperience === "comfortable") {
        beginnerGuidance.textContent =
            "You’ll get a cleaner view, with extra guidance available when you need it.";

        beginnerGuidance.hidden = false;
        funnelGuidance.hidden = false;

    } else {
        beginnerGuidance.hidden = true;
        funnelGuidance.hidden = true;
    }

    const selectedTools = document.querySelectorAll(
    'input[name="tools"]:checked'
);

userTools = Array.from(selectedTools).map(function (tool) {
    return tool.value;
});

renderTrafficGuidance("spend");
renderTrafficGuidance("impressions");
renderTrafficGuidance("clicks");
renderTrafficGuidance("visits");
renderTrafficGuidance("leads");
renderTrafficGuidance("mqls");
renderTrafficGuidance("opportunities");
renderTrafficGuidance("customers");
renderTrafficGuidance("revenue");

const toolGuidance = document.getElementById("tool-guidance");

toolGuidance.innerHTML = "";

const selectedLabel = document.createElement("span");
selectedLabel.className = "selected-tools-label";
selectedLabel.textContent = "You selected:";
toolGuidance.appendChild(selectedLabel);

selectedTools.forEach((tool) => {
    const chip = document.createElement("span");
    chip.className = "selected-tool-chip";

    const toolName = tool.parentElement.textContent.trim();
    const logo = tool.parentElement.querySelector(".tool-logo");

    if (logo) {
        const chipLogo = logo.cloneNode(true);
        chip.appendChild(chipLogo);
    }

    chip.append(toolName);
    toolGuidance.appendChild(chip);
});

toolGuidance.hidden = selectedTools.length === 0;
 

    setupStep.hidden = true;
    funnelStep.hidden = false;

    funnelStep.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });  
});


backToSetupButton.addEventListener("click", function() {
    funnelStep.hidden = true;
    setupStep.hidden = false;

    setupStep.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

function getInputValue(id) {
    const input = document.getElementById(id);

    if (input.value === "") {
        return null;
    }

    return Number(input.value);
}

function showReviewValue(id, value, isCurrency = false) {
    const reviewElement = document.getElementById(id);

    if (value === null) {
        reviewElement.textContent = "Not provided";
        return;
    }

    if (isCurrency) {
        reviewElement.textContent = `£${value.toLocaleString()}`;
    } else {
        reviewElement.textContent = value.toLocaleString();
    }
    }

    function calculatePercentage(part, total) {
        if (
            part === null ||
            total === null ||
            total === 0
        ) {
            return null;
        }

        return (part / total) * 100;
    }

    function calculateCost(cost, result) {
        if (
            cost === null ||
            result === null ||
            result === 0
        ) {
            return null;
        }
        return cost / result;
    }

    function showResult(id, value, format = "number") {
        const resultElement = document.getElementById(id);

        if (value === null) {
            resultElement.textContent = "Not available";
            return;
        }

        if (format === "percentage") {
            resultElement.textContent = `${value.toFixed(1)}%`;
        } else if (format === "currency") {
            resultElement.textContent = `£${value.toFixed(2)}`;
        } else if (format === "ratio") {
            resultElement.textContent = `${value.toFixed(2)}×`;
        } else {
            resultElement.textContent = value.toFixed(2);
        }
    }


    funnelForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const spend = getInputValue("spend");
        const impressions = getInputValue("impressions");
        const clicks = getInputValue("clicks");
        const visits = getInputValue("visits");
        const leads = getInputValue("leads");
        const mqls = getInputValue("mqls");
        const opportunities = getInputValue("opportunities");
        const customers = getInputValue("customers");
        const revenue = getInputValue("revenue");

        const values = [
            spend,
            impressions,
            clicks,
            visits,
            leads,
            mqls,
            opportunities,
            customers,
            revenue
        ];

        const hasData = values.some(function (value)
        { return value !== null;
    });

    if (!hasData) {
        funnelFeedback.textContent = "Enter at least one funnel metric before continuing";
        funnelFeedback.className="data-check feedback-error";
        return;
    }


        funnelFeedback.textContent = "";
        funnelFeedback.className = "data-check";
        showReviewValue("review-spend", spend, true);
        showReviewValue("review-impressions", impressions);
        showReviewValue("review-clicks", clicks);
        showReviewValue("review-visits", visits);
        showReviewValue("review-leads", leads);
        showReviewValue("review-mqls", mqls);
        showReviewValue("review-opportunities", opportunities);
        showReviewValue("review-customers", customers);
        showReviewValue("review-revenue", revenue, true);

        const warnings = [];

        if (
            impressions !== null &&
            clicks !== null &&
            clicks > impressions
        ) {
            warnings.push("Clicks are higher than impressions.");
        }
        if (
            leads !== null &&
            mqls !== null &&
            mqls > leads
        ) {
            warnings.push("MQLs are higher than leads.");
        }

        if (
            mqls !== null &&
            opportunities !== null &&
            opportunities > mqls
        ) {
            warnings.push("Opportunities are higher than MQLs.");
        }

        if (
            opportunities !== null &&
            customers !== null &&
            customers > opportunities
        ) {
            warnings.push("Customers are higher than opportunities.");
        }

        if (warnings.length > 0) {
            dataCheck.textContent =
                `Check your data: ${warnings.join(" ")}`;

            dataCheck.className = "data-check feedback-warning";
        } else {
            dataCheck.textContent =
                "Your data is ready to analyse.";

            dataCheck.className = "data-check feedback-success";
        }
        

        funnelStep.hidden = true;
        reviewStep.hidden = false;

        reviewStep.scrollIntoView({
            behavior: "smooth",
            block: "start"
    });
});

backToFunnelButton.addEventListener("click", function () {
    reviewStep.hidden = true;
    funnelStep.hidden = false;

    funnelStep.scrollIntoView({
        behavior: "smooth",
        block: "start"
});
});

analyseFunnelButton.addEventListener("click", function () {
    const spend = getInputValue("spend");
    const impressions = getInputValue("impressions");
    const clicks = getInputValue("clicks");
    const leads = getInputValue("leads");
    const mqls = getInputValue("mqls");
    const customers = getInputValue("customers");
    const revenue = getInputValue("revenue");

    const ctr = calculatePercentage(clicks, impressions);
    const cpc = calculateCost(spend, clicks);
    const cpl = calculateCost(spend, leads);
    const leadToMql = calculatePercentage(mqls, leads);
    const cac = calculateCost(spend, customers);
    const roas = calculateCost(revenue, spend);

    showResult("result-ctr", ctr, "percentage");
    showResult("result-cpc", cpc, "currency"); 
    showResult("result-cpl", cpl, "currency");
    showResult("result-lead-mql", leadToMql, "percentage");
    showResult("result-cac", cac, "currency");
    showResult("result-roas", roas, "ratio");

    funnelInsight.className = "data-check feedback-info";

    if (ctr !== null && ctr < 1) {
        funnelInsight.textContent = 
        "Your click-through rate is low. Improving ad relevance or creative could help drive more traffic.";
    } else if (leadToMql !== null && leadToMql < 30) {
        funnelInsight.textContent =
        "Lead qualification looks like a possible bottleneck. Review lead quality and qualification criteria.";
    } else if (roas !== null && roas < 2) {
        funnelInsight.textContent = 
        "Your return on ad spend is relatively low. Review campaign costs and conversion performance.";
    } else {
        funnelInsight.textContent = 
        "No major issue stands out from the available data. Review each stage for smaller optimisation opportunities.";
    }
    reviewStep.hidden = true;
    resultsStep.hidden = false;

    resultsStep.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

backToReviewButton.addEventListener("click", function () {
    resultsStep.hidden = true;
    reviewStep.hidden = false;

    reviewStep.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});