const defaultBackendUrl =
  process.env.NODE_ENV === "production" ? "http://bidtech-admin-backend:8080" : "http://localhost:8080";

export const backendUrl = process.env.BACKEND_URL ?? defaultBackendUrl;
