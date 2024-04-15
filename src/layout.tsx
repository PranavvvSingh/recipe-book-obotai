import { Outlet } from "react-router-dom"
import Navbar from "./components/navbar"

const Layout = () => {
   return (
      <div className="flex flex-col h-[100vh] w-[100%]">
         <Navbar />
         <Outlet />
      </div>
   )
}

export default Layout
