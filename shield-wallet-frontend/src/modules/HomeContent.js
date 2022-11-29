import { useState } from "react";
import "styles/homeContent.css";
import { InputBox } from "./InputBox";

export const HomeContent = () => {
    const [walletCreated, setWalletCreated] = useState(false);
    const makeWallet = () => {
        if (walletCreated) {
            return;
        }
        setWalletCreated(true);
    }
    return (
        <div className="Backdrop">
        <div className="wrapper">
            <h1 className="title">The future of Ethereum Wallets</h1>
            <div className="subTextWrapper">
                <div className="innerText">
                    We have built robust smart contracts to make your life easier navigating crypto. 
                </div>
                <div className="innerText">
                    Enter our site below and build your new CoinMaster Wallet!
                </div>
                <button className="enter" onClick={makeWallet}>{walletCreated ? "Loading": "Enter"}</button>
            </div>
            </div>
        </div>
    );
}
    