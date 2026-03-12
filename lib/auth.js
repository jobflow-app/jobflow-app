import { supabase } from './supabase'

export async function loginWithPassword(email, password) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export async function isSuperadmin(email) {
  const { data, error } = await supabase
    .from('superadmins')
    .select('email')
    .eq('email', email)
    .maybeSingle()

  if (error) return false
  return !!data
}

export async function getUserCompanyRole(email) {
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('email', email)
    .maybeSingle()

  if (error || !data) return null
  return data.role
}
