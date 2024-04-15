import { Route, Routes } from "react-router-dom"
import "./App.css"
import Layout from "./layout"
import Home from "./components/home"
import RecipeDetails from "./components/recipeDetails"
import Search from "./components/search"

function App() {
   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/search" element={<Search />} />
         </Route>
      </Routes>
   )
}

export default App
