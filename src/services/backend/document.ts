// @ts-ignore
/* eslint-disable */
import { supabase } from './client';

/**
 * Insert a new document type into the DB
 * @param {string} name The document type name
 * @param {number} user_id The document type creator
 */
export async function addField(
  params: {
    name?: string,
    document_type?: string,
    user?: string,
  }
) {
  let promise: any;
  promise = supabase.from('fields').insert([{ ...params}]).select()
    .then((response: { data: any; }) => {
      const { data } = response;
      return data[0];
    }).catch((error: any) => {
      return error;
    });
  return promise
}
/**
 * Insert a new document type into the DB
 * @param {string} name The document type name
 * @param {number} user_id The document type creator
 */
export async function addDocumentTypes(
  params: {
    name?: string,
    user?: string,
  }
) {

  let promise = supabase.from('document_types').insert([{ ...params}]).select()
    .then((response: { data: any; }) => {
      const { data } = response;
      return data[0];
    }).catch((error: any) => {

      return error;
    });
  return promise
}
