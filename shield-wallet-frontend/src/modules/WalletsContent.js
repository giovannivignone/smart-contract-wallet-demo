import "styles/inputBox.css";
import { Wallet } from "./Wallet";

export const WalletsContent = () => {
    return (
        <div className="Backdrop CenteredContent"> 
           <><div className="TopBar">
            <div className="InnerTopBarText">Wallets</div>
            </div>
            <Wallet address={window.localStorage.getItem("walletAddress")}></Wallet>
        </> 
        </div>
    );
}
