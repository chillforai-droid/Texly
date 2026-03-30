import { linkMap } from "./linkMap";

export function autoLinkContent(content: string) {
  if (!content) return content;

  let updated = content;

  Object.entries(linkMap).forEach(([keyword, url]) => {
    const regex = new RegExp(`\\b(${keyword})\\b`, "gi");

    updated = updated.replace(regex, (match) => {
      return `<a href="${url}" class="text-blue-600 underline">${match}</a>`;
    });
  });

  return updated;
}
