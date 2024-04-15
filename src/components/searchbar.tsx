import { setSearchQuery } from "@/redux/filtersSlice"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const Searchbar = () => {
   const [text, setText] = useState("")
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      dispatch(setSearchQuery(text))
      navigate("/search")
   }
   return (
      <div className="flex justify-center pt-14">
         <form
            className="flex group border-2 focus-within:border-[#FF204E] justify-between w-[300px] md:w-[400px]  gap-2 rounded-full"
            onSubmit={onSubmit}
         >
            <input
               className="outline-none ps-6 bg-inherit text-black w-full"
               type="search"
               placeholder="Search for recipes..."
               value={text}
               onChange={(e) => setText(e.target.value)}
               spellCheck="false"
               required
            />
            <button className="bg-[#FF204E] text-white rounded-full px-6 py-2 text-lg">
               Search
            </button>
         </form>
      </div>
   )
}

export default Searchbar
