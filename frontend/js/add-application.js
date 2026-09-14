const applicationForm = document.getElementById("applicationForm");

document.getElementById("appliedDate").value =
  new Date().toISOString().split("T")[0];

applicationForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!applicationForm.checkValidity()) {
    applicationForm.classList.add("was-validated");
    return;
  }

  try {
    await axios.post(
      "https://job-tracker-07cl.onrender.com/api/applications",
      getFormData(),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    window.location.href = "dashboard.html";

  } catch (error) {
    showAlert(
      error.response?.data?.message ||
      "Failed to create application."
    );
  }
});

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