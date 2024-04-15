import { getFirstLine, stripHtml } from "@/utils/utils"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { RecipeType as RecipeType } from "@/types/types"
import { useNavigate } from "react-router-dom"

const Recipe = ({
   recipe,
   search,
}: {
   recipe: RecipeType
   search?: boolean
}) => {
   const navigate = useNavigate()
   const summary = stripHtml(recipe.summary ?? "")
   const onClick = () => {
      navigate(`/recipe/${recipe.id}`)
   }
   return (
      <Card
         className={`w-[300px] ${
            search ? "h-[300px]" : "h-[360px]"
         } cursor-pointer hover:border-[#FF204E]`}
         onClick={onClick}
      >
         <CardHeader>
            <CardTitle>
               <img
                  src={recipe.image}
                  className="aspect-video h-[180px] object-cover"
               />
               <CardContent>
                  <h1
                     className={`text-xl mb-5 subheading line-clamp-2 text-[#5D0E41] ${
                        search ? "text-center" : "text-pretty"
                     } `}
                  >
                     {recipe.title}
                  </h1>
                  {summary.length > 0 && (
                     <p className="text-neutral-500 line-clamp-3">
                        {getFirstLine(summary)}
                     </p>
                  )}
               </CardContent>
            </CardTitle>
         </CardHeader>
      </Card>
   )
}

export default Recipe
