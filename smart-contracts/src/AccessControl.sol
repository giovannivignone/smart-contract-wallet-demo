// SPDX-License-Identifier: MIT only

pragma solidity ^0.8.0;

contract AccessControl {

    // Owner of the contract
    address public owner;

    // Event: Ownership transfer
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor(address _owner) {
        owner = _owner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "AccessControl: Only the owner can call this function");
        _;
    }

    function transferOwner(address _newOwner) public onlyOwner {
        owner = _newOwner;
        emit OwnershipTransferred(msg.sender, _newOwner);
    }
}