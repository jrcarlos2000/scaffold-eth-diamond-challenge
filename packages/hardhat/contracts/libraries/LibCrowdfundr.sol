pragma solidity ^0.8.0;

library LibCrowdfundr {
    bytes32 constant CROWDFUNDR_STORAGE_POSITION = keccak256("diamond.standard.crowdfundr.storage");
    struct FacetAddressAndSelectorPosition {
        address facetAddress;
        uint16 selectorPosition;
    }

    struct CrowdfundrStorage {
        uint256 targetAmount;
    }

    function getStorage() internal pure returns (CrowdfundrStorage storage st){
        bytes32 position = CROWDFUNDR_STORAGE_POSITION;
        assembly {
            st.slot := position
        }
    }

}
