const setupForm = document.getElementById("setup-form");
const setupStep = document.getElementById("analysis");
const funnelStep = document.getElementById("funnel-step");
const backToSetupButton = document.getElementById("back-to-setup");

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