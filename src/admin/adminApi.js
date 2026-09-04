/**
 * DISCONNECTED FROM BACKEND
 * This file has been stubbed to allow the admin interface to function 
 * without a real backend connection. Operations like login and fetching 
 * now return mock successes.
 */

import { getAdminToken } from './adminAuth.js';

export async function adminLoginRequest(username, password) {
  // Mock login success for any credentials
  console.log('Mock login with:', username);
  return { token: 'mock-admin-token-headless' };
}

export async function authFetch(path, options = {}) {
  const token = getAdminToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  console.log(`Mocking authFetch: ${options.method || 'GET'} ${path}`);

  // Return empty data/success for all admin actions
  // Since real CMS data is now hardcoded in publicCms.js, 
  // admin edits won't persist across refreshes.
  
  if (path === '/api/contact') {
    return []; // No leads in backend-less mode
  }

  return { success: true };
}
