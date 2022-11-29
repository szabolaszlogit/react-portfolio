import { Outlet, Link } from "react-router-dom";

function Layout() {
  const links = [
    { to: "/", txt: "Home" },
    { to: "/movies", txt: "Movie search" },
    { to: "/flappy", txt: "Flappy Bird" },
    { to: "/contact", txt: "Contact" },
  ];
  const listLinks = links.map((link, index) => (
    <Link key={index} className="link dim gray f6 f5-ns dib mr3" to={link.to}>
      {link.txt}
    </Link>
  ));

  return (
    <div>
      <nav className=" pa3 pa4-ns">{listLinks}</nav>
      <hr />
      <Outlet />
    </div>
  );
}

export default Layout;
