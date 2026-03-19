import { supabase } from "../lib/supabase";

export const createUser = async (user: any) => {
    const { data, error } = await supabase
        .from("users")
        .insert([user]);

    if (error) throw error;
    return data;
};