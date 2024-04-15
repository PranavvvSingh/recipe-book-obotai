import { RecipeType } from "@/types/types"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

const initialState: RecipeType[] = []

export const searchRecipesSlice = createSlice({
   name: "searchRecipes",
   initialState,
   reducers: {
      setSearchRecipes: (_state, action: PayloadAction<RecipeType[]>) => {
         return action.payload
      },
   },
})

export const { setSearchRecipes } = searchRecipesSlice.actions

export default searchRecipesSlice.reducer
