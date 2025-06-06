const handleregister = async (formData) => {
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords don't match!")
    return
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
      method: "POST",
      options,
      body: formData
      })

    console.log(await res.json());
    if (res.ok) {
      alert("Registered successfully! Please login.")
    } else {
      const data = await res.json()
      alert(data.error || "Registration failed")
    }
    console.log(formData);
  } catch (error) {
    alert("Error connecting to server")
    console.error("Registration error:", error)
  }

}
export { handleregister };

