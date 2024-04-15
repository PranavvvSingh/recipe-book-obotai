import { configureStore } from "@reduxjs/toolkit"
import randomSliceReducer from "./randomRecipesSlice"
import filtersSliceReducer from "./filtersSlice"
import searchRecipesSliceReducer from "./searchRecipesSlice"

export const store = configureStore({
   reducer: {
      randomRecipes: randomSliceReducer,
      filters: filtersSliceReducer,
      searchRecipes: searchRecipesSliceReducer,
   },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
