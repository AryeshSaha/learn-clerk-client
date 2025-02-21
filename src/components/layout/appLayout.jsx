import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

const AppLayout = () => {
  return (
    <>
      <Header />
      <main className="h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
