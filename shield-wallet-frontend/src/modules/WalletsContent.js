import "styles/inputBox.css";
import { InputBox } from "modules/InputBox";

export const WalletsContent = () => {
    return (
        <div className="Backdrop"> 
            <InputBox inputTitle="Wallet Name" inputPlaceHolder="Business Wallet"/>
            <InputBox inputTitle={""}/>
        </div>
    );
}
