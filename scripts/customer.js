document.addEventListener("DOMContentLoaded", async function () {
    const token = sessionStorage.getItem("token");
    if (!token) {
      window.location.href = "../../login.html";
      return;
    }
  
    try {
      const response = await fetch("https://shipngo-g9cpbhdvfhgca3cb.northcentralus-01.azurewebsites.net/packages/customer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      const packageContainer = document.getElementById("customer-packages");
      packageContainer.innerHTML = "<h2>Your Packages</h2>";
      if (data.length === 0) {
        packageContainer.innerHTML += "<p>No packages found.</p>";
      } else {
        data.forEach(pkg => {
          const packageElement = document.createElement("div");
          packageElement.classList.add("package-item");
          packageElement.innerHTML = `
            <p><strong>Package ID:</strong> ${pkg.package_id}</p>
            <p><strong>From:</strong> ${pkg.address_from}</p>
            <p><strong>To:</strong> ${pkg.address_to}</p>
            <p><strong>Weight:</strong> ${pkg.weight} kg</p>
            <p><strong>Status:</strong> ${pkg.status}</p>
          `;
          packageContainer.appendChild(packageElement);
        });
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
      document.getElementById("customer-packages").innerHTML = `<p>Error fetching packages.</p>`;
    }
  });