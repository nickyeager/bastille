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
    document_type_id?: string,
    user_id?: string,
  }
) {
  let promise: any;
  promise = supabase.from('fields').insert([params])
    .then((response: { data: any; }) => {
      const {body} = response.data;
      return body;
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
    user_id?: string,
  }
) {
  let promise = supabase.from('document_types').insert([{ params}])
    .then((response: { data: any; }) => {
      const { body } = response.data;
      return body;
    }).catch((error: any) => {
      return error;
    });
  return promise
}
