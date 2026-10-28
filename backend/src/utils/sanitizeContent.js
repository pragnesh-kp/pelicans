import sanitizeHtml from "sanitize-html";

// Post content comes from the rich-text editor as HTML.
// Only allow the formatting the editor can produce, so nobody can save
// scripts, iframes or event handlers that would run on the public website.
const OPTIONS = {
  allowedTags: [
    "p", "br", "h2", "h3", "h4", "strong", "b", "em", "i", "u", "s",
    "a", "ul", "ol", "li", "blockquote", "code", "pre", "hr", "img",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    img: ["src", "alt", "width", "height"],
    ol: ["start"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: { img: ["http", "https"] },
  allowProtocolRelative: false,
  transformTags: {
    // Links that open a new tab get rel="noopener noreferrer"
    a: (tagName, attribs) => ({
      tagName,
      attribs: attribs.target === "_blank" ? { ...attribs, rel: "noopener noreferrer" } : attribs,
    }),
  },
};

export const sanitizeContent = (html) => sanitizeHtml(html ?? "", OPTIONS);
