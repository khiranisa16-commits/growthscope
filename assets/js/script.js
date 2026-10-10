const setupForm = document.getElementById("setup-form");
const setupStep = document.getElementById("analysis");

const funnelForm = document.getElementById("funnel-form");
const funnelStep = document.getElementById("funnel-step");

const reviewStep = document.getElementById("review-step");

const backToSetupButton = document.getElementById("back-to-setup");
const backToFunnelButton = document.getElementById("back-to-funnel");

const funnelFeedback = document.getElementById("funnel-feedback");
const dataCheck = document.getElementById("data-check");

setupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    setupStep.hidden = true;
    funnelStep.hidden = false;

    funnelStep.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });  
});

backToSetupButton.addEventListener("click", function(){
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
        reviewElement.textContent = `£${value.toLocalleString()}`;
    } else {
        reviewElement.textContent = value.toLocalleString();
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

        const hasData = value.some(function (value)
        { return value !== null;
    });

    if (!hasData) {
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
            warnings.push("MQLs are higher thann leads.");
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
            "Your data is ready to analyse.";
        }

        funnelStep.hidden = true;
        reviewStep.hidden = false;

        reviewStep.scrollIntoView({
            behavior: "smooth",
            block: "start"
    });
});

backToFunnelButton.addEventListener("click", fucntion () {
    reviewStep.hidden = true;
    funnelStep.hidden = false;

    funnelStep.scrollIntoView({
        behavior: "smooth",
        block: "start"
});
});
