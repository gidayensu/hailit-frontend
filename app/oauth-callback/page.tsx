"use client";
import OAuthCallBack from "@/components/Profile/OAuthCallBack";
//This function serves as the callback for Google sign-in.
//Upon successful loading of this URL, it indicates that the user has already logged in via Supabase authentication.
//Subsequently, the user's data needs to be fetched from the backend.

export default function OAuthCB() {
  
  return (<OAuthCallBack />);
}
