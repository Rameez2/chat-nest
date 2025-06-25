// components/withAuth.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";

export default function withAuth(WrappedComponent) {
  return function Protected(props) {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.replace("/login");
      }
    }, [loading, user, router]);

    if (loading || !user) {
      return <h1>Loading...</h1>; // don't render anything until auth status is determined
    }

    return <WrappedComponent {...props} />;
  };
}
