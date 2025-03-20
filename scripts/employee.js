document.addEventListener("DOMContentLoaded", async () => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  if (!token || role !== "employee") {
    window.location.href = "../login.html";
    return;
  }

  try {
    await loadPackages();
  } catch (error) {
    console.error("Error loading packages on page load:", error);
  }
});

async function loadPackages() {
  console.log("Fetching packages...");
  
  const status = document.getElementById("status-filter")?.value;
  const customerName = document.getElementById("search-customer")?.value;
  const startDate = document.getElementById("start-date")?.value;
  const endDate = document.getElementById("end-date")?.value;
  const minWeight = document.getElementById("min-weight")?.value;
  const maxWeight = document.getElementById("max-weight")?.value;
  const addressFilter = document.getElementById("address-filter")?.value;

  let url = `https://shipngo-g9cpbhdvfhgca3cb.northcentralus-01.azurewebsites.net/packages/dashboard/employee?`;
  if (status) url += `status=${encodeURIComponent(status)}&`;
  if (customerName) url += `customerName=${encodeURIComponent(customerName)}&`;
  if (startDate && endDate) url += `startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}&`;
  if (minWeight) url += `minWeight=${encodeURIComponent(minWeight)}&`;
  if (maxWeight) url += `maxWeight=${encodeURIComponent(maxWeight)}&`;
  if (addressFilter) url += `address=${encodeURIComponent(addressFilter)}&`;

  try {
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error fetching packages:", data.message);
      return;
    }

    const packageTable = document.getElementById("package-table");
    packageTable.innerHTML = "";

    data.packages.forEach(pkg => {
      const row = `
        <tr>
          <td>${pkg.package_id}</td>
          <td>${pkg.status}</td>
          <td>${pkg.weight || "N/A"}</td>
          <td>${pkg.dimensions || "N/A"}</td>
          <td>${pkg.address_from || "N/A"}</td>
          <td>${pkg.address_to || "N/A"}</td>
          <td>${pkg.sender_name} → ${pkg.receiver_name}</td>
          <td>
            <button onclick="quickUpdate(${pkg.package_id}, 'In Transit')">In Transit</button>
            <button onclick="quickUpdate(${pkg.package_id}, 'Delivered')">Delivered</button>
          </td>
        </tr>
      `;
      packageTable.innerHTML += row;
    });

  } catch (error) {
    console.error("Error loading packages:", error);
  }
}

async function quickUpdate(packageId, newStatus) {
  try {
    const response = await fetch(`https://shipngo-g9cpbhdvfhgca3cb.northcentralus-01.azurewebsites.net/packages/${packageId}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: newStatus })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error updating package:", data.message);
      alert("Error updating package: " + data.message);
      return;
    }

    alert("Package updated successfully!");
    loadPackages();

  } catch (error) {
    console.error("Error updating package:", error);
    alert("Error updating package. Please try again.");
  }
}