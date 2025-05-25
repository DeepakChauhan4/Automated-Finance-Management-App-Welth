import { Inter } from "next/font/google";
import "./globals.css";
import Header from "components/header";
import ClerkProviderWrapper from "app/lib/ClerkProviderWrapper";
import { Toaster } from "sonner";
import { checkUser } from "lib/checkUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Welth",
  description: "One stop Finance Platform",
};

export default async function RootLayout({ children }) {
  const user = await checkUser();

  return (
    <ClerkProviderWrapper>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-sm.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <Header user={user} />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>Made with 💗 by DCE Coders !</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProviderWrapper>
  );
}
