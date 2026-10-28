// `roles` = only these roles see the item (no `roles` = everyone)
export const ADMIN_MENU = [
  { label: "Dashboard", href: "/admin" },
  { label: "Pages", href: "/admin/pages" },
  { label: "Posts", href: "/admin/posts" },
  { label: "Categories", href: "/admin/categories" },
  { label: "Messages", href: "/admin/messages", roles: ["admin", "editor"] },
  { label: "Media", href: "/admin/media" },
  { label: "Users", href: "/admin/users", roles: ["admin"] },
  { label: "Profile", href: "/admin/profile" },
  { label: "Settings", href: "/admin/settings", roles: ["admin"] },
];
