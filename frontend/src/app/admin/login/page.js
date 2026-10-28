import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, canAccessAdmin } from "@/lib/session";
import Logo from "@/components/layout/Logo";
import LoginForm from "./LoginForm";

export const metadata = { title: "Log In" };

// Only allow redirects back into the admin panel (never to another site)
function safeNext(next) {
  if (typeof next !== "string") return "/admin";
  if (!next.startsWith("/admin") || next.startsWith("/admin/login")) return "/admin";
  return next;
}

export default async function AdminLoginPage({ searchParams }) {
  const params = await searchParams;
  const next = safeNext(params.next);

  // Already logged in? Go straight to the dashboard
  const user = await getCurrentUser();
  if (canAccessAdmin(user)) redirect(next);

  const notice =
    params.error === "forbidden"
      ? "Your account does not have access to the admin panel."
      : params.loggedOut
        ? "You are now logged out."
        : null;

  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="login-logo">
          <Logo variant="dark" priority />
          <span className="visually-hidden"> — Admin login</span>
        </h1>
        {notice && <p className="login-notice">{notice}</p>}
        <LoginForm next={next} />
        <p className="login-back">
          <Link href="/">← Go to website</Link>
        </p>
      </div>
    </div>
  );
}
