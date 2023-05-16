import localFont from "next/font/local";

import "../styles/reset.scss";
import "../styles/globals.scss";
import Providers from "./providers";

export const metadata = {
    title: "Fettan | Twitter",
};

const roboto = localFont({
    src: "../fonts/Roboto.ttf",
    display: "swap",
    variable: "--font-roboto",
});

const poppins = localFont({
    src: [
        {
            path: "../fonts/Poppins-ExtraLight.ttf",
            weight: "100",
            style: "normal",
        },
        {
            path: "../fonts/Poppins-Light.ttf",
            weight: "200",
            style: "normal",
        },
        {
            path: "../fonts/Poppins-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../fonts/Poppins-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../fonts/Poppins-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../fonts/Poppins-Bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../fonts/Poppins-ExtraBold.ttf",
            weight: "800",
            style: "normal",
        },
    ],
    display: "swap",
    variable: "--font-poppins",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${roboto.variable} ${poppins.variable}`} data-theme="light">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
