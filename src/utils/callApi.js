import { camelizeKeys } from 'humps';
import { normalize } from 'normalizr';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import { getAuthToken } from '@/services/auth';
import request from '@/utils/request';

/**
 * Processa a resposta da requisição e tenta normalizá-la
 *
 * @param reponseJson
 * @param schema esquema para normalização
 * @returns {*}
 */
function normalizeJson(reponseJson, schema) {
  let result;

  /*
   * converte os campos de, por exemplo,
   * 'last_name' para 'lastName'
   */
  const json = camelizeKeys(reponseJson);

  if (schema && (isObject(json.data) || isArray(json.data))) {
    result = normalize(json.data, schema);
  } else {
    result = json.data;
  }

  if (json.meta && json.meta.pagination) {
    result = { ...result, pagination: json.meta.pagination };
  }

  return result;
}

/**
 * Cliente para consulta a API Rest.
 */
export default function callApi(endpoint, schema) {
  // API_URL defined in .env
  const url = API_URL + endpoint;

  const normalizeFn = response => normalizeJson(response, schema);

  // const token = await localForage.getItem('jwt')
  const token = getAuthToken();
  const options = {
    mode: 'cors',
    headers: { Authorization: `Bearer ${token}` },
  };

  return {
    post: data => request(url, { method: 'POST', body: data, ...options }).then(normalizeFn),
    put: data => request(url, { method: 'PUT', body: data, ...options }).then(normalizeFn),
    delete: () => request(url, { method: 'DELETE', ...options }).then(normalizeFn),
    get: () => request(url, options).then(normalizeFn),
  };
}
