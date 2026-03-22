import { supabase } from '@/lib/supabase'

export async function getCurrentProfile() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { user: null, profile: null, error: userError || 'No user' }
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role, company_id, email, full_name')
    .eq('user_id', user.id)
    .single()

  if (profileError || !profile) {
    return { user, profile: null, error: profileError || 'No profile' }
  }

  return { user, profile, error: null }
}
