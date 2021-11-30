export const signIn = async (body) => {
  const res = await fetch(`/api/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};
