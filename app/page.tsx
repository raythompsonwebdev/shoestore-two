import BannerImg from "./components/homepage/bannerImg";
import HomePageBoxes from './components/homepage/homepageBoxes'
import SideBar from './components/sideBar/sideBar'
import 'bootstrap/dist/css/bootstrap.min.css'


export default function Home() {

  return (
    <>
      <main id="main-content" className="clearfix">

          <SideBar />

        <section id="right-content-section" className="group">
          <BannerImg />

          <h1 id="right-content-section-header">Featured</h1>

          <HomePageBoxes />
        </section>
      </main>
    </>
  );
}
