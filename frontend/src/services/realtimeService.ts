import { supabase } from '../lib/supabaseClient'

type RealtimeCallback = (payload: any) => void

export const subscribeToTable = (
  tableName: string, 
  callback: RealtimeCallback
) => {
  return supabase
    .channel(`${tableName}-changes`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: tableName
      },
      callback
    )
    .subscribe()
}

export const unsubscribeFromTable = (subscription: any) => {
  supabase.removeChannel(subscription)
}
