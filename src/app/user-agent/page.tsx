import { Providers } from "@/components/providers";
import { UserAgent } from "@/views/userAgent";
import { headers } from "next/headers"; 

const UserAgentRoot = () => {
  const userAgent = headers().get("x-user-agent") || "Unknown User Agent";
  return (
    <Providers userAgent={userAgent}>
      <UserAgent />
    </Providers>
  );
};

export default UserAgentRoot;
