import { supabase } from "../lib/supabase";

export const createUser = async (user: any) => {
    const { data, error } = await supabase
        .from("users")
        .insert([user])
        .select()  // Required in Supabase v2 to return inserted data
        .single();

    if (error) throw error;
    return data;
};

export const getUsers = async () => {
    const { data, error } = await supabase
        .from("users")
        .select("*");

    if (error) throw error;
    return data;
};

export const getUserById = async (id: string) => {
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;
    return data;
};