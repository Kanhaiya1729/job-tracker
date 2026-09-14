const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!signupForm.checkValidity()) {
    signupForm.classList.add("was-validated");
    return;
  }

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    showAlert("Passwords do not match.");
    return;
  }

  try {
    await axios.post("https://job-tracker-07cl.onrender.com/api/auth/signup", {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      password: password
    });


  window.location.href = "login.html";


  } catch (error) {
    showAlert(
      error.response?.data?.message || "Signup failed. Please try again."
    );
  }
});