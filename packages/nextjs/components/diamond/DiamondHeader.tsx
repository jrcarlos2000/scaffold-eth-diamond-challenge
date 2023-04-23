import { Address } from "~~/components/scaffold-eth";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";
import { getMainDiamondContract } from "~~/utils/scaffold-eth/contractNames";

/**
 * Site footer
 */
export const DiamondHeader = () => {
  const mainDiamondContractName: ContractName = getMainDiamondContract();
  const { data: deployedContractData, isLoading: deployedContractLoading } =
    useDeployedContractInfo(mainDiamondContractName);

  return (
    <div className="min-h-0 p-5 mb-11 lg:mb-0">
      <div>
        <div className="fixed flex justify-between items-center w-full z-20 p-4 top-15 left-0 pointer-events-none justify-end">
          <div className="flex space-x-2 pointer-events-auto flex-col bg-base-100 px-4 py-4 text-center items-center rounded-3xl">
            <span className="font-bold">{mainDiamondContractName}</span>
            <Address address={deployedContractLoading ? "..." : deployedContractData?.address} />
          </div>
        </div>
      </div>
    </div>
  );
};
