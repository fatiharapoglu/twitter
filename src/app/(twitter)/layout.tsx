import Footer from "@/components/layout/Footer";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="layout">
            <LeftSidebar />
            {children}
            <RightSidebar />
            <Footer />
        </div>
    );
}
