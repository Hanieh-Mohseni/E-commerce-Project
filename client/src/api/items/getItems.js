export const getItems = async (page) => {
  const res = await fetch(`/api/items?page=${page}`);
  return await res.json();
};
