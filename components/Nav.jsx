"use client";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/setup";
import { useAuth } from "./AuthProvider";
import { useLanguage } from "./LanguageProvider";
import LanguageToggle from "./LanguageToggle";
import { ui } from "@/lib/ui-strings";

export default function Nav() {
  const { user, role } = useAuth();
  const { lang } = useLanguage();
  return (
    <header className="site">
      <div className="site-inner">
        <nav className="navlinks">
          <Link href="/" className="brand">UK&nbsp;Newcomer&nbsp;Guides</Link>
          {role === "admin" && <Link href="/admin">{ui.admin[lang]}</Link>}
        </nav>
        <div className="navright">
          {user ? (
            <>
              <Link href="/profile" className="nav-profile">{ui.profile[lang]}</Link>
              <button type="button" className="nav-logout" onClick={() => signOut(auth)}>{ui.logOut[lang]}</button>
            </>
          ) : (
            <Link href="/login" className="nav-profile">{ui.logIn[lang]}</Link>
          )}
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
