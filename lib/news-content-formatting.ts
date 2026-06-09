export type NewsContentBlock =
  | {
      type: "heading";
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "facts";
      title: string;
      rows: Array<{
        label: string;
        value: string;
      }>;
      note?: string;
    };

const HEADING_STARTS = [
  "darför",
  "därför",
  "viktiga",
  "slutsats",
  "sammanfattning",
  "guldpriset",
  "utdelningen",
  "vad betyder",
  "detta betyder",
  "bakgrund",
  "analys",
];

export function parseNewsContent(content: string): NewsContentBlock[] {
  const lines = content
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const blocks: NewsContentBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (isExplicitHeading(line)) {
      blocks.push({ type: "heading", text: stripHeadingMarker(line) });
      index += 1;
      continue;
    }

    if (isFactIntro(line)) {
      const factBlock = parseFactBlock(lines, index);

      if (factBlock) {
        blocks.push(factBlock.block);
        index = factBlock.nextIndex;
        continue;
      }
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];

      while (index < lines.length && lines[index].startsWith("- ")) {
        items.push(lines[index].replace(/^-+\s*/, ""));
        index += 1;
      }

      blocks.push({ type: "list", items });
      continue;
    }

    if (isLikelyHeading(line, lines[index + 1])) {
      blocks.push({ type: "heading", text: line });
      index += 1;
      continue;
    }

    blocks.push({ type: "paragraph", text: line });
    index += 1;
  }

  return blocks;
}

function parseFactBlock(lines: string[], startIndex: number) {
  const title = lines[startIndex].replace(/:$/, "");
  let index = startIndex + 1;

  if (
    lines[index]?.toLowerCase() === "händelse" &&
    lines[index + 1]?.toLowerCase() === "datum"
  ) {
    index += 2;
  }

  const rows: Array<{ label: string; value: string }> = [];
  let note = "";

  while (index < lines.length) {
    const label = lines[index];
    const value = lines[index + 1];

    if (label.startsWith("*")) {
      note = label;
      index += 1;
      break;
    }

    if (!value || isLikelyHeading(label, value) || isFactIntro(label)) {
      break;
    }

    rows.push({ label, value });
    index += 2;
  }

  if (rows.length < 2) {
    return null;
  }

  return {
    block: {
      type: "facts" as const,
      title,
      rows,
      note,
    },
    nextIndex: index,
  };
}

function isExplicitHeading(line: string) {
  return /^#{2,3}\s+/.test(line);
}

function stripHeadingMarker(line: string) {
  return line.replace(/^#{2,3}\s+/, "").trim();
}

function isFactIntro(line: string) {
  const normalized = line.toLowerCase();
  return (
    normalized === "sammanfattning:" ||
    normalized === "faktaruta:" ||
    normalized === "viktiga datum:" ||
    normalized === "snabbfakta:"
  );
}

function isLikelyHeading(line: string, nextLine?: string) {
  const normalized = line.toLowerCase();

  if (!nextLine) return false;
  if (line.length > 88) return false;
  if (/[.!?]$/.test(line)) return false;
  if (/^\d/.test(line)) return false;
  if (/^\*|^- /.test(line)) return false;
  if (line.includes(",")) return false;
  if (line.split(/\s+/).length > 9) return false;

  if (HEADING_STARTS.some((start) => normalized.startsWith(start))) {
    return true;
  }

  return nextLine.length > 80 || /[.!?]"?$/.test(nextLine);
}
