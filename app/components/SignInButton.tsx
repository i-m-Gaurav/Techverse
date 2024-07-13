'use client';
import { useSession, signIn, signOut } from "next-auth/react";

const SignInButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br/>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      Please sign in <br/>
      <button onClick={() => signIn('google')}> Sign In with Google</button>
    </>
  );
}

export default SignInButton;
