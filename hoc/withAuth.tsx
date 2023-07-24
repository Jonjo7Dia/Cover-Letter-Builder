import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "contexts/authContext";

interface WithAuthProps {
  children: React.ReactNode;
}

const WithAuth: React.FC<WithAuthProps> = ({ children }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user.uid) {
      router.push("/signup");
    } else {
      router.push("/dashboard");
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

export default WithAuth;
