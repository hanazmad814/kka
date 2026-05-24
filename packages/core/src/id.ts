const sanitize = (input: string) => input.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const createPrefixedId = (prefix: string, value: string) => `${sanitize(prefix)}_${sanitize(value)}`;

export const createDeterministicId = (namespace: string, value: string) => {
  const raw = `${namespace}:${value}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) hash = (hash * 31 + raw.charCodeAt(i)) >>> 0;
  return `${sanitize(namespace)}_${hash.toString(16).padStart(8, '0')}`;
};
