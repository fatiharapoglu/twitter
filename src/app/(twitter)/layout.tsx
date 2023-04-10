import Footer from "@/components/layout/Footer";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
    const tempIsLoggedIn = false;

    return (
        <div className="home">
            <LeftSidebar />
            {children}
            <RightSidebar />
            {tempIsLoggedIn && <Footer />}
        </div>
    );
}
