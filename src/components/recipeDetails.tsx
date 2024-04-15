import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { RecipeType } from "@/types/types"
import { splitContent, stripHtml } from "@/utils/utils"
import { AiFillCaretRight as Point } from "react-icons/ai"
import { FaHeart as Heart } from "react-icons/fa"
import { GrLike as Score } from "react-icons/gr"
import { IoTime as Time } from "react-icons/io5"
import { BiSolidBowlHot as Serving } from "react-icons/bi"
import Loader from "./loader"
import Error from "./error"

const RecipeDetails = () => {
   const { id } = useParams()
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState("")
   const [recipe, setRecipe] = useState<RecipeType>({} as RecipeType)
   const instructions = splitContent(recipe?.instructions || "")

   const fetchRecipe = async () => {
      const apiKey = import.meta.env.VITE_API_KEY
      setLoading(true)
      try {
         const res = await axios.get(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&number=4`,
         )
         setRecipe(res.data)
         setLoading(false)
      } catch (error) {
         console.log(error)
         setError("Max API requests reached")
         setLoading(false)
      }
   }

   useEffect(() => {
      fetchRecipe()
   }, [id])

   if(loading) return <Loader />
   else if(error!=="") <Error message={error} />
   return (
      <div className="flex justify-center gap-10 p-7  overflow-hidden">
         <div className="w-[400px] lg:w-[500px] flex flex-col p-5 justify-center items-center ring-1 ring-[#FF204E]/[0.5] rounded-[10px] bg-[#FF204E]/[0.15]">
            <img
               src={recipe?.image}
               className="w-[400px] object-cover"
            />
            <h1 className="text-2xl font-bold mt-3 mb-5 text-center text-[#5D0E41] subheading">
               {recipe?.title}
            </h1>
            <div className="flex items-center justify-center gap-4 mb-5">
               <div className="flex gap-1 items-center border-2 border-red-500 w-min rounded-[10px] px-2 py-1">
                  <Heart className="text-red-500" />
                  {recipe.aggregateLikes}
               </div>
               <div className="flex gap-1 items-center border-2 border-yellow-500 w-min rounded-[10px] px-2 py-1">
                  <Score className="text-yellow-500" />
                  {Math.round(recipe.spoonacularScore as number)}%
               </div>
               <div
                  className={`${
                     recipe.vegetarian ? "bg-green-600" : "bg-red-600"
                  } w-min rounded-[10px] px-2 py-1 text-nowrap text-white`}
               >
                  {recipe.vegetarian ? "Veg" : "Non-Veg"}
               </div>
            </div>
            <div className="flex flex-col gap-2 justify-center text-lg text-[#00224D]">
               <div className="flex gap-1 items-center">
                  <Time />
                  Ready in {recipe?.readyInMinutes} minutes
               </div>
               <div className="flex gap-1 items-center">
                  <Serving />
                  Serves {recipe?.servings}
               </div>
            </div>
         </div>
         <div className="flex basis-0 grow flex-col gap-5 overflow-y-auto">
            <div className="flex flex-col gap-2">
               <h2 className="font-semibold text-2xl text-[#5D0E41]">
                  Summary
               </h2>
               <p>{stripHtml(recipe?.summary || "")}</p>
            </div>
            <div className="flex flex-col gap-2">
               <h2 className="font-semibold text-2xl text-[#5D0E41]">
                  Ingredients
               </h2>
               <ol>
                  {recipe?.extendedIngredients?.map((ingredient) => (
                     <li
                        key={crypto.randomUUID()}
                        className="text-capitalize flex items-center gap-1"
                     >
                        <Point />
                        {ingredient.nameClean}
                        <span className="text-neutral-500">
                           (
                           {ingredient.measures.us.amount +
                              " " +
                              ingredient.measures.us.unitShort}
                           )
                        </span>
                     </li>
                  ))}
               </ol>
            </div>
            <div className="flex flex-col gap-2">
               <h2 className="font-semibold text-2xl text-[#5D0E41]">
                  Instructions
               </h2>
               <ol className="list-decimal list-inside">
                  {instructions.map((instruction) =>
                     instruction.length > 0 ? (
                        <li key={crypto.randomUUID()}>{instruction}.</li>
                     ) : null,
                  )}
               </ol>
               <p></p>
            </div>
         </div>
      </div>
   )
}

export default RecipeDetails
