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

const funnelInsight = document.getElementById("funnel-insight");

setupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedExperience = document.querySelector(
    'input[name="experience"]:checked'
    );

    beginnerGuidance.hidden = selectedExperience.value !== "beginner";

    const selectedTools = document.querySelectorAll(
    'input[name="tools"]:checked'
);

const toolNames = Array.from(selectedTools).map(function(tool) {
    return tool.parentElement.textContent.trim();
});

const toolGuidance = document.getElementById("tool-guidance");

if (toolNames.length > 0) {
    toolGuidance.textContent = 
    `You selected: ${toolNames.join(", ")}.`;
    toolGuidance.hidden = false;
} else {
    toolGuidance.hidden = true;
}


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
        funnelFeedback.textContent = 
        "Enter at least one funnel metric before continuing.";
        return;
    }


        funnelFeedback.textContent = "";
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
        } else {
            dataCheck.textContent = 
            "Your data is ready to analyse.";
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