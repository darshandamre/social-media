export const getInitials = (name?: string | null) => {
  if (!name) return null;

  return name
    .split(/\s/)
    .map(str => str[0]?.toUpperCase())
    .join("");
};
