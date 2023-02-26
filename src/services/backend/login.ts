// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import { supabase } from './client';
import {SignInWithPasswordCredentials} from "@supabase/gotrue-js";

// /** GET /api/login/captcha */
export async function login(
  params: {
    email?: string,
    password?: string,
  }
) {
  let promise = supabase.auth.signInWithPassword(<SignInWithPasswordCredentials>params)
    .then((response: { data: any; }) => {
      const {session, user} = response.data;
      // console.log(session)
      // console.log(user);
      return user;
    }).catch((error: any) => {
      return error;
    });
  return promise
}


// /** POST /api/login/captcha */
// export async function getFakeCaptcha(
//   params: {
//     phone?: string;
//   },
//   options?: { [key: string]: any },
// ) {
//   return request<API.FakeCaptcha>('/api/login/captcha', {
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }
