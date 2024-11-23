// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.18;

import "../EnhancedDataRequestContract.sol";
import "../Identity.sol";
import "forge-std/console.sol";

contract DeployContracts {
    EnhancedDataRequestContract public dataRequestContract;
    IdentityContract public identityContract;

    function run() public {
        // Deploy EnhancedDataRequestContract
        dataRequestContract = new EnhancedDataRequestContract();
        console.log("EnhancedDataRequestContract deployed at:", address(dataRequestContract));

        // Deploy IdentityContract
        identityContract = new IdentityContract();
        console.log("IdentityContract deployed at:", address(identityContract));
    }
}
