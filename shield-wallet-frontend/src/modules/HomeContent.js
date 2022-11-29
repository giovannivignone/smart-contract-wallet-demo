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
        <div className="wrapper">
            <h1 className="title">Welcome to the future of Wallets</h1>
            <div className="subTextWrapper">
                <InputBox inputTitle="Name" inputPlaceHolder="Enter name here" />
                <InputBox inputTitle="Email" inputPlaceHolder="Enter email here" />
                <button className="subscribe" onClick={makeWallet}>{walletCreated ? "Loading": "Create Wallet"}</button>
            </div>
        </div>
    );
}
    