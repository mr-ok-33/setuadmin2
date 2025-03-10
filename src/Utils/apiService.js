const apiRequest = async (
  endpoint,
  method = "GET",
  body = null,
  headers = {}
) => {
  const url = `https://setu.searchintech.in/${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  const options = {
    method,
    headers: defaultHeaders,
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error(`API Error [${method}] ${url}:`, error);
    throw error;
  }
};

export const api = {
  get: (endpoint, headers = {}) => apiRequest(endpoint, "GET", null, headers),
  post: (endpoint, body, headers = {}) =>
    apiRequest(endpoint, "POST", body, headers),
  patch: (endpoint, body, headers = {}) =>
    apiRequest(endpoint, "PATCH", body, headers),
  delete: (endpoint, headers = {}) =>
    apiRequest(endpoint, "DELETE", null, headers),
};
