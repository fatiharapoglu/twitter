import "../styles/reset.scss";
import "../styles/globals.scss";

export const metadata = {
    title: "Fettan | Twitter",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
