import { createClient } from '@supabase/supabase-js';
import { config } from './config';

const supabaseUrl = 'https://bvbhjkmkgbhqqkwsjshv.supabase.co';
const supabaseKey = config.supabase.token;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const initSupabase = async () => {
  try {
    const { data, error } = await supabase.from('health_check').select('*');
    if (error) throw error;
    console.log('Conexão com Supabase estabelecida com sucesso');
    return true;
  } catch (error) {
    console.error('Erro ao conectar com Supabase:', error);
    return false;
  }
};
