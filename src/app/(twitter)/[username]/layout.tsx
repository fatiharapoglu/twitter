import useAuth from "@/hooks/useAuth";
import Profile from "@/components/layout/Profile";

export default async function ProfileLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: any;
}) {
    const auth = await useAuth.fromServer();

    return (
        <div className="profile-layout">
            <Profile params={params} />
            {children}
        </div>
    );
}
