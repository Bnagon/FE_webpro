

export async function handleLogin(formData) {

  try {
    const res = await fetch("http://localhost:8081/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    })

    if (!res.ok) {
      const data = await res.json()
      
      throw new Error(data.error || "Login failed")
    }

    const data = await res.json()
    // สมมุติว่าได้ token กลับมา ให้เก็บ token ไว้ใน localStorage
    localStorage.setItem("token", data.token)
    console.log(localStorage.getItem("token"));
    
    // redirect ไปหน้า /tweet
  } catch (error) {
    alert(error.message)
  }
}
export { handleLogin }