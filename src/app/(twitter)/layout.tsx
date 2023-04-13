import Footer from "@/components/layout/Footer";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import useAuth from "@/hooks/useAuth";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
    const auth = await useAuth.fromServer();

    return (
        <div className="layout">
            <LeftSidebar />
            {children}
            <RightSidebar />
            {!auth && <Footer />}
        </div>
    );
}
