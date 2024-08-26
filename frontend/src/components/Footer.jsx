import React from "react";

const Footer = () => {
  return (
    <footer className="py6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800">
      <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose md:text-left">
          Built by{" "}
          <a
            href="https://github.com/shiyuzhou1013"
            target="_blank"
            className="font-medium underline underline-offset-4"
          >
            Sherry Zhou
          </a>
          . The source is available on{" "}
          <a
            href="https://github.com/shiyuzhou1013"
            target="_blank"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
