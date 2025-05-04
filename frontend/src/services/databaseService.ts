import { supabase } from '../lib/supabaseClient'

export const fetchTableData = async (tableName: string) => {
  const { data, error } = await supabase.from(tableName).select('*')
  if (error) throw error
  return data
}

export const insertRecord = async (tableName: string, recordData: any) => {
  const { data, error } = await supabase.from(tableName).insert(recordData)
  if (error) throw error
  return data
}

export const updateRecord = async (tableName: string, id: string, updates: any) => {
  const { data, error } = await supabase.from(tableName).update(updates).eq('id', id)
  if (error) throw error
  return data
}

export const deleteRecord = async (tableName: string, id: string) => {
  const { error } = await supabase.from(tableName).delete().eq('id', id)
  if (error) throw error
}
