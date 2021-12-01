export const addItemToCart = async ({ userId, item }) => {
  const res = await fetch(`/api/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, item }),
  });
  return await res.json();
};
