// /scripts/header.js

// This loads the header HTML and applies login display logic
document.addEventListener("DOMContentLoaded", () => {
    fetch("/includes/header.html")
      .then(res => res.text())
      .then(html => {
        document.getElementById("header-include").innerHTML = html;
  
        // After header loads, apply user logic
        const role = sessionStorage.getItem("role");
        const name = sessionStorage.getItem("name");
        const userStatus = document.getElementById("user-status");
        const logoutBtn = document.getElementById("logout-btn");
  
        if (role && name) {
          userStatus.textContent = `Logged in as ${name} (${role})`;
          logoutBtn.style.display = "inline-block";
        } else {
          userStatus.textContent = "Guest";
          logoutBtn.style.display = "none";
        }
  
        logoutBtn?.addEventListener("click", () => {
          sessionStorage.clear();
          window.location.href = "/pages/login.html";
        });
      })
      .catch(err => console.error("Failed to load header:", err));
  });