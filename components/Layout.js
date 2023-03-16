import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="mx-6 md:max-w-2xl md:mx-auto">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
