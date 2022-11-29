import "styles/inputBox.css";
import { InputBox } from "modules/InputBox";
import Web3 from "web3";
import contractCompiled from "../constants/abis/BaseCoinMasterWallet.json";
import securityServiceCompiled from "../constants/abis/ShieldSafetyService.json";
import {useState} from "react";


export const WalletBuilderContent = () => {
    const [step, setStep] = useState(1);
    const [walletAddr, setWalletAddr] = useState("");
    const navigateToWalletPage = () => {
        window.location.href = "/wallets";
    }
    const fetchWalletInputs = () => {
        const name = document.getElementById("walletName").value;
        return { name };
    }
    const fetchGuardianInputs = () => {
        const guardians = document.getElementById("walletGuardians").value;
        const threshold = document.getElementById("walletThreshold").value;
        const weights = document.getElementById("walletGuardianWeights").value;
        return { guardians: guardians.split(","), threshold, weights: weights.split(",") };
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
        const { name } = fetchWalletInputs();
        const account = (await web3.eth.getAccounts())[0];
        const wallet = new web3.eth.Contract(contractCompiled.abi);
        const tx = await wallet.deploy({
            arguments: [[process.env.REACT_APP_SINGLETONE_TX_MANAGER_SERVICE, process.env.REACT_APP_SINGLETON_SECURITY_SERVICE], name],
            data: contractCompiled.bytecode.object
        }).send({ from: account });
        return tx.options.address;
    }
    const addGuardians = async () => {
        const web3 = await fetchWeb3();
        const account = (await web3.eth.getAccounts())[0];
        const { guardians, threshold, weights } = fetchGuardianInputs();
        const securityService = new web3.eth.Contract(securityServiceCompiled.abi, process.env.REACT_APP_SINGLETON_SECURITY_SERVICE);
        return await securityService.methods.addGuardians(walletAddr, guardians, weights, threshold).send({ from: account });
    }

    const handleCreateWallet = async() => {
        document.getElementById("deployWalletButton").disabled = true;
        const walletAddress = await createWallet();
        console.log(walletAddress);
        setStep(2);
        setWalletAddr(walletAddress);
    }
    const handleAddGuardians = async () => {
        document.getElementById("addGuardiansButton").disabled = true;
        await addGuardians();
        navigateToWalletPage();
    }

    const step1 =
        <>
            <div className="TopBar">
                <div className="InnerTopBarText">Wallet Builder (step 1)</div>
            </div>
            <div className="WalletBuilderWrapper">
                <InputBox inputTitle="Wallet Name" id="walletName" inputPlaceHolder="Business Wallet"/>
                <button className="Deploy" id="deployWalletButton" onClick={handleCreateWallet}>Deploy Wallet</button>
        </div>
    </> 
    
    const step2 =
        <><div className="TopBar">
            <div className="InnerTopBarText">Wallet Builder (step 2)</div>
            </div>
            <div className="WalletBuilderWrapper">
                <InputBox inputTitle={"Guardians"} id="walletGuardians" inputPlaceHolder="0xA87D...,0x90WGs..." />
                <InputBox inputTitle={"Guardian Voting Weights"} id="walletGuardianWeights" inputPlaceHolder="1,2,..." />
                <InputBox inputTitle={"Vote Threshold"} id="walletThreshold" inputPlaceHolder="2" />
                <button className="Deploy" id="addGuardiansButton" onClick={handleAddGuardians}>Add Guardians</button>
        </div>
        </> 
    return (
        <div className="Backdrop CenteredContent">
            {step == 1 ? step1 :
                step == 2 ? step2 :
                    null}
        </div>
    );
}
