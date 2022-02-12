import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div id="App" className="bg-primary font-sans text-indigo-50 flex">
      <Navbar />
      <div className="flex-1 ml-52">
        <main className="min-h-[90vh]">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
