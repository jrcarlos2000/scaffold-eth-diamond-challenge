pragma solidity ^0.8.0;

import "../libraries/LibDiamond.sol";
import "../libraries/LibCrowdfundr.sol";
import "../libraries/LibWithdrawFacet.sol";

contract WithdrawFacet {
  function refund() external {
    LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
    uint256 toSend = ds.contributionPerUser[msg.sender];

    // TODO : enforce check for deadline if there is any
    LibWithdrawFacet._enforceDeadlineReached();

    // TODO : enforce goal has not been reached
    bool hasBeenReached = LibCrowdfundr._goalHasBeenReached();
    require(!hasBeenReached, "WithdrawFacet: Cannot withdraw because goal amount has not been reached");
    ds.contributionPerUser[msg.sender] = 0;

    payable(msg.sender).transfer(toSend);
  }

  function claimAmount(uint256 _amount) external {
    LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
    LibWithdrawFacet.WithdrawStorage storage ws = LibWithdrawFacet.getStorage();
    LibDiamond.enforceIsContractOwner();
    require(LibCrowdfundr._goalHasBeenReached(), "WithdrawFacet: goal wasnt reached");
    require(_amount <= ds.contributionAmount - ws.claimedAmount, "Not enough funds to claim");
    require(_amount <= address(this).balance, "Not enough funds in the contract");
    ws.claimedAmount += _amount;
    payable(msg.sender).transfer(_amount);
  }

  function setDeadline(uint256 _buffer) external {
    LibDiamond.enforceIsContractOwner();
    LibWithdrawFacet._setDeadline(_buffer);
  }

  function deadline() external view returns (uint256) {
    return LibWithdrawFacet.getStorage().deadline;
  }

  function deadlineSet() external view returns (bool) {
    return LibWithdrawFacet.getStorage().deadlineSet;
  }
}