// Turns a flat category list into tree order:
// parents first, each followed by its sub-categories, with a `depth` (0 = top level).
export function flattenTree(categories) {
  const ids = new Set(categories.map((c) => c.id));
  const byParent = new Map();
  for (const cat of categories) {
    // A missing parent is treated as top level
    const key = cat.parent_id && ids.has(cat.parent_id) ? cat.parent_id : null;
    if (!byParent.has(key)) byParent.set(key, []);
    byParent.get(key).push(cat);
  }
  for (const list of byParent.values()) list.sort((a, b) => a.name.localeCompare(b.name));

  const out = [];
  const seen = new Set();
  const walk = (parentId, depth) => {
    for (const cat of byParent.get(parentId) || []) {
      if (seen.has(cat.id)) continue; // guards against loops in bad data
      seen.add(cat.id);
      out.push({ ...cat, depth });
      walk(cat.id, depth + 1);
    }
  };
  walk(null, 0);
  return out;
}

// Ids of a category and everything nested inside it
export function withDescendants(categories, id) {
  const result = new Set([id]);
  let added = true;
  while (added) {
    added = false;
    for (const c of categories) {
      if (c.parent_id && result.has(c.parent_id) && !result.has(c.id)) {
        result.add(c.id);
        added = true;
      }
    }
  }
  return result;
}
