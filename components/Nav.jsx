"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const Nav = () => {
  const { user } = useKindeBrowserClient();
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    if (user) {
      // Sync user with MongoDB
      fetch("/api/create-user");
    }
  }, [user]);

  const Menu = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Explore", path: "/explore" },
    { id: 3, name: "Contact Us", path: "/contact-us" },
  ];

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <LogoutLink>
              <button type="button" className="outline_btn">
                Sign Out
              </button>
            </LogoutLink>

            <Link href="/profile">
              <Image
                src={user?.picture || "/assets/images/default-avatar.png"}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <LoginLink>
            <button type="button" className="black_btn">
              Sign in
            </button>
          </LoginLink>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {user ? (
          <div className="flex">
            <Image
              src={user?.picture || "/assets/images/default-avatar.png"}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>

                <LogoutLink>
                  <button type="button" className="mt-5 w-full black_btn">
                    Sign Out
                  </button>
                </LogoutLink>
              </div>
            )}
          </div>
        ) : (
          <LoginLink>
            <button type="button" className="black_btn">
              Sign in
            </button>
          </LoginLink>
        )}
      </div>
    </nav>
  );
};

export default Nav;
