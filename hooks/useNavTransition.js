"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

const useNavTransition = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigate = useCallback((href) => {
    if (href === pathname) return;
    router.push(href);
  }, [router, pathname]);

  return navigate;
};

export default useNavTransition;
