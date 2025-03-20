document.addEventListener("DOMContentLoaded", async () => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (!token || role !== "employee") {
        window.location.href = "../login.html";
        return;
    }

    document.getElementById("status-filter").addEventListener("change", loadPackages);
    document.getElementById("search-customer").addEventListener("input", loadPackages);

    try {
        await loadPackages();
    } catch (error) {
        console.error("Error loading packages on page load:", error);
    }
});

async function loadPackages() {
    console.log("Fetching packages...");
    const status = document.getElementById("status-filter").value;
    const customerName = document.getElementById("search-customer").value;

    let url = `https://shipngo-g9cpbhdvfhgca3cb.northcentralus-01.azurewebsites.net/packages/dashboard/employee?`;
    if (status) url += `status=${encodeURIComponent(status)}&`;
    if (customerName) url += `customerName=${encodeURIComponent(customerName)}&`;

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
                    <td>${pkg.location || "Unknown"}</td>
                    <td>${pkg.sender_name} → ${pkg.receiver_name}</td>
                    <td>
                        <button onclick="editPackage(${pkg.package_id}, 'In Transit')">In Transit</button>
                        <button onclick="editPackage(${pkg.package_id}, 'Delivered')">Delivered</button>
                    </td>
                </tr>
            `;
            packageTable.innerHTML += row;
        });
    } catch (error) {
        console.error("Error loading packages:", error);
    }
}

async function editPackage(packageId, newStatus) {
    try {
        const response = await fetch(`https://shipngo-g9cpbhdvfhgca3cb.northcentralus-01.azurewebsites.net/packages/${packageId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
            alert("Package updated successfully!");
            await loadPackages();
        } else {
            alert("Failed to update package.");
        }
    } catch (error) {
        console.error("Error updating package:", error);
    }
}