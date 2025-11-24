const BASE_URL = "https://localhost:7254/api/v1";      
const AUTH_BASE_URL = "https://localhost:7254/api"; 


function getToken() {
  return localStorage.getItem("token");
}


async function apiRequest(base, endpoint, method = "GET", body = null) {
  const token = getToken();

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${base}${endpoint}`, options);

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || "API Error");
  }

  return res.json();
}


export const EventAPI = {
  getEvents: ({
    pageNumber = 1,
    pageSize = 5,
    title = "",
    location = "",
    eventDate = "",
  }) => {
    const params = new URLSearchParams();

    params.append("PageNumber", pageNumber);
    params.append("PageSize", pageSize);

    if (title) params.append("Title", title);
    if (location) params.append("Location", location);
    if (eventDate) params.append("EventDate", eventDate);

    return apiRequest(BASE_URL, `/Event/paged?${params.toString()}`);
  },

  getEventById: (id) => apiRequest(BASE_URL, `/Event/${id}`),
};


export const BookingAPI = {
  createBooking: (data) => apiRequest(BASE_URL, `/Booking`, "POST", data),
};


export const AuthAPI = {
  login: (credentials) =>
    apiRequest(AUTH_BASE_URL, `/Auth/login`, "POST", credentials),

  register: (data) =>
    apiRequest(AUTH_BASE_URL, `/Auth/register`, "POST", data),
};
