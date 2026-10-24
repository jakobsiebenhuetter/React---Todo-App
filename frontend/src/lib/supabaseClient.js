import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient('https://tdnsixpaxjkqjnzwghbf.supabase.co', 'sb_publishable_xCTg3XHP-YDR9oqCri7NdQ_nlByLPlb')