export const validateForm = (formData) => {
  let valid = true;
  const newErrors = { email: "", password: "" };

  // Email format regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if email is empty or invalid format
  if (!formData.email || !emailRegex.test(formData.email.trim())) {
    newErrors.email = !formData.email
      ? "Email is required"
      : "Invalid email format";
    valid = false;
  }

  // Password strength check
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  if (!formData.password || !passwordRegex.test(formData.password)) {
    newErrors.password =
      "Password must be at least 6 characters with at least one uppercase and one lowercase letter";
    valid = false;
  }

  return { valid, newErrors };
};

