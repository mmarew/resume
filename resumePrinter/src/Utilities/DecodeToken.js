const decodeToken = (token) => {
  if (!token) return null;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const decodedData = JSON.parse(window.atob(base64));
  return decodedData;
};
export default decodeToken;
export const getUnqueId = () => {
  let token = localStorage.getItem("token");
  if (!token) {
    return null;
  } else {
    return decodeToken(token).uniqueId;
  }
};
export const getEmail = () => {
  let token = localStorage.getItem("token");
  if (!token) {
    return decodeToken(token).Email;
  } else {
    return null;
  }
};
export const getEmailAndUniqueId = () => {
  let token = localStorage.getItem("token");

  if (!token) {
    return null;
  }
  const decodedData = decodeToken(token);
  if (!decodedData) {
    return null;
  }
  const { Email, uniqueId } = decodedData;
  if (!Email || !uniqueId) {
    return null;
  }
  return { Email, uniqueId };
};
