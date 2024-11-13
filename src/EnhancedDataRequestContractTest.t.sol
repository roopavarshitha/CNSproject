// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "forge-std/Test.sol";
import "../src/EnhancedDataRequestContract.sol";

contract EnhancedDataRequestContractTest is Test {
    EnhancedDataRequestContract dataRequest;
    
    function setUp() public {
        dataRequest = new EnhancedDataRequestContract();
    }
    
    function testRequestData() public {
        address user = address(0x123);
        string;
        fields[0] = "field1";
        
        dataRequest.requestData(user, fields);
        assertEq(dataRequest.getUserRequests(user).length, 1);
    }
    
    function testApproveRequest() public {
        address user = address(this);
        string;
        fields[0] = "field1";
        
        dataRequest.requestData(user, fields);
        uint256 requestId = dataRequest.getUserRequests(user)[0];
        
        dataRequest.approveRequest(requestId);
        assertEq(uint(dataRequest.getRequestStatus(requestId)), uint(EnhancedDataRequestContract.RequestStatus.Approved));
    }
}
