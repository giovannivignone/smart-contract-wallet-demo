pragma solidity ^0.8.0;

import "./IWallet.sol";
import "

contract BaseShieldWallet is IWallet {

    // The authorised services of the Shield Wallet
    mapping(address => bool) public authorised;

    // The number of services initialized in the Shield Wallet
    uint256 public services;

    // Variable to managing if the wallet is initialised
    bool public initialised; 

    // Owner of the contract
    address public owner;

    // Service executing the next call
    address public staticCallExecutor;

    event ServiceAuthorised(address indexed service);
    event ServiceRevoked(address indexed service);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyService{
        require(authorised[msg.sender], "Not an authorised service");
        _;
    }

    function init(address _owner, address[] calldata _services) external {
        require(!initialised && services == 0, "Wallet already initialised");
        initialised = true;
        services = _services.length;
        for (uint256 i = 0; i < _services.length; i++) {
            this.addService(_services[i]);
        }
        emit OwnershipTransferred(address(0), _owner);
    }

    function addService(address _service) external override onlyService {
        require(!authorised[_service], "Service already added");
        authorised[_service] = true;
        services++;
        emit ServiceAuthorised(_service);
    }

    function revokeService(address _service) external override onlyService {
        require(authorised[_service], "Service not added");
        require(services > 0, "No services to revoke");
        authorised[_service] = false;
        services--;
        emit ServiceRevoked(_service);
    }

    function callEnabled(bytes4 _signature) public view override returns (address) {
        address callExecutor = staticCallExecutor;
        if (callExecutor != address(0) && IService(callExecutor).supportsStaticCall(_signature)) {
            return callExecutor;
        }
        return address(0);
    }

    function transferOwner(address _newOwner) external override onlyService {
        require(_newOwner != address(0), "Invalid address");
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }
}