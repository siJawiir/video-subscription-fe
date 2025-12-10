type TriggerFn = () => void;

const triggers: Record<string, TriggerFn> = {};

export function registerTrigger(id: string, fn: TriggerFn) {
  triggers[id] = fn;
}

export function triggerByID(id: string) {
  const fn = triggers[id];
  if (fn) fn();
  else console.warn(`No trigger found for ID "${id}"`);
}
