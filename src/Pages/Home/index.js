import { NavBar } from "../../Components/Navbar"
import { ProductPicture } from "../../Components/ProductPicture"
import demopicture from '../../Components/ProductPicture/DemoPicture.jpg'
import { StyledMain } from "./styles"

export const HomePage = function() {
  return(
    <>
      <section>
        <NavBar/>
      </section>
      <StyledMain>
          <ProductPicture Picture={demopicture} />
          <ProductPicture Picture={demopicture} />
          <ProductPicture Picture={demopicture} />
          <ProductPicture Picture={demopicture} />
      </StyledMain>
    </>
  )
}