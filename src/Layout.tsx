import { Outlet } from "react-router";

export default function Layout() {

  return (
    <>
      <h1 className="flex justify-center items-center w-screen h-[50px] bg-amber-400"></h1>
      <Outlet />
    </>
  );
}
