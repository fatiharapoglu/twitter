import "../styles/reset.scss";
import "../styles/globals.scss";
import Providers from "./providers";

export const metadata = {
    title: "Fettan | Twitter",
    icons: {
        icon: "../assets/favicon.png",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
