export type Messages = Record<string, string>;

export function t(key: string, messages: Messages) {
  return messages[key] ?? key;
}
