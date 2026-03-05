export function normalizeId(id: string, errorMessage = "L'id n'est pas valide") {
  const numericId = Number(id);

  if (isNaN(numericId)) {
    throw new Error(errorMessage);
  }

  return numericId;
}
