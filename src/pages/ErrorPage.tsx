import { Link } from "react-router";

export default function ErrorPage() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
            <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">

                <p aria-hidden="true" className="font-mono text-6xl leading-none font-bold text-slate-200">
                    404
                </p>

                <h1 className="mt-5 font-mono text-lg font-bold tracking-wide text-slate-700 uppercase">
                    Seite nicht gefunden
                </h1>

                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                    Diese Adresse gibt es nicht. Vielleicht wurde die Aufgabe gelöscht
                    oder der Link ist veraltet.
                </p>

                <Link
                    to="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-md bg-emerald-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 active:bg-emerald-700"
                >
                    <span aria-hidden="true">←</span>
                    Zurück zur Aufgabenliste
                </Link>

            </div>
        </div>
    );
}
