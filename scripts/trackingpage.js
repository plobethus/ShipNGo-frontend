

document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const trackingNumber = urlParams.get('trackingNumber');

    if (!trackingNumber) {
        document.getElementById("tracking-info").innerHTML = "<p style='color:red;'>No tracking number provided in URL.</p>";
        return;
    }

    try {
        console.log("Fetching tracking info for:", trackingNumber);
        const response = await fetch(`https://shipngo-g9cpbhdvfhgca3cb.northcentralus-01.azurewebsites.net/tracking/${trackingNumber}`);
        const data = await response.json();

        if (!response.ok || !data.history || data.history.length === 0) {
            document.getElementById("tracking-info").innerHTML = "<p style='color:red;'>Tracking info not found.</p>";
            return;
        }

        // Display tracking information
        document.getElementById("tracking-id").textContent = data.tracking_id;
        document.getElementById("tracking-status").textContent = data.history[0].status;
        document.getElementById("post-office").textContent = data.history[0].post_office_address || "N/A";
        document.getElementById("warehouse").textContent = data.history[0].warehouse_location || "N/A";
        document.getElementById("route").textContent = data.history[0].route_name || "N/A";

    } catch (error) {
        console.error("Error fetching tracking info:", error);
        document.getElementById("tracking-info").innerHTML = "<p style='color:red;'>An error occurred while fetching tracking details.</p>";
    }
});