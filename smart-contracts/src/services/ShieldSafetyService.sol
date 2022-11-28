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

    struct GuardianDetails {
        uint256 dateAdded;
        uint256 votingWeight; // Additional voting weight given to the guardian. Default = 0, 1 means the guardian's vote counts twice for a recovery against other guardians.
    }

    struct Guardians {
        // address represents the wallet of the guardian and maps to its details
        mapping(address => GuardianDetails) guardian;
        uint256 totalGuardians;
    }

    // wallet address => guardians  (ex. guardians[wallet].guardian[_guardianWallet].additionalVotingWeight = 1)
    mapping(address => Guardians) internal guardians;

    modifier onlyGuardian(address _wallet) {
        require(isGuardian(_wallet, msg.sender), "Must be a guardian");
        _;
    }

    function isGuardian(address _wallet, address _addr) public view returns (bool) {
        return guardians[_wallet].guardian[_addr].votingWeight > 0;
    }
    
    function lockWallet(address _wallet) external onlyWalletOwnerOrSelf(_wallet) onlyWhenUnlocked(_wallet) {
        IWallet(_wallet).lock(true);
    }

    function unlock(address _wallet) external onlyWalletOwnerOrSelf(_wallet) onlyWhenLocked(_wallet) {
        IWallet(_wallet).lock(false);
    }

    function totalGuardians(address _wallet) public view returns (uint256) {
        return guardians[_wallet].totalGuardians;
    }

    function addGuardian(address _wallet, address _guardian, uint256 _weight) external onlyWalletOwnerOrSelf(_wallet) {
        require(!isGuardian(_wallet, _guardian), "Guardian already added");
        require(_weight > 0, "Weight must be greater than 0");
        guardians[_wallet].guardian[_guardian].dateAdded = block.timestamp;
        guardians[_wallet].guardian[_guardian].votingWeight = _weight;
        guardians[_wallet].totalGuardians++;
    }

    function adjustGuardianWeight(address _wallet, address _guardian, uint256 _newWeight) external onlyWalletOwnerOrSelf(_wallet) {
        require(isGuardian(_wallet, _guardian), "Guardian not added");
        require(_newWeight > 0, "Weight must be greater than 0");
        guardians[_wallet].guardian[_guardian].votingWeight = _newWeight;
    }

    function removeGuardian(address _wallet, address _guardian) external onlyWalletOwnerOrSelf(_wallet) {
        require(isGuardian(_wallet, _guardian), "Guardian not added");
        delete guardians[_wallet].guardian[_guardian];
        guardians[_wallet].totalGuardians--;
    }

    /**
    * @notice Each 65 bytes is a guardian signature. 
    */ 
    function guardianRecover(address _wallet, address _newOwner, bytes memory signatures) external onlyGuardian(_wallet) {
        require(totalGuardians(_wallet) > 0, "No guardians");
    }
}