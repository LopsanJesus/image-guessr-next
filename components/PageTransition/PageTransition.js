"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const PageTransition = ({ children }) => {
  const pathname = usePathname();
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(false);
    const id = requestAnimationFrame(() => setAnimating(true));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div className={animating ? "animate-page-enter" : ""}>
      {children}
    </div>
  );
};

export default PageTransition;
