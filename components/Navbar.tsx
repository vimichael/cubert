"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import ThemeToggleButton from "./ThemeToggleButton";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a href="/">Feed</a>
            </li>
            <li>
              <a href="/training">Training</a>
            </li>
          </ul>
        </div>
        <a href="/" className="btn btn-ghost text-xl">
          Cubert
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/">Feed</a>
          </li>
          <li>
            <a href="/training">Training</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end h-full">
        {session ? (
          <div className="flex flex-row items-center gap-3">
            {/* <a href="/create-post"> */}
            {/*   <button className="btn btn-sm btn-primary">Create Post +</button> */}
            {/* </a> */}
            <ThemeToggleButton />
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-circle">
                <div className="avatar">
                  <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={`https://api.dicebear.com/7.x/identicon/svg?seed=${session.user?.name}`}
                      alt={session.user?.name || ""}
                    />
                  </div>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 w-fit mt-3 p-2 shadow"
              >
                <li>
                  <a href={`/user/${session.user?.name}`}>Profile</a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-row gap-3 items-center">
            <ThemeToggleButton />
            <a href="/login">
              <button className="btn btn-sm btn-primary">Login</button>
            </a>
            <a href="/signup">
              <button className="btn btn-sm btn-secondary">Signup</button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
