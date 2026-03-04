import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/index.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartSidebar } from "@/components/cart/CartSidebar";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { ThemeApplier } from "@/components/layout/ThemeApplier";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
});

export const metadata: Metadata = {
    title: "My Brand",
    description: "Luxury brand experience",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
            <body className="antialiased">
                <Providers>
                    <ThemeApplier />
                    <Navbar />
                    <CartSidebar />
                    <FloatingWhatsApp />
                    <main>{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
