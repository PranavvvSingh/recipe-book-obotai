import { Link } from "react-router-dom"
import { HiOutlineBookOpen as Book } from "react-icons/hi2"

const Navbar = () => {
   return (
      <div className="flex justify-between items-center bg-[#00224D] text-white px-10 py-5 h-[68px]">
         <div className="flex items-center gap-1">
            <h1 className="text-xl heading">RecipeBook</h1>
            <Book className="text-2xl" />
         </div>

         <div className="flex justify-center items-center gap-5">
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
         </div>
      </div>
   )
}

export default Navbar
