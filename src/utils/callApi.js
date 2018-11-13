import { camelizeKeys } from 'humps';
import { normalize } from 'normalizr';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import request from '@/utils/request';
import { getAuthToken } from '@/utils/authentication';

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

async function handleError(e) {
  // if validation error
  if (e.response && e.response.status === 422) {
    const response = await e.response.json();
    return camelizeKeys(response);
  }

  return e;
}

async function handleRequest(url, options, schema) {
  try {
    const response = await request(url, options);
    return normalizeJson(response, schema);
  } catch (e) {
    return handleError(e);
  }
}

/**
 * Cliente para consulta a API Rest.
 */
export default function callApi(endpoint, schema) {
  // API_URL defined in .env
  const url = API_URL + endpoint;

  const token = getAuthToken();
  const options = {
    // TODO quando o bug abaixo for resolvido e alterado, remover o atributo crendentials
    // https://github.com/spatie/laravel-cors/issues/28
    credentials: 'same-origin',
    headers: { Authorization: `Bearer ${token}` },
  };

  return {
    post: data => handleRequest(url, { method: 'POST', body: data, ...options }, schema),
    put: data => handleRequest(url, { method: 'PUT', body: data, ...options }, schema),
    delete: () => handleRequest(url, { method: 'DELETE', ...options }, schema),
    get: () => handleRequest(url, options, schema),
  };
}
