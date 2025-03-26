import log from "./log";

const headers = {
  "Content-Type": "application/json",
};

/**
 * Handles the response from the fetch request.
 *
 * @param {Response} res - The response object from the fetch request.
 * @returns {Promise} A promise that resolves to the JSON data from the response.
 * @throws {Error} An error if the response is not ok.
 */
const handleResponse = async (res) => {
  if (!res.ok) {
    const errorData = await res.json();

    throw new Error(errorData.message || "Something went wrong");
  }

  return res.json();
};

/**
 * Fetches data from the API.
 *
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {Object} options - Additional options to pass to the fetch request.
 * @returns {Promise} A promise that resolves to the JSON data from the response.
 */
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
    credentials: "include",
  });

  return handleResponse(res);
};

/**
 * Fetches all feature requests from the API.
 *
 * @returns {Promise} A promise that resolves to the JSON data from the response.
 */
export const getFeatureRequests = () => {
  return fetchData("/feature-requests?published=true");
};

/**
 * Fetches a single feature request from the API.
 *
 * @param {string} id - The ID of the feature request to fetch.
 * @returns {Promise} A promise that resolves to the JSON data from the response.
 */
export const getFeatureRequest = (id) => {
  return fetchData(`/feature-requests/${id}`);
};

/**
 * Creates a new feature request.
 *
 * @param {Object} data - The data for the new feature request.
 * @returns {Promise} A promise that resolves to the JSON data from the response.
 */
export const createFeatureRequest = (data) => {
  return fetchData("/feature-requests", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

/**
 * Updates the vote count for a feature request.
 *
 * @param {string} id - The ID of the feature request to update.
 * @param {number} voteValue - The value to update the vote count by.
 *
 * @returns {Promise} A promise that resolves to the JSON data from the response.
 */
export const updateVoteCount = (id, voteValue) => {
  return fetchData(`/feature-requests/${id}/votes`, {
    method: "PATCH",
    body: JSON.stringify({ value: voteValue }),
  });
};

/**
 * Creates a new contact form submission.
 *
 * @param {Object} data - The data for the new contact form submission.
 * @returns {Promise} A promise that resolves to the JSON data from the response.
 */
export const createContactForm = (data) => {
  return fetchData("/contact-form", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
