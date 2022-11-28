import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Contact from "./Contact";
import Movies from "./Movies";
import NoMatch from "./NoMatch";

export default function App() {
  return (
    <div className="tc helvetica">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="movies" element={<Movies />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

<Layout />;
