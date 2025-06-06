const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:80";

async function request(path, method = "GET", data = null) {
  const token = localStorage.getItem("token");

  const options = {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
  };

  if (data instanceof FormData) {
    // ถ้า data เป็น FormData จะส่ง body แบบ FormData และไม่ตั้ง Content-Type
    options.body = data;
  } else if (data && method !== "GET" && method !== "DELETE") {
    // ถ้า data เป็น JSON ปกติ จะตั้ง Content-Type และแปลงเป็น JSON string
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, options);

    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ message: "Unknown error" }));
      throw errorData;
    }

    if (res.status === 204) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Network or unexpected error:", error);
    throw error;
  }
}

export const loginUser = async (data) => {
  const res = await request("/users/login", "POST", data);
  console.log(res.data);
  if (res.data) {
    localStorage.setItem("token", res.token);
  }
  return res;
};

export const registerUser = (data) => request("/users", "POST", data);
export const getProfile = () => request("/users/me");
export const updateProfile = (data) => request("/users/me", "PUT", data);
export const logoutUser = () => {
  localStorage.removeItem("token");
  return request("/users/logout");
};

export const createTweet = (data) => request("/tweets", "POST", data);
export const getAllTweets = () => request("/tweets");
export const getTweetById = (id) => request(`/tweets/${id}`);
export const updateTweet = (id, data) => request(`/tweets/${id}`, "PUT", data);
export const deleteTweet = (id) => request(`/tweets/${id}`, "DELETE");

export const createEvent = (data) => request("/events", "POST", data);
export const getAllEvents = () => request("/events");
export const getEventById = (id) => request(`/events/${id}`);
export const updateEvent = (id, data) => request(`/events/${id}`, "PUT", data);
export const deleteEvent = (id) => request(`/events/${id}`, "DELETE");

export const createReview = (data) => request("/reviews", "POST", data);
export const getAllReviews = () => request("/reviews");
export const getReviewById = (id) => request(`/reviews/${id}`);
export const updateReview = (id, data) =>
  request(`/reviews/${id}`, "PUT", data);
export const deleteReview = (id) => request(`/reviews/${id}`, "DELETE");

export const getAnimeById = (id) => request(`/animes/${id}`);
export const createReveiw = (data) => request("/reviews", "POST", data);
export const getAllAnimes = () => request("/animes");
export const getReviewByAnimeId = (animeId) =>
  request(`/reviews/anime/${animeId}`);

export const createComment = (data) => request(`/comments/`, "POST", data);
export const joinEvent = (eventId) =>
  request(`/events/${eventId}/join`, "POST");

export const getMyEvents = () => request("/users/events/");
export const getMyTweets = () => request("/users/tweets/");
