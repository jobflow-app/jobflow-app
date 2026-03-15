import { supabase } from './supabase'

export async function getCurrentUserWithRole() {
  if (!supabase) {
    return { user: null, profile: null, error: 'Supabase is not connected.' }
  }

  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData?.user) {
    return { user: null, profile: null, error: userError?.message || 'No user found.' }
  }

  const user = userData.user

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role, company_id, email, full_name')
    .eq('user_id', user.id)
    .maybeSingle()

  if (profileError) {
    return { user, profile: null, error: profileError.message }
  }

  return { user, profile, error: null }
}
