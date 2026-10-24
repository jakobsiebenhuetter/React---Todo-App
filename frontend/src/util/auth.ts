import { redirect } from "react-router";
import { supabase } from "../lib/supabaseClient";

export async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
}

export async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    // Ohne Session ist "Confirm email" im Supabase-Dashboard aktiv
    return { needsConfirmation: !data.session };
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

export async function getUserEmail(): Promise<string | undefined> {
    const { data } = await supabase.auth.getSession();
    return data.session?.user.email;
}

// Im Loader aufrufen: leitet ohne gueltige Session auf /login um
export async function requireAuth() {
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
        throw redirect("/login");
    }
    return data.session;
}

// Fuer /login und /register: wer schon angemeldet ist, landet direkt in der App
export async function redirectIfAuthenticated() {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
        throw redirect("/");
    }
    return null;
}
