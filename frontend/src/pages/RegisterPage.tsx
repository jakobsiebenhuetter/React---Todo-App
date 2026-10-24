import { redirect, ActionFunctionArgs } from "react-router";
import AuthForm, { TAuthActionData } from "@/components/AuthForm";
import { signUp } from "@/util/auth";

export default function RegisterPage() {
  return (
    <AuthForm
      title="Registrieren"
      submitText="Registrieren"
      switchText="Schon ein Konto?"
      switchLink="/login"
      switchLinkText="Anmelden"
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request, params }: ActionFunctionArgs): Promise<TAuthActionData | Response> {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  try {
    const { needsConfirmation } = await signUp(email, password);
    if (needsConfirmation) {
      return { info: "Fast geschafft: Bitte bestätige deine E-Mail-Adresse über den Link in der Mail." };
    }
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Registrierung fehlgeschlagen." };
  }
  return redirect("/");
}
