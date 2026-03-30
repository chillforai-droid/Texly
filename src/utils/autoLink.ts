export function autoLinkContent(content: string) {
  let updated = content;

  Object.entries(linkMap).forEach(([keyword, url]) => {
    const regex = new RegExp(`\\b(${keyword})\\b`, "gi");

    updated = updated.replace(
      regex,
      `<a href="${url}" class="text-blue-600 underline">$1</a>`
    );
  });

  return updated;
}
