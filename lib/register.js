

const handleregister = async (formData) => {
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords don't match!")
    return
  }

  try {
    const res = await fetch("http://localhost:8081/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.username,
        email: formData.email,
        password: formData.password,
      }),
    })

    if (res.ok) {
      alert("Registered successfully! Please login.")
    } else {
      const data = await res.json()
      alert(data.error || "Registration failed")
    }
  } catch (error) {
    alert("Error connecting to server")
  }
}
export {handleregister}
