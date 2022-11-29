import "styles/inputBox.css";
import { InputBox } from "modules/InputBox";
import Web3 from "web3";


export const WalletBuilderContent = () => {
    const fetchWalletInputs = () => {
        const name = document.getElementById("walletName").value;
        const guardians = document.getElementById("walletGuardians").value;
        const threshold = document.getElementById("walletThreshold").value;
        return [name, guardians, threshold];
    }
    const fetchWeb3 = async() => {
        if (!window.ethereum) {
            alert("Please install MetaMask to use this dApp!");
            throw Error("MetaMask not installed");
        }
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        return web3;
    }
    const createWallet = async () => {
        const web3 = await fetchWeb3();
        const [name, guardians, threshold] = fetchWalletInputs();
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const tx = await contract.methods.createWallet(name, guardians, threshold).send({ from: account });
        return tx;
    }
    const handleCreateWallet = async() => {
        document.getElementById("deployWalletButton").disabled = true;
        const executedTransaction = await createWallet();
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
                <button className="Deploy" id="deployWalletButton" onClick={handleCreateWallet}>Deploy Wallet</button>
            </div>
        </div>
    );
}
