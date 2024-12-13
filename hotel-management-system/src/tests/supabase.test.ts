import { createClient } from '@supabase/supabase-js';
import { config } from '../config/config';

const supabase = createClient(config.supabase.url, config.supabase.token);

async function testSupabaseConnection() {
  try {
    console.log('🔄 Testando conexão com Supabase...');
    
    // Teste de inserção de quarto
    console.log('🔄 Testando inserção de quarto...');
    const room = {
      number: 'TEST-101',
      type: 'SINGLE',
      status: 'AVAILABLE',
      price_per_night: 100.00,
      capacity: 1,
      floor: 1,
      description: 'Quarto de teste',
      amenities: ['TV', 'Wi-Fi']
    };
    
    const { data: insertedRoom, error: insertError } = await supabase
      .from('rooms')
      .insert(room)
      .select()
      .single();
      
    if (insertError) throw insertError;
    console.log('✅ Quarto inserido com sucesso:', insertedRoom);
    
    // Teste de consulta
    console.log('🔄 Testando consulta de quartos...');
    const { data: rooms, error: selectError } = await supabase
      .from('rooms')
      .select('*')
      .eq('number', 'TEST-101');
      
    if (selectError) throw selectError;
    console.log('✅ Quartos encontrados:', rooms);
    
    // Teste de atualização
    console.log('🔄 Testando atualização de quarto...');
    const { data: updatedRoom, error: updateError } = await supabase
      .from('rooms')
      .update({ status: 'MAINTENANCE' })
      .eq('number', 'TEST-101')
      .select()
      .single();
      
    if (updateError) throw updateError;
    console.log('✅ Quarto atualizado:', updatedRoom);
    
    // Teste de exclusão
    console.log('🔄 Testando exclusão de quarto...');
    const { error: deleteError } = await supabase
      .from('rooms')
      .delete()
      .eq('number', 'TEST-101');
      
    if (deleteError) throw deleteError;
    console.log('✅ Quarto excluído com sucesso!');
    
    console.log('✅ Todos os testes completados com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro durante os testes:', error);
    throw error;
  }
}

// Executar os testes
testSupabaseConnection();
