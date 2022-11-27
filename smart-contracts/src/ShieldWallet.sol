pragma solidity ^0.8.0;

import "./IShieldWallet.sol";

contract ShieldWallet is IShield {

    // The authorised services of the Shield Wallet
    mapping(address => bool) public authorised;

    // The number of services initialized in the Shield Wallet
    uint256 public services;

    constructor () {}
    
}