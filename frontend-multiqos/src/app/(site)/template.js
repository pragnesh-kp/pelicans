"use client";

import { useEffect, useState } from "react";

// A template re-mounts on every navigation: fade the new page in.
// Skipped on the very first load so the first paint is never delayed.
let firstLoad = true;

export default function SiteTemplate({ children }) {
  const [animate] = useState(() => !firstLoad);
  useEffect(() => {
    firstLoad = false;
  }, []);
  return <div className={animate ? "page-enter" : undefined}>{children}</div>;
}
