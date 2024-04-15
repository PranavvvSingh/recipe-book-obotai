import { FiltersType } from "@/types/types"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

const initialState: FiltersType = {
   searchQuery: "",
   mealType: "",
   cuisineType: "",
}

export const filtersSlice = createSlice({
   name: "filters",
   initialState,
   reducers: {
      setSearchQuery: (state, action: PayloadAction<string>) => {
         state.searchQuery = action.payload
      },
      setMealType: (state, action: PayloadAction<string>) => {
         state.mealType = action.payload
      },
      setCuisineType: (state, action: PayloadAction<string>) => {
         state.cuisineType = action.payload
      },
   },
})

export const { setSearchQuery, setMealType, setCuisineType } =
   filtersSlice.actions

export default filtersSlice.reducer
