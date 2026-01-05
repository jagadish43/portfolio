export const toPublicPath = (assetPath: string) => {
  const normalized = assetPath.startsWith("/") ? assetPath.slice(1) : assetPath;
  const base = import.meta.env.BASE_URL ?? "/";
  return `${base}${normalized}`;
};
