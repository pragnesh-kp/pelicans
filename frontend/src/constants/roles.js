// User roles (same as the backend) with plain-language descriptions
export const ROLES = [
  { value: "admin", label: "Administrator", plural: "Administrators", description: "Full access, including users and settings." },
  { value: "editor", label: "Editor", plural: "Editors", description: "Manages all posts, categories and contact messages." },
  { value: "author", label: "Author", plural: "Authors", description: "Writes and publishes their own posts." },
  { value: "subscriber", label: "Subscriber", plural: "Subscribers", description: "Can log in, but has no access to the admin panel." },
];

export const roleLabel = (value) => ROLES.find((r) => r.value === value)?.label || value;
