import { RecipeType } from "@/types/types"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

const initialState: RecipeType[] = []

export const randomRecipesSlice = createSlice({
   name: "randomRecipes",
   initialState,
   reducers: {
      setRecipes: (_state, action: PayloadAction<RecipeType[]>) => {
         return action.payload
      },
   },
})

export const { setRecipes } = randomRecipesSlice.actions

export default randomRecipesSlice.reducer
