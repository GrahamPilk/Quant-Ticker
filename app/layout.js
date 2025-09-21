import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "QuantTicker",
  description: "The best AI financial trading assistant",
};

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link href="/" className="navbar-logo">
            QuantTicker
          </Link>
        </div>
        <div className="navbar-menu">
          <Link href="/Services/ai" className="navbar-link">
            AI Services
          </Link>
          <Link href="/Services/payment" className="navbar-link">
            Payment
          </Link>
          <Link href="/Gen/user" className="navbar-link">
            User
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
