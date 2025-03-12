import log from "./log";

const development = false;

const API_BASE_URL = () => {
  if (import.meta.env.PROD) {
    return "some-production-url";
  }

  if (development) {
    return "/sample/api/v1";
  }

  return "http://localhost:3000/api/v1";
};

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
  const res = await fetch(`${API_BASE_URL()}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
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
