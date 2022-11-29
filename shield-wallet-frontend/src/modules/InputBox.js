import "styles/inputBox.css";

export const InputBox = ({inputTitle, inputPlaceHolder, id}) => {
    return (
        <fieldset>
            <legend>{inputTitle}</legend>
            <div>
                <input placeholder={inputPlaceHolder} list="plate-number-list" className="exampleDataList" id={id}></input>
            </div>
        </fieldset>
    );
}