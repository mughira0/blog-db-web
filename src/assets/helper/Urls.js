// const apiUrl = "https://blogs-db-backend.vercel.app";
const apiUrl = "http://localhost:5000";
export const BaseURL = (api) => {
  const url = `${apiUrl}/api/v1/${api}`;
  return url;
};
export const mediaUrl = (file) => {
  return `${apiUrl}/${file}`;
};
