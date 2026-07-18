import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is intentionally unused in the body — it re-triggers this effect on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
