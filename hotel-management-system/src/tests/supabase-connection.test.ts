import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
const supabaseUrl = 'https://bvbhjkmkgbhqqkwsjshv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2Ymhqa21rZ2JocXFrd3Nqc2h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMTc2MTksImV4cCI6MjA0OTY5MzYxOX0.mscGheHEh79jdjE8vPxxnXwDfy7EhCGSkAhkcTXWYjM';

// Criar cliente Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('🔄 Testando conexão com Supabase...');
    
    // Tentar fazer uma consulta simples
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .limit(1);
    
    if (error) {
      throw error;
    }
    
    console.log('✅ Conexão estabelecida com sucesso!');
    console.log('📊 Dados recuperados:', data);
    
  } catch (error) {
    console.error('❌ Erro ao conectar com Supabase:', error);
  }
}

// Executar o teste
testConnection();
