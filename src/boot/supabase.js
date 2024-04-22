import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://ovzhtgnkwevritftvhlc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92emh0Z25rd2V2cml0ZnR2aGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIwODEzODAsImV4cCI6MjAxNzY1NzM4MH0.AAFvn-mEKBq_aPREaMoABDGOl-dAZ3siKwJSxiESw_o'
);
