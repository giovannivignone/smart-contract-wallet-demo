import "styles/inputBox.css";
import { FC } from "react"

export const InputBox = ({inputTitle, inputPlaceHolder}) => {
    return (
        <fieldset>
            <legend>{inputTitle}</legend>
            <div>
                <input placeholder={inputPlaceHolder} list="plate-number-list" id="exampleDataList"></input>
            </div>
        </fieldset>
    );
}