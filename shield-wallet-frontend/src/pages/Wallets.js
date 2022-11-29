import { Header } from "modules/Header";
import { Outlet } from "react-router-dom";
import { WalletsContent } from "modules/WalletsContent";

const Wallets = () => {
    return (
        <>
            <Header/>
            <WalletsContent/>
        </>
  )
};

export default Wallets;