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
                "4. Find Spent and copy the total."
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
                "Open Campaign Manager, choose Performance columns and copy Impressions."
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
                "Open Campaign Manager, choose Performance columns and copy Clicks."
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
                "4. Copy the Sessions total."
        },

        note:
            "Use GA4 for website sessions rather than adding clicks from your ad platforms."
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
            return `<p>${guidance.tools[tool]}</p>`;
        });

    if (instructions.length === 0) {
        return;
    }

    content.innerHTML =
        `<p><strong>What is this?</strong><br>${guidance.definition}</p>` +
        instructions.join("") +
        `<p><strong>Tip:</strong> ${guidance.note}</p>`;

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

updateSpendGuidance();

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