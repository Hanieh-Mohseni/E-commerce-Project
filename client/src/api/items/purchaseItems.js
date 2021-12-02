export const purchaseItems = async ({ userId, itemIds }) => {
  const res = await fetch(`/api/purchase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, itemIds }),
  });
  return await res.json();
};
