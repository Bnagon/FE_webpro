export async function handleLogin(formData) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
  };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
      method: "POST",
      options,
      body: formData,
    });
    console.log(await res.json());

    if (!res.ok) {
      const data = await res.json();

      throw new Error(data.error || "Login failed");
    }

    const data = await res.json();
    // สมมุติว่าได้ token กลับมา ให้เก็บ token ไว้ใน localStorage
    localStorage.setItem("token", data.token);
    console.log(localStorage.getItem("token"));

    // redirect ไปหน้า /tweet
  } catch (error) {
    alert(error.message);
  }
}
export { handleLogin };
