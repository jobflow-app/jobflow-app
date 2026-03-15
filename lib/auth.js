import { supabase } from './supabase'

async function getAuthUser() {
  if (!supabase) return null

  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error('getAuthUser error:', error.message)
    return null
  }

  return data?.user || null
}

export async function getCurrentUser() {
  return await getAuthUser()
}

export async function getCurrentProfile() {
  if (!supabase) return null

  const user = await getAuthUser()
  if (!user?.id) return null

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('id, user_id, email, full_name, role, company_id')
    .eq('user_id', user.id)
    .maybeSingle()

  if (error) {
    console.error('getCurrentProfile error:', error.message)
    return null
  }

  return profile || null
}
