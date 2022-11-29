import "styles/homeContent.css";

export const HomeContent = () => {
    const navigateToWalletBuilderPage = () => {
        window.location.href = "/create-wallet";
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
                <button className="enter" to="create-wallet" onClick={navigateToWalletBuilderPage}>Enter</button>
            </div>
            </div>
        </div>
    );
}
    