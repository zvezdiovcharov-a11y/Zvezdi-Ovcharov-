import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const RouterContext = createContext(null);

function currentFullPath() {
  return window.location.pathname + window.location.hash;
}

export function RouterProvider({ children }) {
  const [fullPath, setFullPath] = useState(currentFullPath);

  useEffect(() => {
    function onPopState() {
      setFullPath(currentFullPath());
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = useCallback((to) => {
    if (to !== currentFullPath()) {
      window.history.pushState({}, "", to);
    }
    setFullPath(to);
  }, []);

  const hashIndex = fullPath.indexOf("#");
  const pathname = hashIndex === -1 ? fullPath : fullPath.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : fullPath.slice(hashIndex + 1);

  return (
    <RouterContext.Provider value={{ fullPath, pathname: pathname || "/", hash, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) throw new Error("useRouter must be used within RouterProvider");
  return context;
}

export function Link({ to, className, children, onClick, ...rest }) {
  const { navigate } = useRouter();

  function handleClick(event) {
    if (onClick) onClick(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    event.preventDefault();
    navigate(to);
  }

  return (
    <a href={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

export function matchRoute(pathname) {
  if (pathname === "/") return { name: "home" };

  let match = pathname.match(/^\/product\/([^/]+)\/?$/);
  if (match) return { name: "product", id: decodeURIComponent(match[1]) };

  match = pathname.match(/^\/guide\/([^/]+)\/?$/);
  if (match) return { name: "guide", slug: decodeURIComponent(match[1]) };

  if (pathname === "/gallery" || pathname === "/gallery/") return { name: "gallery" };
  if (pathname === "/cart" || pathname === "/cart/") return { name: "cart" };
  if (pathname === "/checkout" || pathname === "/checkout/") return { name: "checkout" };
  if (pathname === "/politika-za-poveritelnost" || pathname === "/politika-za-poveritelnost/") {
    return { name: "privacy" };
  }
  if (pathname === "/obshti-uslovia" || pathname === "/obshti-uslovia/") return { name: "terms" };

  return { name: "not-found" };
}
