// /ShipNGo-frontend/scripts/customer.js

document.addEventListener("DOMContentLoaded", async function () {
  const token = sessionStorage.getItem("token");
  if (!token) {
    window.location.href = "../../login.html";
    return;
  }

  try {
    const response = await fetch("https://shipngo-g9cpbhdvfhgca3cb.northcentralus-01.azurewebsites.net/packages/customer", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    });
    
    const data = await response.json();
    const packageContainer = document.getElementById("customer-packages");
    packageContainer.innerHTML = "<h2>Your Packages</h2>";
    packageContainer.innerHTML += "<div class='packages' id='packages-grid'></div>";
    
    const packagesGrid = document.getElementById("packages-grid");
    
    if (data.length === 0) {
      packagesGrid.innerHTML = "<p>No packages found.</p>";
    } else {
      data.forEach(pkg => {
        const packageElement = document.createElement("div");
        packageElement.classList.add("package");
        packageElement.innerHTML = `
          <h3>Package ${pkg.package_id}</h3>
          <div class="package-info">
            <p><span>From:</span> ${pkg.address_from}</p>
            <p><span>To:</span> ${pkg.address_to}</p>
            <p><span>Weight:</span> ${pkg.weight} kg</p>
            <p><span>Status:</span> ${pkg.status}</p>
          </div>
        `;
        packagesGrid.appendChild(packageElement);
      });
    }
  } catch (error) {
    console.error("Error fetching packages:", error);
    document.getElementById("customer-packages").innerHTML = `<p>Error fetching packages.</p>`;
  }
});