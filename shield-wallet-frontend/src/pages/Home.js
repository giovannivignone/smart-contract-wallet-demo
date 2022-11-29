import '../styles/homeContent.css';
import { HomeContent } from "modules/HomeContent";
import { Header } from "modules/Header";

const Home = () =>{
  return (
    <>
    <Header/>
    <HomeContent />
    </>
  );
}

export default Home;