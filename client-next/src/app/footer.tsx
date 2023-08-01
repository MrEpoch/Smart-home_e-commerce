import React from "react";

export default function Footer(): React.ReactElement {
  return (
    <footer className="bg-body-tertiary text-center text-lg-start">
      <div className="text-center p-i3 footer_bgC">
        © 2023
        <a className="text-dark" href="https://parallax-stencuk.pages.dev/">
          Alexandr Stenčuk
        </a>
      </div>
    </footer>
  );
}
