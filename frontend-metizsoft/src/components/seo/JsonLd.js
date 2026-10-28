// Structured data for search engines. Pass one object or a list; empty items are skipped.
export default function JsonLd({ data }) {
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean);
  return items.map((item, i) => (
    <script
      key={i}
      type="application/ld+json"
      // "<" is escaped so the JSON can never close the script tag early
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
    />
  ));
}
