import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getSelectors, FacetCutAction, getDiamond } from "../utils/helpers";
/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const dDiamondInit = await deploy("CrowdfundrDiamondInit", {
    from: deployer,
    log: true,
    autoMine: true,
  });
  const cDiamondInit = await hre.ethers.getContractAt(`CrowdfundrDiamondInit`, dDiamondInit.address);

  const FacetNames = ["DiamondCutFacet", "DiamondLoupeFacet", "OwnershipFacet"];

  const facetCuts = [];
  for (const FacetName of FacetNames) {
    const dFacet = await deploy(FacetName, {
      from: deployer,
      log: true,
      autoMine: true,
    });
    const cFacet = await hre.ethers.getContractAt(FacetName, dFacet.address);
    facetCuts.push({
      facetAddress: cFacet.address,
      action: FacetCutAction.Add,
      functionSelectors: getSelectors(cFacet),
    });
  }

  // init function call for the DiamondInit ().

  // TODO  : modify if your init is diff
  const functionCall = cDiamondInit.interface.encodeFunctionData("init");
  // Setting arguments that will be used in the diamond constructor
  const diamondArgs = {
    owner: deployer,
    init: cDiamondInit.address,
    initCalldata: functionCall,
  };
  // deploy Diamond
  await deploy("CrowdfundrDiamond", {
    from: deployer,
    log: true,
    autoMine: true,
    args: [facetCuts, diamondArgs],
  });

  const cDiamond = await getDiamond(["DiamondCutFacet", "OwnershipFacet", "DiamondLoupeFacet"], hre);
  console.log(cDiamond);

  // TODO : Add new facets

  const facetsToAdd = ["MainFacet"];

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
};

export default deployContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployContract.tags = ["CrowdfundrDiamond"];
