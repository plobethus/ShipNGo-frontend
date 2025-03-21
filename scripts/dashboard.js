// /ShipNGo-frontend/scripts/dashboard.js
document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch("https://shipngo-g9cpbhdvfhgca3cb.northcentralus-01.azurewebsites.net/auth/me", {
        method: "GET",
        credentials: "include",  // Ensures cookie is sent
        headers: { "Content-Type": "application/json" }
      });
      
      if (!response.ok) {
        window.location.href = "../login.html";
        return;
      }
      
      const data = await response.json();
      // Update welcome message if the element exists
      const welcomeDiv = document.getElementById("welcome-message");
      if (welcomeDiv) {
        welcomeDiv.innerText = `Welcome, ${data.name} (${data.role === "customer" ? "Customer" : "Employee"})!`;
      }
      
      // Optionally, call additional functions (like loadPackages) here.
    } catch (error) {
      console.error("Error verifying authentication:", error);
      window.location.href = "../login.html";
    }
  });
  
  function logout() {
    // Optionally, call a logout endpoint to clear the cookie.
    // For now, just clear sessionStorage and redirect.
    sessionStorage.clear();
    window.location.href = "../login.html";
  }