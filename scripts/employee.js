document.addEventListener("DOMContentLoaded", async () => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (!token || role !== "employee") {
        window.location.href = "../login.html"; // Redirect to login if not authenticated or incorrect role
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
    try {
    const response = await fetch("https://shipngo-g9cpbhdvfhgca3cb.northcentralus-01.azurewebsites.net/dashboard/employee", {
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

        const packages = data.packages || [];
        console.log("Received packages:", packages);

        const packageTable = document.getElementById("package-table");
        packageTable.innerHTML = ""; // Clear previous data

        packages.forEach(pkg => {
            const row = `
                <tr>
                    <td>${pkg.package_id}</td>
                    <td>${pkg.status}</td>
                    <td>${pkg.location || "Unknown"}</td>
                    <td><button onclick="editPackage(${pkg.package_id})">Edit</button></td>
                </tr>
            `;
            packageTable.innerHTML += row;
        });
    } catch (error) {
        console.error("Error loading packages:", error);
    }
}

async function editPackage(packageId) {
    const newStatus = prompt("Enter new status (Pending, In Transit, Delivered):");
    const newLocation = prompt("Enter new location:");

    if (!newStatus && !newLocation) {
        alert("No changes made.");
        return;
    }

    try {
        const response = await fetch(`https://shipngo-g9cpbhdvfhgca3cb.northcentralus-01.azurewebsites.net/packages/${packageId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify({ status: newStatus, location: newLocation }),
        });

        if (response.ok) {
            alert("Package updated successfully!");
            await loadPackages(); // Reload packages after update
        } else {
            alert("Failed to update package.");
        }
    } catch (error) {
        console.error("Error updating package:", error);
    }
}

document.getElementById("update-package-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const packageId = document.getElementById("package-id").value;
    const newStatus = document.getElementById("new-status").value;
    const newLocation = document.getElementById("new-location").value;

    if (!packageId || (!newStatus && !newLocation)) {
        alert("Please enter Package ID and at least one field to update.");
        return;
    }

    try {
        const response = await fetch(`https://shipngo-g9cpbhdvfhgca3cb.northcentralus-01.azurewebsites.net/packages/${packageId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify({ status: newStatus, location: newLocation }),
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
});