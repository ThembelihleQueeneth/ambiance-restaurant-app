import { supabase } from '../lib/supabase'

export const getCart = async (userId: string) => {
    const { data, error } = await supabase
        .from('cart')
        .select(`
            *,
            items:item_id (*)
        `)
        .eq('user_id', userId)

    if (error) throw error

    return data
}

export const createCart = async (cartData: any) => {
    const { data: existing, error: findError } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', cartData.user_id)
        .eq('item_id', cartData.item_id)
        .maybeSingle()

    if (findError) throw findError

    if (existing) {
        // Increment quantity
        const { data, error } = await supabase
            .from('cart')
            .update({ quantity: (existing.quantity || 0) + (cartData.quantity || 1) })
            .eq('id', existing.id)
        if (error) throw error
        return data
    }

    // Insert new
    const { data, error } = await supabase.from('cart').insert([cartData])
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