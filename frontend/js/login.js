const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!loginForm.checkValidity()) {
    loginForm.classList.add("was-validated");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      {
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value
      }
    );

    const data = response.data;

    const token = data.token || data.data?.token;
    const user = data.user || data.data?.user;

    if (!token) {
      throw new Error("Login succeeded but no token was returned by the server.");
    }

    localStorage.setItem("token", token);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    window.location.href = "dashboard.html";

  } catch (error) {
    showAlert(
      error.response?.data?.message || error.message || "Login failed."
    );
  }
});