import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Invoicer - Free Invoice Generator",
    description: "Create professional invoices instantly. No sign-up required. 100% free and privacy-focused invoice generator.",
    keywords: ["invoice", "invoice generator", "free invoice", "billing", "pdf invoice", "invoice maker"],
    authors: [{ name: "Invoicer" }],
    openGraph: {
        title: "Invoicer - Free Invoice Generator",
        description: "Create professional invoices instantly. No sign-up required.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
