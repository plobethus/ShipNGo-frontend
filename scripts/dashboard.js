// /ShipNGo-frontend/scripts/dashboard.js

document.addEventListener("DOMContentLoaded", async () => {
 try {
    const response = await fetch("https://shipngo-g9cpbhdvfhgca3cb.northcentralus-01.azurewebsites.net/auth/me", {
      method: "GET",
      credentials: "include",  // ensure the cookie is sent
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
        // If not authenticated, redirect to login
        window.location.href = "../login.html";
        return;
    }
  
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (!token || !role) {
        window.location.href = "../login.html"; // Redirect to login if not authenticated
        return;
    }
    const data = await response.json();
    const welcomeDiv = document.getElementById("welcome-message");
    if (welcomeDiv) {
      const name = data.name || "User";
      welcomeDiv.innerText = `Welcome, ${name} (${data.role === "customer" ? "Customer" : "Employee"})!`;
    }
  } catch (error) {
    console.error("Error verifying authentication:", error);
    window.location.href = "../login.html";
  }
});

function logout() {
    window.location.href = "../login.html";
}