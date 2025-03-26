import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

/**
 * The Layout component is a layout component that wraps the main content of the application.
 *
 * It includes the Header, Main, and Footer components.
 */
export default function Layout() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
