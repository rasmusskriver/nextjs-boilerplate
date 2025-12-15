"use client";

import { useUser } from "@stackframe/stack";
import { UserButton } from "@stackframe/stack";

export default function Header() {
  const user = useUser();

  if (user) {
    return (
      <div>
        Hello, {user.displayName}!
        <UserButton />;
      </div>
    );
  } else {
    return (
      <div>
        Please sign in
        <UserButton />;
      </div>
    );
  }
}
