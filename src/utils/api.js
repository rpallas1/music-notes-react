import log from "./log";

const headers = {
  "Content-Type": "application/json",
};

const handleResponse = async (res) => {
  if (!res.ok) {
    const errorData = await res.json();

    throw new Error(errorData.message || "Something went wrong");
  }

  return res.json();
};

const fetchData = async (endpoint, options = {}) => {
  const baseUrl = import.meta.env.PROD
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL;

  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
    // credentials: "include",
  });

  return handleResponse(res);
};

export const getFeatureRequests = () => {
  return fetchData("/feature-requests?published=true");
};

export const getFeatureRequest = (id) => {
  return fetchData(`/feature-requests/${id}`);
};

export const createFeatureRequest = (data) => {
  return fetchData("/feature-requests", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateVoteCount = (id, voteValue) => {
  return fetchData(`/feature-requests/${id}/votes`, {
    method: "PATCH",
    body: JSON.stringify({ value: voteValue }),
  });
};

export const createContactForm = (data) => {
  return fetchData("/contact-form", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
