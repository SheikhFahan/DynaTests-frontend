import React from "react";
import ContactInfo from "./ContactInfo";

const Footer = () => {
  return (
    <footer className="mx-auto  w-full  px-20 pt-5  bg-gray-900  relative  bottom-0">
      <div className="flex justify-between  bottom-0">
        <div className="mb-6 ">
          <a href="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 me-3"
              alt="DynaTest Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              DynaTests
            </span>
          </a>
        </div>
        <div className="flex flex-row ">
          <div className="flex flex-col px-10">
            <h2 className="mb-6  text-sm font-semibold text-white uppercase">
              Resources
            </h2>
            <a
              href="https://www.django-rest-framework.org"
              className="text-white mb-4"
            >
              DjangoRestFramwork
            </a>
            <a href="https://legacy.reactjs.org/" className="text-white mb-4">
              React
            </a>
            <a href="https://tailwindcss.com/" className="text-white mb-4">
              Tailwind CSS
            </a>
          </div>

          <div className="flex flex-col px-10">
            <h2 className="mb-6 text-sm font-semibold text-white uppercase">
              Contact Info
            </h2>
            <a
              href="#"
              className="text-white mb-4 flex items-center"
            >
              <svg
                class="w-8 h-6  text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17 6h-2V5h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2h-.5a6 6 0 0 1 1.5 4v4a1 1 0 1 1-2 0v-4a4 4 0 0 0-4-4h-.5C5 6 3 8 3 10.5V16c0 .6.4 1 1 1h7v3c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-3h5c.6 0 1-.4 1-1v-6a4 4 0 0 0-4-4Zm-9 8.5H7a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2Z" />
              </svg>
              business.fahan@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/sheikh-fahan/"
              className="text-white mb-4 flex items-center"
            >
              <svg
                class="w-8 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.5 8.8v1.7a3.7 3.7 0 0 1 3.3-1.7c3.5 0 4.2 2.2 4.2 5v5.7h-3.2v-5c0-1.3-.2-2.8-2.1-2.8-1.9 0-2.2 1.3-2.2 2.6v5.2H9.3V8.8h3.2ZM7.2 6.1a1.6 1.6 0 0 1-2 1.6 1.6 1.6 0 0 1-1-2.2A1.6 1.6 0 0 1 6.6 5c.3.3.5.7.5 1.1Z"
                  clip-rule="evenodd"
                />
                <path d="M7.2 8.8H4v10.7h3.2V8.8Z" />
              </svg>
              LInked In
            </a>
            <a
              href="https://www.github.com/SheikhFahan"
              className="text-white mb-4 flex items-center"
            >
              <svg
                class="w-8 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2c-2.4 0-4.7.9-6.5 2.4a10.5 10.5 0 0 0-2 13.1A10 10 0 0 0 8.7 22c.5 0 .7-.2.7-.5v-2c-2.8.7-3.4-1.1-3.4-1.1-.1-.6-.5-1.2-1-1.5-1-.7 0-.7 0-.7a2 2 0 0 1 1.5 1.1 2.2 2.2 0 0 0 1.3 1 2 2 0 0 0 1.6-.1c0-.6.3-1 .7-1.4-2.2-.3-4.6-1.2-4.6-5 0-1.1.4-2 1-2.8a4 4 0 0 1 .2-2.7s.8-.3 2.7 1c1.6-.5 3.4-.5 5 0 2-1.3 2.8-1 2.8-1 .3.8.4 1.8 0 2.7a4 4 0 0 1 1 2.7c0 4-2.3 4.8-4.5 5a2.5 2.5 0 0 1 .7 2v2.8c0 .3.2.6.7.5a10 10 0 0 0 5.4-4.4 10.5 10.5 0 0 0-2.1-13.2A9.8 9.8 0 0 0 12 2Z"
                  clip-rule="evenodd"
                />
              </svg>
              GitHUb
            </a>
          </div>
        </div>
      </div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 Electron All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;



