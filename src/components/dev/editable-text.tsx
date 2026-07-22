"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Only ever interactive in `next dev` — production builds inline this to `false`
// and the minifier drops the contentEditable branch entirely.
const EDITABLE = process.env.NODE_ENV === "development";

type Tag = "span" | "p" | "h1" | "h2" | "h3" | "b" | "em" | "li";

type EditableTextProps = {
  /** Dot path into src/lib/content.data.json, e.g. "treatments.0.intro" or "clinic.name". */
  path: string;
  value: string;
  as?: Tag;
  className?: string;
};

export function EditableText({ path, value, as: Tag = "span", className }: EditableTextProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const savedValue = useRef(value);

  if (!EDITABLE) {
    return <Tag className={className}>{value}</Tag>;
  }

  async function handleBlur(e: React.FocusEvent<HTMLElement>) {
    const next = e.currentTarget.textContent ?? "";
    if (next === savedValue.current) return;
    setStatus("saving");
    try {
      const res = await fetch("/api/dev/edit-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, value: next }),
      });
      if (!res.ok) throw new Error(await res.text());
      savedValue.current = next;
      setStatus("saved");
      router.refresh();
    } catch (err) {
      console.error(`[EditableText] failed to save ${path}:`, err);
      setStatus("error");
    }
  }

  return (
    <Tag
      className={[className, "editable-text", `editable-text--${status}`].filter(Boolean).join(" ")}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      data-edit-path={path}
    >
      {value}
    </Tag>
  );
}
