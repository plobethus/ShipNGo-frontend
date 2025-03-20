document.addEventListener("DOMContentLoaded", () => {
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

  // removed call to loadPackages() here
});

function logout() {
  sessionStorage.clear();
  window.location.href = "../login.html";
}