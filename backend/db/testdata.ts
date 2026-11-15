// Testdaten, die beim ersten Start in eine leere Datenbank geschrieben werden.
// Gleiche Felder wie TTask im Frontend (frontend/src/types.ts).

export type TTodo = {
    uuid: string;
    createdAt: Date;
    title: string;
    description: string;
    completed: boolean;
    dueDate: Date | null;
    updating: boolean;
    priority: "none" | "low" | "medium" | "high";
    link: string;
    posindex: number;
    projectUuid: string | null;
    userUuid: string | null;
};

export type TProject = {
    uuid: string;
    createdAt: Date;
    title: string;
    description: string;
    userUuid: string | null;
};

// Platzhalter, bis die Todos echten (Supabase-)Usern zugeordnet werden
const TEST_USER_UUID = "test-user";

function daysFromNow(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
}

// Feste uuid, damit Testtodos auf das Projekt verweisen koennen (projectUuid)
const TODO_APP_PROJECT_UUID = crypto.randomUUID();

export const testProjects: TProject[] = [
    {
        uuid: TODO_APP_PROJECT_UUID,
        createdAt: daysFromNow(-7),
        title: "Todo-App",
        description: "Backend mit SQLite und Express aufbauen",
        userUuid: TEST_USER_UUID,
    },
    {
        uuid: crypto.randomUUID(),
        createdAt: daysFromNow(-6),
        title: "Haushalt",
        description: "Alles rund um Wohnung und Einkauf",
        userUuid: TEST_USER_UUID,
    },
];

export const testTodos: TTodo[] = [
    {
        uuid: crypto.randomUUID(),
        createdAt: daysFromNow(-5),
        title: "Einkaufen",
        description: "Milch, Brot, Eier und Kaffee besorgen",
        completed: false,
        dueDate: daysFromNow(0),
        updating: false,
        priority: "high",
        link: "",
        posindex: 0,
        projectUuid: null,
        userUuid: TEST_USER_UUID,
    },
    {
        uuid: crypto.randomUUID(),
        createdAt: daysFromNow(-4),
        title: "React Router Doku lesen",
        description: "Kapitel zu Loadern und Actions durcharbeiten",
        completed: false,
        dueDate: daysFromNow(3),
        updating: false,
        priority: "medium",
        link: "https://reactrouter.com/start/data/routing",
        posindex: 1,
        projectUuid: null,
        userUuid: TEST_USER_UUID,
    },
    {
        uuid: crypto.randomUUID(),
        createdAt: daysFromNow(-3),
        title: "SQLite Backend testen",
        description: "Testdaten anlegen und per API abrufen",
        completed: false,
        dueDate: null,
        updating: false,
        priority: "low",
        link: "",
        posindex: 2,
        projectUuid: TODO_APP_PROJECT_UUID,
        userUuid: TEST_USER_UUID,
    },
    {
        uuid: crypto.randomUUID(),
        createdAt: daysFromNow(-2),
        title: "Zahnarzttermin",
        description: "Termin fuer die Kontrolle vereinbaren",
        completed: true,
        dueDate: daysFromNow(-1),
        updating: false,
        priority: "none",
        link: "",
        posindex: 3,
        projectUuid: null,
        userUuid: TEST_USER_UUID,
    },
    {
        uuid: crypto.randomUUID(),
        createdAt: daysFromNow(-1),
        title: "Sport",
        description: "30 Minuten laufen gehen",
        completed: false,
        dueDate: daysFromNow(1),
        updating: false,
        priority: "none",
        link: "",
        posindex: 4,
        projectUuid: null,
        userUuid: TEST_USER_UUID,
    },
];
