import "styles/inputBox.css";
import { InputBox } from "modules/InputBox";

export const WalletBuilderContent = () => {
    return (
        <div className="Backdrop CenteredContent"> 
            <div className="WalletBuilderWrapper">
                <InputBox inputTitle="Wallet Name" inputPlaceHolder="Business Wallet"/>
                <InputBox inputTitle={"Guardians "} inputPlaceHolder="0xA87D...,0x90WGs..." />
                <InputBox inputTitle={"Guardian Voting Weights"} inputPlaceHolder="1,2,..." />
                <InputBox inputTitle={"Vote Threshold"} inputPlaceHolder="2" />
            </div>
        </div>
    );
}
