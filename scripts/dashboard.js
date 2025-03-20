document.addEventListener("DOMContentLoaded", async () => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");
  
    if (!token || !role) {
      window.location.href = "../login.html";
      return;
    }
  
    const welcomeDiv = document.getElementById("welcome-message");
    if (welcomeDiv) {
      const name = sessionStorage.getItem("name") || "User";
      welcomeDiv.innerText = `Welcome, ${name} (${role === "customer" ? "Customer" : "Employee"})!`;
    }
  
    if (role === "employee") {
      try {
        await loadPackages();
      } catch (error) {
        console.error("Error loading packages on page load:", error);
      }
    }
  });
  
  function logout() {
    sessionStorage.clear();
    window.location.href = "../login.html";
  }