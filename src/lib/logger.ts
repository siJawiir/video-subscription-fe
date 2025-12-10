export const logInfo = (
  context: string,
  message: string,
  meta?: Record<string, unknown>
) => {
  console.log(
    `[${new Date().toISOString()}] INFO - ${context} - ${message}`,
    meta ?? {}
  );
};

export const logError = (
  context: string,
  error: unknown,
  meta?: Record<string, unknown>
) => {
  console.error(
    `[${new Date().toISOString()}] ERROR - ${context} -`,
    error,
    meta ?? {}
  );
};

export const toMeta = (data: unknown): Record<string, unknown> => {
  if (data && typeof data === "object") return data as Record<string, unknown>;
  return {};
};
