const KEY = 'idms_admin_jwt';

export function getAdminToken() {
  return localStorage.getItem(KEY) || sessionStorage.getItem(KEY);
}

/** @param {string} token @param {boolean} [remember=true] persist in localStorage vs session */
export function setAdminToken(token, remember = true) {
  clearAdminToken();
  if (remember) {
    localStorage.setItem(KEY, token);
  } else {
    sessionStorage.setItem(KEY, token);
  }
}

export function clearAdminToken() {
  localStorage.removeItem(KEY);
  sessionStorage.removeItem(KEY);
}
