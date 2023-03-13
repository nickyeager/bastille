// @ts-ignore
/* eslint-disable */
import { supabase } from './client';
import {SignInWithPasswordCredentials} from "@supabase/gotrue-js";

// /** POST /supabase/api/login */
export async function login(
  params: {
    email?: string,
    password?: string,
  }
) {
  let promise = supabase.auth.signInWithPassword(<SignInWithPasswordCredentials>params)
    .then((response: { data: any; }) => {
      const {session, user} = response.data;
      return user;
    }).catch((error: any) => {
      return error;
    });
  return promise
}


