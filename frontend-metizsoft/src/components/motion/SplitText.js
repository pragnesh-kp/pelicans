// Splits a heading into letters for the letter-by-letter reveal (see .split-* in globals.css).
// Screen readers get the plain text once; the letter spans are hidden from them.
// `highlight` = part of the text to colour (e.g. "AI-powered solutions").
export default function SplitText({ text = "", highlight = "", highlightClass = "" }) {
  const start = highlight ? text.indexOf(highlight) : -1;
  const end = start < 0 ? -1 : start + highlight.length;
  let index = 0;

  const words = text.split(/(\s+)/);
  let offset = 0;
  return (
    <>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => {
          const wordStart = offset;
          offset += word.length;
          if (/^\s+$/.test(word)) return " ";
          return (
            <span key={w} className="split-word">
              {[...word].map((char, c) => {
                const pos = wordStart + c;
                const lit = pos >= start && pos < end;
                return (
                  <span key={c} className={`split-char ${lit ? highlightClass : ""}`} style={{ "--ci": index++ }}>
                    {char}
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </>
  );
}
