import { supabase } from '@/lib/supabase'

export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession()
  return { session: data?.session ?? null, error }
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()
  return { user: data?.user ?? null, error }
}

export async function signOutUser() {
  return await supabase.auth.signOut()
}
