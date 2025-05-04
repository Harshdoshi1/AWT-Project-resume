import { supabase } from '../lib/supabaseClient'

export const uploadFile = async (
  bucket: string,
  filePath: string,
  file: File
) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file)

  if (error) throw error
  return data
}

export const getPublicUrl = (bucket: string, filePath: string) => {
  return supabase.storage.from(bucket).getPublicUrl(filePath)
}

export const deleteFile = async (bucket: string, filePath: string) => {
  const { error } = await supabase.storage.from(bucket).remove([filePath])
  if (error) throw error
}
