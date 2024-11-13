// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "forge-std/Test.sol";
import "../src/IdentityContract.sol";

contract IdentityContractTest is Test {
    IdentityContract identity;
    
    function setUp() public {
        identity = new IdentityContract();
    }
    
    function testRegisterUser() public {
        string memory ipfsHash = "QmHash";
        string memory userPublicKey = "UserPublicKey";
        
        identity.registerUser(ipfsHash, userPublicKey);
        (uint256 id, address publicKey,, string memory returnedPublicKey,) = identity.getUser(address(this));
        
        assertEq(id, 1);
        assertEq(publicKey, address(this));
        assertEq(returnedPublicKey, userPublicKey);
    }
    
    function testFailDoubleRegister() public {
        string memory ipfsHash = "QmHash";
        string memory userPublicKey = "UserPublicKey";
        identity.registerUser(ipfsHash, userPublicKey);
        identity.registerUser(ipfsHash, userPublicKey);
    }
}
