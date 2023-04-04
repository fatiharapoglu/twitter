import { Montserrat } from "next/font/google";

import "../styles/reset.scss";
import "../styles/globals.scss";

export const metadata = {
    title: "Fettan | Twitter",
    icons: {
        icon: "../assets/favicon.png",
    },
};

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={montserrat.className}>{children}</body>
        </html>
    );
}
