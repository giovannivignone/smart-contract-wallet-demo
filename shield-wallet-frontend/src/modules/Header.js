import "styles/header.css";

export const Header = () => {
    return (
        <div className="header-wrapper">
            <h1>Coin Master</h1>
            <ul id="unol">
                <a href="/create-wallet"><li>Wallet Builder</li></a>
                <a href="/wallets"><li>Wallets</li></a>
                {/* <a href="/"><li>About</li></a>
                <a href="/"><li>Team</li></a> */}
                <a href="/"><li>Home</li></a>
            </ul>
        </div>
    )
}