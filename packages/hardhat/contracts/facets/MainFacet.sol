pragma solidity ^0.8.0;
import "../libraries/LibCrowdfundr.sol";
import "../libraries/LibDiamond.sol";

contract MainFacet {
  function contribute() external payable {
    LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
    // TODO : add check for minimun amout
    // HINT : take a look at LibCrowdfundr
    LibCrowdfundr._enforceMinAmount(msg.value); // comment out

    // TODO : update the contribution amount per user
    ds.contributionAmount += msg.value;
    ds.contributionPerUser[msg.sender] += msg.value;
  }

  function claim() external {
    LibDiamond.enforceIsContractOwner();
    bool hasReached = LibCrowdfundr._goalHasBeenReached();
    require(hasReached, "Main: goal hasnt been reached or set");
    payable(msg.sender).transfer(address(this).balance);
  }
}
