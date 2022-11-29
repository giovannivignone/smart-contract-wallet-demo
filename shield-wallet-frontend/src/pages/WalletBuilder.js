import { Header } from "modules/Header";
import { Outlet } from "react-router-dom";

const WalletBuilder = () => {
    return (
        <>
            <Header/>
            <Outlet />
        </>
  )
};

export default WalletBuilder;