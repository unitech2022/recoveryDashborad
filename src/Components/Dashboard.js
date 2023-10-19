import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import useLoader from "./loader/useLoader";
import Navbar from "./Navbar";
import Sidebar from "./SideMenu";

export default function Dashboard() {
    const [loader, showLoader, hideLoader] = useLoader(); 

    return (

        <div className="wrapper text-start">
<Toaster
  toastOptions={{
    success: {
      style: {
        background: 'green',
        color:"white",
        width:'300px',
        height:'70px'
      },
    },
    error: {
        style: {
            background: 'red',
            color:"white",
            width:'300px',
            height:'70px'
          },
    },
  }}
/>
            <main className="page-content">

                <div className="wrapper">

                    <Navbar />
                    <Sidebar />

                    <div className="content-wrapper">
                        <Outlet />
                    </div>
                    <Footer />
                    <aside className="control-sidebar control-sidebar-dark">
                    </aside>

                </div>  </main>
       
            <div className="overlay nav-toggle-icon" />
      
            <a href="javaScript:;" className="back-to-top"><i className="bx bxs-up-arrow-alt" /></a>
     
        </div>



    );
}