// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://wvcquztiubnkzrrjkhhx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2Y3F1enRpdWJua3pycmpraGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1Mjg0ODgsImV4cCI6MjA5MDEwNDQ4OH0.dC7NOQXr38AWDTOwlmi9Hs7wD6njtf2s7km2PMh8L-A'
)