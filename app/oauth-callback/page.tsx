'use client'
import { useLogin } from "@/components/Profile/Authentication/hooks/useLogin";
import { useSignUp } from "@/components/Profile/Authentication/hooks/useSignUp";
import BigLoader from "@/components/Shared/BigLoader";
import ErrorComponent from "@/components/Shared/ErrorComponent";
import { userIdAndEmailFromSession } from "@/lib/supabaseAuth";
import { useEffect, useState } from "react";
import { supabaseSignOut } from "@/lib/supabaseAuth";

//this is the callback for google sign in. If this url loads, then the user has already logged in (from supabase auth's end) and his data
//data has to be fetched (from the backend end); 
export default function OAuthCallBack (){ 
    const [attemptedSignUp, setAttemptedSignUp] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

  const { googleSignIn } = useLogin();
  const { googleSignUp } = useSignUp();

  useEffect(() => {

    const signInWithGoogle = async () => {
      const { user_id, email } = await userIdAndEmailFromSession();

      if (typeof user_id === 'string' &&!attemptedSignUp) {
        const signInResult = await googleSignIn(user_id);
        
        if (signInResult?.error && !attemptedSignUp) {
            setAttemptedSignUp(true)
          const signUpResult = await googleSignUp({ user_id, email });
          
          if(signUpResult?.error) {
            setError(true)
          }
        }
      }
    };

    signInWithGoogle();
  }, [googleSignIn, attemptedSignUp, googleSignUp]);

  if(error) {
    return (
        
        <ErrorComponent errorCode={500} errorMessage="Server Error Occurred" onClickFunc={supabaseSignOut}/>
    )
  }

  return <BigLoader />;
}
