import { callApi } from '@/utils/callApi';

export const loadCities = ({ uf }) => callApi(`states/${uf}`).get();

export const loadStates = () => callApi(`states`).get();
