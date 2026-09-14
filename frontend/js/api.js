// Change this URL when your Express backend is deployed.
const API_BASE_URL = "https://job-tracker-07cl.onrender.com/api";

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };

  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
  let data = {};
  try { data = await response.json(); } catch (_) {}

  if (!response.ok) {
    const error = new Error(data.message || "Something went wrong.");
    error.data = data;
    error.status = response.status;
    throw error;
  }
  return data;
}

function showAlert(message, type = "danger") {
  const box = document.getElementById("alertBox");
  if (box) box.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
}
