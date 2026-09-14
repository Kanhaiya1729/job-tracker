function getToken() { return localStorage.getItem("token"); }
function isLoggedIn() { return Boolean(getToken()); }

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

function requireAuth() {
  if (!isLoggedIn()) window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.classList.contains("bg-light")) requireAuth();
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", logout);
});
