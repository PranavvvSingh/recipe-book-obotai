import { useDispatch, useSelector } from "react-redux"
import Recipe from "./recipe"
import Searchbar from "./searchbar"
import { RootState } from "@/redux/store"
import axios from "axios"
import { useEffect, useState } from "react"
import { setRecipes } from "@/redux/randomRecipesSlice"
import Loader from "./loader"
import Error from "./error"

const Home = () => {
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState("")
   const randomRecipes = useSelector((state: RootState) => state.randomRecipes)
   const dispatch = useDispatch()

   const fetchRandomRecipes = async () => {
      const apiKey = import.meta.env.VITE_API_KEY
       setLoading(true)
      try {
         const res = await axios.get(
            `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=4`,
         )
         dispatch(setRecipes(res.data.recipes))
         setLoading(false)
      } catch (error) {
         setError("Max API Requests reached")
         setLoading(false)
         console.log(error)
      }
   }

   useEffect(() => {
      if (randomRecipes.length === 0) fetchRandomRecipes()
   }, [randomRecipes])

return (
   <div className="flex flex-col basis-0 grow w-[100%]">
      <Searchbar />
      {loading ? (
         <Loader />
      ) : error === "" ? (
         <div className="basis-0 grow flex flex-wrap gap-5 justify-center items-center">
            {randomRecipes.map((recipe) => (
               <Recipe key={recipe.id} recipe={recipe} />
            ))}
         </div>
      ) : (
         <Error message={error}/>
      )}
   </div>
)
}

export default Home
