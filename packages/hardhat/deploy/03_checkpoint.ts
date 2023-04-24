import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getSelectors, FacetCutAction, getDiamond, ONE_ETHER } from "../utils/helpers";
import "dotenv";

const deployContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // TODO : Remove following line
  return;

  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  let cDiamond = await getDiamond(["DiamondCutFacet", "OwnershipFacet", "DiamondLoupeFacet"]);

  // TODO : Add new facets

  const facetsToAdd = ["ConfigFacet"];

  for (const facet of facetsToAdd) {
    await deploy(facet, {
      from: deployer,
      log: true,
      autoMine: true,
    });
    const cFacet = await hre.ethers.getContract(facet);
    const selectors = getSelectors(cFacet); // selectors of this facet
    const tx = await cDiamond.diamondCut(
      [
        {
          facetAddress: cFacet.address,
          action: FacetCutAction.Add,
          functionSelectors: selectors,
        },
      ],
      hre.ethers.constants.AddressZero,
      "0x",
      { gasLimit: 800000 },
    );
    await tx.wait();
  }
  cDiamond = await getDiamond([
    "DiamondCutFacet",
    "OwnershipFacet",
    "DiamondLoupeFacet",
    "WithdrawFacet",
    "ConfigFacet",
  ]);

  // TODO : Set the goal amount to 10 ETH
  const tx = await cDiamond.setGoalAmount(ONE_ETHER.mul(10));
  await tx.wait();
};

export default deployContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployContract.tags = ["CrowdfundrDiamond"];
