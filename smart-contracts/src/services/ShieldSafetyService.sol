// SPDX-License-Identifier: MIT only

pragma solidity ^0.8.0;

import "./BaseService.sol";
import "../IWallet.sol";

/**
 * @title ShieldSafetyService
 * @dev Service to manage the security aspects of a CoinMaster Wallet.
 * @notice This is a singleton contract to manage all CoinMaster Wallets based on storage data
*/
abstract contract ShieldSafetyService is BaseService {
    function lockWallet(address _wallet) external onlyWalletOwnerOrSelf(_wallet) onlyWhenUnlocked(_wallet) {
        IWallet(_wallet).lock(true);
    }

    function unlock(address _wallet) external onlyWalletOwnerOrSelf(_wallet) onlyWhenLocked(_wallet) {
        IWallet(_wallet).lock(false);
    }
}