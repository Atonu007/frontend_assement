import { UserAgentProvider } from "@/components/providers/userAgentProvider";

export const Providers: React.FC<{
  children: React.ReactNode;
  userAgent?: string;
}> = ({ children, userAgent }) => {
  return (
    <UserAgentProvider userAgent={userAgent}>
      {children}
    </UserAgentProvider>
  );
};
