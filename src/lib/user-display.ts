/** Small helpers for showing the signed-in user consistently across the shell. */

export function initialsOf(
  name?: string | null,
  email?: string | null
): string {
  const src = (name?.trim() || email?.split("@")[0] || "").trim();
  const parts = src.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return (src.slice(0, 2) || "AC").toUpperCase();
}

export function roleLabel(role?: string | null): string {
  if (!role) return "Member";
  return role.charAt(0).toUpperCase() + role.slice(1);
}
