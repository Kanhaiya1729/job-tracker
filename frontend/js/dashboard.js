let applications = [];

const API_URL = "https://job-tracker-07cl.onrender.com/api";

function getAuthConfig() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  };
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadUser();
  await loadApplications();
  await loadStats();

  document
    .getElementById("searchInput")
    .addEventListener("input", renderApplications);

  document
    .getElementById("statusFilter")
    .addEventListener("change", renderApplications);
});

async function loadUser() {
  try {
    const response = await axios.get(
      `${API_URL}/auth/me`,
      getAuthConfig()
    );

    const data = response.data;
    const user = data.user || data.data?.user;

    if (user) {
      document.getElementById("welcomeUser").textContent = `Hi, ${user.name}`;
    }

  } catch (error) {
    if (error.response?.status === 401) {
      logout();
    }
  }
}

async function loadApplications() {
  try {
    const response = await axios.get(
      `${API_URL}/applications`,
      getAuthConfig()
    );

    const data = response.data;

    applications =
      data.applications ||
      data.data?.applications ||
      data.data ||
      [];

    if (!Array.isArray(applications)) {
      applications = [];
    }

    renderApplications();

  } catch (error) {
    showAlert(
      error.response?.data?.message ||
      "Failed to load applications."
    );
  }
}

async function loadStats() {
  try {
    const response = await axios.get(
      `${API_URL}/applications/stats`,
      getAuthConfig()
    );

    const data = response.data;
    const stats = data.stats || data.data?.stats || data;

    document.getElementById("totalCount").textContent = stats.total || 0;
    document.getElementById("appliedCount").textContent = stats.applied || 0;
    document.getElementById("interviewCount").textContent = stats.interview || 0;
    document.getElementById("rejectedCount").textContent = stats.rejected || 0;
    document.getElementById("offerCount").textContent = stats.offer || 0;

  } catch (error) {
    console.error(error);
  }
}

function renderApplications() {
  const search = document
    .getElementById("searchInput")
    .value
    .toLowerCase();

  const status = document.getElementById("statusFilter").value;

  const filtered = applications.filter(app => {
    const matchesSearch =
      `${app.company || ""} ${app.position || ""}`
        .toLowerCase()
        .includes(search);

    return matchesSearch && (!status || app.status === status);
  });

  const tbody = document.getElementById("applicationTable");
  const empty = document.getElementById("emptyState");

  tbody.innerHTML = "";

  if (!filtered.length) {
    empty.classList.remove("d-none");
    return;
  }

  empty.classList.add("d-none");

  filtered.forEach(app => {
    const id = app._id || app.id;

    const date = app.appliedDate
      ? new Date(app.appliedDate).toLocaleDateString()
      : "-";

    tbody.innerHTML += `
      <tr>
        <td class="fw-semibold">
          ${escapeHtml(app.company || "-")}
        </td>

        <td>
          ${escapeHtml(app.position || "-")}
        </td>

        <td>
          ${escapeHtml(app.location || "-")}
        </td>

        <td>
          <span class="badge text-bg-${statusClass(app.status)}">
            ${escapeHtml(app.status || "-")}
          </span>
        </td>

        <td>${date}</td>

        <td class="text-nowrap">
          <a
            class="btn btn-sm btn-outline-primary"
            href="edit-application.html?id=${encodeURIComponent(id)}"
          >
            Edit
          </a>

          <button
            class="btn btn-sm btn-outline-danger"
            onclick="deleteApplication('${id}')"
          >
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}

async function deleteApplication(id) {
  if (!confirm("Are you sure you want to delete this application?")) {
    return;
  }

  try {
    await axios.delete(
      `${API_URL}/applications/${id}`,
      getAuthConfig()
    );

    await loadApplications();
    await loadStats();

  } catch (error) {
    showAlert(
      error.response?.data?.message ||
      "Failed to delete application."
    );
  }
}

function statusClass(status) {
  return {
    Applied: "primary",
    Interview: "warning",
    Rejected: "danger",
    Offer: "success",
    Withdrawn: "secondary"
  }[status] || "secondary";
}

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[char])
  );
}