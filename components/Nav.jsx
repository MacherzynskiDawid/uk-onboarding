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
        <Link href="/" className="brand">UK&nbsp;Newcomer&nbsp;Guides</Link>
        <nav className="navright">
          <Link href="/map" className="nav-link">{ui.navMap[lang]}</Link>
          <Link href="/faq" className="nav-link">{ui.navFaq[lang]}</Link>
          {role === "admin" && <Link href="/admin" className="nav-link">{ui.admin[lang]}</Link>}
          {user ? (
            <>
              <Link href="/profile" className="nav-profile">{ui.profile[lang]}</Link>
              <button type="button" className="nav-logout" onClick={() => signOut(auth)}>{ui.logOut[lang]}</button>
            </>
          ) : (
            <Link href="/login" className="nav-profile">{ui.logIn[lang]}</Link>
          )}
          <LanguageToggle />
        </nav>
      </div>
    </header>
  );
}
