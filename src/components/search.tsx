import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@radix-ui/react-select"
import { IoIosSearch as SearchIcon } from "react-icons/io"
import { useEffect, useState } from "react"
import { ParamsType } from "@/types/types"
import { useDispatch, useSelector } from "react-redux"
import {
   setCuisineType,
   setMealType,
   setSearchQuery,
} from "@/redux/filtersSlice"
import axios from "axios"
import { setSearchRecipes } from "@/redux/searchRecipesSlice"
import { RootState } from "@/redux/store"
import Recipe from "./recipe"
import Loader from "./loader"
import Error from "./error"

const Search = () => {
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState("")
   const { searchQuery, mealType, cuisineType } = useSelector(
      (state: RootState) => state.filters,
   )
   const [text, setText] = useState(searchQuery)
   const [meal, setMeal] = useState(mealType)
   const [cuisine, setCuisine] = useState(cuisineType)
   const searchResults = useSelector((state: RootState) => state.searchRecipes)
   const dispatch = useDispatch()
   const handleSubmit = async () => {
      dispatch(setSearchQuery(text))
      dispatch(setMealType(meal))
      dispatch(setCuisineType(cuisine))
   }
   const fetchRecipes = async () => {
      setLoading(true)
      const params: ParamsType = {
         apiKey: import.meta.env.VITE_API_KEY,
         number: 4,
      }
      if (text !== "") params.query = text
      if (meal !== "") params.type = meal
      if (cuisine !== "") params.cuisine = cuisine
      try {
         const res = await axios.get(
            "https://api.spoonacular.com/recipes/complexSearch",
            { params },
         )
         dispatch(setSearchRecipes(res.data.results))
         setLoading(false)
      } catch (error) {
         setError("Max API Requests reached")
         setLoading(false)
         console.error(error)
      }
   }
   const mealOptions = [
      "Bread",
      "Main course",
      "Soup",
      "Breakfast",
      "Salad",
      "Apetizer",
      "Dessert",
      "Drink",
      "Snack",
   ]
   const cuisineOptions = [
      "African",
      "French",
      "British",
      "Indian",
      "Greek",
      "Italian",
      "Japanese",
      "Korean",
      "Southern",
      "Chinese",
      "Mexican",
      "Thai",
   ]

   useEffect(() => {
      if (searchQuery === "" && mealType === "" && cuisineType === "") return
      fetchRecipes()
   }, [searchQuery, mealType, cuisineType])

   return (
      <div className="flex flex-col h-[100%] pt-5 p-10">
         <div className="flex justify-center gap-2 py-10">
            <form
               className="flex items-center group border-2 border-neutral-300 justify-between w-[200px] md:w-[250px] gap-2 rounded-[10px] focus-within:border-[#FF204E]"
               onSubmit={(event) => {
                  event.preventDefault()
               }}
            >
               <SearchIcon className="text-2xl text-neutral-500 ms-4 group-focus-within:text-[#FF204E]" />
               <input
                  className="outline-none pe-5 py-2 bg-inherit text-[#00224D] w-full"
                  type="search"
                  placeholder="Search for recipes..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  spellCheck="false"
                  required
               />
            </form>
            <div className="flex gap-2 border-2 border-neutral-300 focus-within:border-[#FF204E] rounded-[10px] p-2">
               <label className="text-center w-full">Meal Type:</label>
               <div>
                  <Select value={meal} onValueChange={(val) => setMeal(val)}>
                     <SelectTrigger className="w-[120px] capitalize">
                        <SelectValue placeholder="Select">{meal}</SelectValue>
                     </SelectTrigger>
                     <SelectContent className="w-[120px] text-center border-2  mt-3 rounded-[10px] gap-1 py-1 bg-neutral-50">
                        {mealOptions.map((option) => (
                           <SelectItem
                              key={option}
                              value={option}
                              className="cursor-pointer"
                           >
                              {option}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </div>
            </div>
            <div className="flex gap-2 border-2 border-[neutral-300] focus-within:border-[#FF204E] rounded-[10px] p-2">
               <label className="text-center w-full">Cuisine:</label>
               <div>
                  <Select
                     value={cuisine}
                     onValueChange={(val) => setCuisine(val)}
                  >
                     <SelectTrigger className="w-[120px] capitalize">
                        <SelectValue placeholder="Select">
                           {cuisine}
                        </SelectValue>
                     </SelectTrigger>
                     <SelectContent className="w-[120px] text-center border-2 mt-3 rounded-[10px] gap-1 py-1 bg-neutral-50">
                        {cuisineOptions.map((option) => (
                           <SelectItem
                              key={option}
                              value={option}
                              className="cursor-pointer"
                           >
                              {option}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>
               </div>
            </div>
            <div
               className="flex items-center justify-center gap-1 bg-[#FF204E] px-4 py-1 text-white rounded-full cursor-pointer"
               onClick={handleSubmit}
            >
               <SearchIcon className="text-xl text-white" />
               <h2>Find Recipes</h2>
            </div>
         </div>
         {loading ? (
            <Loader />
         ) : error === "" ? (
            <div className="basis-0 grow flex flex-wrap gap-5 justify-center items-center">
               {searchResults.length === 0 ? (
                  <div className="text-xl text-neutral-400 pb-5">
                     No Results
                  </div>
               ) : (
                  searchResults.map((recipe) => (
                     <Recipe key={recipe.id} recipe={recipe} search={true} />
                  ))
               )}
            </div>
         ) : (
            <Error message={error} />
         )}
      </div>
   )
}

export default Search
