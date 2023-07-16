import SearchBar from "../components/searchBar/SearchBar";
import SideBar from '../components/sideBar/sideBar'
import AllProducts from '../components/allproducts/allProducts'
import "bootstrap/dist/css/bootstrap.min.css";

export default function Allproducts() {

  return (

    <>
      <main id="main-content" className="clearfix">
        <SearchBar labelname="All Products" />
        <SideBar />

        <main id="right-content-section" className="group">

        < AllProducts />

        </main>
      </main>
    </>

  );
}
