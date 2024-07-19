import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iebdlfthbbxohteapyua.supabase.co'; // Reemplaza con tu URL de Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllYmRsZnRoYmJ4b2h0ZWFweXVhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNzY5MDk5OSwiZXhwIjoyMDMzMjY2OTk5fQ.i5__q3Fz6feTQ3LhN6OFdncaEEbJS36FZZTK0oQZikk'; // Reemplaza con tu clave pública

export const supabase = createClient(supabaseUrl, supabaseKey);
