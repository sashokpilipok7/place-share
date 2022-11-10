export async function api(path, mth, body) {
  let method = mth ? mth : "GET";
  const response = await fetch(`http://localhost:5000/api/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message);
  }
  return responseData;
}
