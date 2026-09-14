const params = new URLSearchParams(window.location.search);
const applicationId = params.get("id");
const editForm = document.getElementById("editApplicationForm");

const API_URL = "http://localhost:3000/api";

function getAuthConfig() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  };
}

document.addEventListener("DOMContentLoaded", async () => {
  if (!applicationId) {
    showAlert("Application ID is missing.");
    editForm.querySelector("button[type=submit]").disabled = true;
    return;
  }

  try {
    const response = await axios.get(
      `${API_URL}/applications/${applicationId}`,
      getAuthConfig()
    );

    const data = response.data;

    const app =
      data.application ||
      data.data?.application ||
      data.data;

    fillForm(app);

  } catch (error) {
    showAlert(
      error.response?.data?.message ||
      "Failed to load application."
    );
  }
});

editForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!editForm.checkValidity()) {
    editForm.classList.add("was-validated");
    return;
  }

  try {
    await axios.put(
      `${API_URL}/applications/${applicationId}`,
      getFormData(),
      getAuthConfig()
    );

    window.location.href = "dashboard.html";

  } catch (error) {
    showAlert(
      error.response?.data?.message ||
      "Failed to update application."
    );
  }
});

function fillForm(app) {
  [
    "company",
    "position",
    "location",
    "jobType",
    "status",
    "appliedDate",
    "jobUrl",
    "salary",
    "notes"
  ].forEach(key => {
    const el = document.getElementById(key);

    if (el) {
      el.value = app?.[key] || "";
    }
  });

  if (app?.appliedDate) {
    document.getElementById("appliedDate").value =
      new Date(app.appliedDate).toISOString().split("T")[0];
  }
}

function getFormData() {
  return {
    company: document.getElementById("company").value.trim(),
    position: document.getElementById("position").value.trim(),
    location: document.getElementById("location").value.trim(),
    jobType: document.getElementById("jobType").value,
    status: document.getElementById("status").value,
    appliedDate: document.getElementById("appliedDate").value,
    jobUrl: document.getElementById("jobUrl").value.trim(),
    salary: document.getElementById("salary").value.trim(),
    notes: document.getElementById("notes").value.trim()
  };
}