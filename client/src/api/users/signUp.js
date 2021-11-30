export const signUp = async (userInfo) => {
  const res = await fetch(`/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  return await res.json();
};
