// components/Breadcrumb.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();

  // Split path like "/user/1" into ['user', '1']
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav>
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <span key={name}> / {decodeURIComponent(name)}</span>
        ) : (
          <span key={name}>
            / <Link to={routeTo}>{decodeURIComponent(name)}</Link>
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
