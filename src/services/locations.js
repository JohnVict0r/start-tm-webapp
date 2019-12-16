import { callApi } from '@/utils/callApi';

export const loadCities = ({ stateId }) => callApi(`states/${stateId}/cities`).get();

export const loadStates = () => callApi(`states`).get();
