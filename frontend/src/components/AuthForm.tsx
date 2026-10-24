import { Form, Link, useActionData, useNavigation } from "react-router";
import Button from "./Button";

export type TAuthActionData = {
  error?: string;
  info?: string;
};

type TAuthFormProps = {
  title: string;
  submitText: string;
  switchText: string;
  switchLink: string;
  switchLinkText: string;
};

const labelClass = "mb-1.5 block font-mono text-xs font-bold tracking-wide text-slate-500 uppercase";

export default function AuthForm({ title, submitText, switchText, switchLink, switchLinkText }: TAuthFormProps) {
  // const actionData = useActionData<TAuthActionData>();
  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Form method="post" className="w-full max-w-sm space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <img src="/favicon.svg" alt="Mylist Icon" className="h-6 w-6" />
          <h1 className="text-xl font-bold text-slate-800">{title}</h1>
        </div>

        {/* {actionData?.error && (
          <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">{actionData.error}</p>
        )}
        {actionData?.info && (
          <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{actionData.info}</p>
        )} */}

        <div>
          <label htmlFor="email" className={labelClass}>E-Mail</label>
          {/* type="text" statt "email", damit die globale Input-Regel aus index.css greift */}
          <input id="email" name="email" type="text" inputMode="email" autoComplete="email" required className="w-full text-sm" />
        </div>
        <div>
          <label htmlFor="password" className={labelClass}>Passwort</label>
          <input
            id="password"
            name="password"
            type="password"
            // autoComplete={submitText === "Registrieren" ? "new-password" : "current-password"}
            minLength={6}
            required
            className="w-full min-h-10 rounded-md border border-slate-300 bg-white px-2.5 py-2 text-sm text-slate-800 focus:outline-2 focus:-outline-offset-1 focus:outline-emerald-500"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          // variant={isSubmitting ? "disabled" : "primary"}
          // disabled={isSubmitting}
          className="min-h-10 w-full rounded-md px-4 text-sm font-bold shadow-sm"
        >
          {/* {isSubmitting ? "Bitte warten..." : submitText} */}
          {submitText}
        </Button>

        <p className="text-center text-sm text-slate-600">
          {switchText}{" "}
          <Link to={switchLink} className="font-bold text-emerald-600 hover:underline">{switchLinkText}</Link>
        </p>
      </Form>
    </div>
  );
}
