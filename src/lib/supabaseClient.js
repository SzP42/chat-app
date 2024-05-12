import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://milrsbvfwteyvfjxxmkz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pbHJzYnZmd3RleXZmanh4bWt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU1MjgzMzksImV4cCI6MjAzMTEwNDMzOX0.d_a9XgsFRrsbP9zg0dTCCzq7rqDcjgZt-1BZL18sn_E')