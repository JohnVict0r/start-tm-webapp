export const getAuthToken = () => localStorage.getItem('jwt');
export const setAuthToken = token => localStorage.setItem('jwt', token);
export const removeAuthToken = () => localStorage.removeItem('jwt');
