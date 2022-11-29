import { Link } from "react-router-dom";
import '../styles/home.css';
import { HomeContent } from "modules/HomeContent";
import { Header } from "modules/Header";

const Home = () =>{
  return (
    <>
    <Header>
    </Header>
      <div className="Backdrop">
        <HomeContent />
      </div>
    </>
  );
}

export default Home;