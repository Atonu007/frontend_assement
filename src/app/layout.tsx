import { UserAgentProvider } from "../components/providers/userAgentProvider";
import "./globals.css";
import { Layout } from "@/components/layout";



const RootLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  // Fetch the user agent on the server-side
  const userAgent =
    typeof window === "undefined" ? require("os").platform() : "";

  return (
    <html lang="en">
      <body>
        <UserAgentProvider userAgent={userAgent}>
          <Layout>{children}</Layout>
        </UserAgentProvider>
      </body>
    </html>
  );
};

export default RootLayout;
