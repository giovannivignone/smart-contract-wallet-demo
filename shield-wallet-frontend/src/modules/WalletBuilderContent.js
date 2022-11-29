import "styles/inputBox.css";
import { InputBox } from "modules/InputBox";

export const WalletBuilderContent = () => {
    const fetchWalletInputs = () => {
        const name = document.getElementById("walletName").value;
        const guardians = document.getElementById("walletGuardians").value;
        const threshold = document.getElementById("walletThreshold").value;
        return [name, guardians, threshold];
    }
    const deployWallet = () => {
        console.log("Deploying Wallet");
        document.getElementById("deployWalletButton").disabled = true;
        const [name, guardians, threshold] = fetchWalletInputs();
        console.log(name, guardians, threshold);
    }
    return (
        <div className="Backdrop CenteredContent">
            <div className="TopBar">
                <div className="InnerTopBarText">Wallet Builder</div>
            </div>
            <div className="WalletBuilderWrapper">
                <InputBox inputTitle="Wallet Name" id="walletName" inputPlaceHolder="Business Wallet"/>
                <InputBox inputTitle={"Guardians"} id="walletGuardians" inputPlaceHolder="0xA87D...,0x90WGs..." />
                <InputBox inputTitle={"Guardian Voting Weights"} id="walletGuardianWeights" inputPlaceHolder="1,2,..." />
                <InputBox inputTitle={"Vote Threshold"} id="walletThreshold" inputPlaceHolder="2" />
                <button className="Deploy" id="deployWalletButton" onClick={deployWallet}>Deploy Wallet</button>
            </div>
        </div>
    );
}
