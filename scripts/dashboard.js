

document.addEventListener("DOMContentLoaded", async () => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (!token || !role) {
        window.location.href = "../login.html"; // Redirect to login if not authenticated
        return;
    }

    // Set welcome message based on user role
    const welcomeDiv = document.getElementById("welcome-message");
    if (welcomeDiv) {
        const name = sessionStorage.getItem("name") || "User";
        welcomeDiv.innerText = `Welcome, ${name} (${role === "customer" ? "Customer" : "Employee"})!`;
    }

    if (role === "employee") {
        await loadPackages();
    }
});

function logout() {
    sessionStorage.clear();
    window.location.href = "../login.html";
}

async function loadPackages() {
    try {
        const response = await fetch("/packages/dashboard/employee");
        const packages = await response.json();
        const packageTable = document.getElementById("package-table");
        packageTable.innerHTML = "";
        packages.forEach(pkg => {
            const row = `
                <tr>
                    <td>${pkg.package_id}</td>
                    <td>${pkg.status}</td>
                    <td>${pkg.location}</td>
                    <td><button onclick="editPackage(${pkg.package_id})">Edit</button></td>
                </tr>
            `;
            packageTable.innerHTML += row;
        });
    } catch (error) {
        console.error("Error loading packages:", error);
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
        const response = await fetch(`https://shipngo-backend/api/packages/${packageId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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