import { supabase } from '../lib/supabase'

export const getCart = async () => {
    const { data, error } = await supabase.from('cart').select('*')
    if (error) throw error
    return data
}

export const createCart = async (item: any) => {
    const { data, error } = await supabase.from('cart').insert([item])
    if (error) throw error
    return data
}

export const updateCart = async (id: string, updates: any) => {
    const { data, error } = await supabase
        .from('cart')
        .update(updates)
        .eq('id', id)

    if (error) throw error
    return data
}

export const deleteCart = async (id: string) => {
    const { data, error } = await supabase
        .from('cart')
        .delete()
        .eq('id', id)

    if (error) throw error
    return data
}