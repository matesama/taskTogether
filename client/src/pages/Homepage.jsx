import Navi from "../components/home/Navi";
import HeroSection from "../components/home/HeroSection";
import Description from "../components/home/Description";
import Footer from "../components/home/Footer"

const Homepage = () => {

    return (
        <div>
            <Navi />
            <HeroSection />
            <Description />
            <Footer />
        </div>
    )
}

export default Homepage;