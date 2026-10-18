import { redirect, ActionFunctionArgs } from "react-router";
import AuthForm, { TAuthActionData } from "@/components/AuthForm";
import { signIn } from "@/util/auth";

export default function LoginPage() {
  return (
    <AuthForm
      title="Anmelden"
      submitText="Anmelden"
      switchText="Noch kein Konto?"
      switchLink="/register"
      switchLinkText="Registrieren"
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request, params }: ActionFunctionArgs): Promise<TAuthActionData | Response> {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  try {
    await signIn(email, password);
  } catch {
    return { error: "E-Mail oder Passwort ist falsch." };
  }
  return redirect("/");
}
