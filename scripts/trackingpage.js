

document.addEventListener("DOMContentLoaded", async function () {
    const resultElement = document.getElementById("tracking-result");
    const urlParams = new URLSearchParams(window.location.search);
    const trackingNumber = urlParams.get('trackingNumber');

    // Display tracking number
    document.getElementById("tracking-number").textContent = trackingNumber;

    try {
        const response = await fetch(`https://shipngo-g9cpbhdvfhgca3cb.northcentralus-01.azurewebsites.net/tracking/${trackingNumber}`);
        const data = await response.json();

        if (response.ok && data.history && data.history.length > 0) {
            resultElement.textContent = JSON.stringify(data, null, 2);  // Format for viewing
            resultElement.style.color = "green";
        } else {
            resultElement.textContent = data.message || "Tracking info not found.";
            resultElement.style.color = "red";
        }
    } catch (error) {
        console.error("Error fetching tracking info:", error);
        resultElement.textContent = "An error occurred while fetching tracking details.";
        resultElement.style.color = "red";
    }
});