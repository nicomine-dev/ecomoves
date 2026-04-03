const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Error del servidor");
  }

  return data;
}

export const api = {
  auth: {
    login: (email, password) =>
      request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
    signup: (email, password, name) =>
      request("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
      }),
    refresh: (refresh_token) =>
      request("/auth/refresh", {
        method: "POST",
        body: JSON.stringify({ refresh_token }),
      }),
  },
  users: {
    me: () => request("/users/me"),
    update: (name) =>
      request("/users/me", {
        method: "PUT",
        body: JSON.stringify({ name }),
      }),
  },
  movements: {
    list: () => request("/movements"),
    summary: () => request("/movements/summary"),
    create: (name, amount, action) =>
      request("/movements", {
        method: "POST",
        body: JSON.stringify({ name, amount, action }),
      }),
    remove: (id) =>
      request(`/movements/${id}`, { method: "DELETE" }),
  },
};
