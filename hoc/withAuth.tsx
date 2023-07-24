import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "contexts/authContext";

interface WithAuthProps {
  children: React.ReactNode;
}

const WithAuth: React.FC<WithAuthProps> = ({ children }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    if (!user.uid) {
      router.push("/signup");
    } else {
      setLoading(false); // Only set loading to false when we know user is authenticated
    }
  }, [router, user]);

  if (loading) {
    return <p>Loading...</p>; // Or some loading spinner
  }

  return <>{children}</>;
};

export default WithAuth;
