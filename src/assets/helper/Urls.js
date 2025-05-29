const apiUrl = "https://blogs-db-backend.vercel.app";
export const BaseURL = (api) => {
  const url = `${apiUrl}/api/v1/${api}`;
  return url;
};
export const mediaUrl = (file) => {
  return `${apiUrl}/${file}`;
};
