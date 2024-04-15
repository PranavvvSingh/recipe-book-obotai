export interface RecipeType {
   id: number
   title: string
   summary?: string
   image: string
   aggregateLikes?: number
   vegetarian?: boolean
   instructions?: string
   extendedIngredients?: IngredientType[]
   spoonacularScore?: number
   servings?: number
   readyInMinutes?: number
}
export interface IngredientType {
   id: number
   nameClean: string
   measures: { us: { amount: number; unitShort: string } }
}
export interface FiltersType {
   searchQuery: string
   mealType: string
   cuisineType: string
}

export interface ParamsType {
   apiKey: string
   query?: string
   number: number
   cuisine?: string
   type?: string
}
