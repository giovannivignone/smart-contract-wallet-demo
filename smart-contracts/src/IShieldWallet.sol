// SPDX-License-Identifier: MIT only

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Ownable.sol";

interface IWallet is Ownable {

    function services() external view returns (uint);

    function transferOwner(address _newOwner) external;

    function authorised(address _service) external view returns (bool);

    function enabled(bytes4 _sig) external view returns (address);

    function authorizeService(address _service, bool _value) external;

    function enableStaticCall(address _module, bytes4 _method) external;

}