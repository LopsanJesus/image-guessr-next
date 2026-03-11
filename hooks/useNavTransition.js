"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

const useNavTransition = () => {
  const router = useRouter();

  const navigate = useCallback((href) => {
    const content = document.querySelector(".animate-page-enter");
    if (content) {
      content.classList.remove("animate-page-enter");
      content.classList.add("animate-page-exit");
      setTimeout(() => router.push(href), 200);
    } else {
      router.push(href);
    }
  }, [router]);

  return navigate;
};

export default useNavTransition;
