export const deleteItemFromCart = async ({ userId, itemId }) => {
  const res = await fetch(`/api/cart`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, itemId }),
  });
  return await res.json();
};
