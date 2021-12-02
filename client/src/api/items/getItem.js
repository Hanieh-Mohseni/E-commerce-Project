export const getItem = async (itemId) => {
  const res = await fetch(`/api/item/${itemId}`);
  return await res.json();
};
