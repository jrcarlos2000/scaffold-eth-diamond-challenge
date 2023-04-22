pragma solidity ^0.8.0;
import "../libraries/LibCrowdfundr.sol";
import "../libraries/LibDiamond.sol";

contract MainFacet {
  function contribute() external payable {
    // function only received ether
  }

  function claim() external {
    LibDiamond.enforceIsContractOwner();
    payable(msg.sender).transfer(address(this).balance);
  }
}
