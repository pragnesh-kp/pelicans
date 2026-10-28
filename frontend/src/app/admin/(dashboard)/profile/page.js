import { requireAdminUser } from "@/lib/session";
import ProfileForm from "@/components/admin/users/ProfileForm";

export const metadata = { title: "Your Profile" };

export default async function ProfilePage() {
  const me = await requireAdminUser();
  return <ProfileForm key={me.id} user={me} />;
}
