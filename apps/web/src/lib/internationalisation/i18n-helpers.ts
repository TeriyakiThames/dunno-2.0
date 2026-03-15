import { Messages } from "@calculories/shared-types";

export function t(key: string, messages: Messages) {
  return messages[key] ?? key;
}
export type { Messages };
