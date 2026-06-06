export type NewsTitlePart = {
  text: string;
  color: "default" | "red";
};

const redTitlePattern = /\[red\]([\s\S]*?)\[\/red\]/gi;

export function getPlainNewsTitle(title: string) {
  return title
    .replace(/\[red\]/gi, "")
    .replace(/\[\/red\]/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function parseNewsTitleParts(title: string): NewsTitlePart[] {
  redTitlePattern.lastIndex = 0;

  if (!redTitlePattern.test(title) && title.toUpperCase().startsWith("JUST NU:")) {
    return [
      { text: title.slice(0, "JUST NU:".length), color: "red" },
      { text: title.slice("JUST NU:".length), color: "default" },
    ];
  }

  redTitlePattern.lastIndex = 0;

  const parts: NewsTitlePart[] = [];
  let lastIndex = 0;

  for (const match of title.matchAll(redTitlePattern)) {
    const matchIndex = match.index ?? 0;
    const redText = match[1];

    if (matchIndex > lastIndex) {
      parts.push({
        text: title.slice(lastIndex, matchIndex),
        color: "default",
      });
    }

    if (redText) {
      parts.push({
        text: redText,
        color: "red",
      });
    }

    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < title.length) {
    parts.push({
      text: title.slice(lastIndex),
      color: "default",
    });
  }

  return parts.length > 0 ? parts : [{ text: title, color: "default" }];
}
