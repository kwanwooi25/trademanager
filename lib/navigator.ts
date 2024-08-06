export const copyToClipboard = (text: string) => {
  if (!window?.navigator?.clipboard?.writeText) return;

  window.navigator.clipboard.writeText(text);
};
