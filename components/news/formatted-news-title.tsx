import { parseNewsTitleParts } from "@/lib/news-title-formatting";

export function FormattedNewsTitle({ title }: { title: string }) {
  return (
    <>
      {parseNewsTitleParts(title).map((part, index) => (
        <span
          key={`${part.text}-${index}`}
          className={part.color === "red" ? "text-red-600" : undefined}
        >
          {part.text}
        </span>
      ))}
    </>
  );
}
