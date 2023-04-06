import Footer from "@/components/home/layout/Footer";
import LeftSidebar from "@/components/home/layout/LeftSidebar";
import RightSidebar from "@/components/home/layout/RightSidebar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
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
