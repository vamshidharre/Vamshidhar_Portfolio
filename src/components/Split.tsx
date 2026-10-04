import React from "react";

type Mode = "words" | "chars";

interface Counter {
  w: number;
  c: number;
}

const textOf = (node: React.ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return node.type === "br" ? " " : textOf(node.props.children);
  }
  return "";
};

const splitNode = (node: React.ReactNode, mode: Mode, n: Counter): React.ReactNode => {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((part, k) => {
      if (part === "") return null;
      if (/^\s+$/.test(part)) return " ";
      const inner =
        mode === "chars"
          ? Array.from(part).map((ch, i) => (
              <span className="ch" key={i} style={{ ["--i" as string]: n.c++ }}>
                {ch}
              </span>
            ))
          : part;
      return (
        <span className="w" key={k}>
          <span className="wi" style={{ ["--i" as string]: n.w++ }}>
            {inner}
          </span>
        </span>
      );
    });
  }
  if (Array.isArray(node)) {
    const list = [...node];
    const out: React.ReactNode[] = [];
    for (let i = 0; i < list.length; i++) {
      const child = list[i];
      const next = list[i + 1];
      // Punctuation straight after an element ("<em>word</em>, more") must not wrap onto its own line,
      // which adjacent inline-blocks would otherwise allow.
      if (React.isValidElement(child) && typeof next === "string" && /^\S/.test(next)) {
        const [, glued, rest] = next.match(/^(\S+)([\s\S]*)$/)!;
        out.push(
          <span className="nowrap" key={i}>
            {splitNode(child, mode, n)}
            {splitNode(glued, mode, n)}
          </span>
        );
        list[i + 1] = rest;
        continue;
      }
      out.push(<React.Fragment key={i}>{splitNode(child, mode, n)}</React.Fragment>);
    }
    return out;
  }
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    if (node.type === "br") return node;
    return React.cloneElement(node, undefined, splitNode(node.props.children, mode, n));
  }
  return node;
};

// Wraps every word (and optionally every letter) in masked spans for entrance animations.
// Screen readers get the plain sentence; the split copy is hidden from them.
export const Split: React.FC<{ children: React.ReactNode; mode?: Mode }> = ({ children, mode = "words" }) => {
  const n: Counter = { w: 0, c: 0 };
  return (
    <>
      <span className="sr-only">{textOf(children)}</span>
      <span className={`split split-${mode}`} aria-hidden="true">
        {splitNode(children, mode, n)}
      </span>
    </>
  );
};

export const RollText: React.FC<{ children: string }> = ({ children }) => (
  <span className="roll">
    <span>{children}</span>
    <span aria-hidden="true">{children}</span>
  </span>
);

export default Split;
