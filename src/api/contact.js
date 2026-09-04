/**
 * DISCONNECTED FROM BACKEND
 * The contact form is now handled directly via mailto: in the component.
 */

export function buildContactPayload(form, selectedCountry) {
  // Logic preserved for reference, but not used by the new mailto flow
  return {};
}

export async function postContact(payload) {
  // No-op for backend-less operation
  console.log('Backend disconnected. Contact payload:', payload);
  return { success: true };
}
