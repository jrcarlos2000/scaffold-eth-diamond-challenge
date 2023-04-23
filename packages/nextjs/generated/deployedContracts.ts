const contracts = {
  31337: [
    {
      name: "localhost",
      chainId: "31337",
      contracts: {
        CrowdfundrDiamondInit: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [],
              name: "init",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        DiamondCutFacet: {
          address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
          abi: [
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "_selector",
                  type: "bytes4",
                },
              ],
              name: "CannotAddFunctionToDiamondThatAlreadyExists",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes4[]",
                  name: "_selectors",
                  type: "bytes4[]",
                },
              ],
              name: "CannotAddSelectorsToZeroAddress",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "_selector",
                  type: "bytes4",
                },
              ],
              name: "CannotRemoveFunctionThatDoesNotExist",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "_selector",
                  type: "bytes4",
                },
              ],
              name: "CannotRemoveImmutableFunction",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "_selector",
                  type: "bytes4",
                },
              ],
              name: "CannotReplaceFunctionThatDoesNotExists",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "_selector",
                  type: "bytes4",
                },
              ],
              name: "CannotReplaceFunctionWithTheSameFunctionFromTheSameFacet",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes4[]",
                  name: "_selectors",
                  type: "bytes4[]",
                },
              ],
              name: "CannotReplaceFunctionsFromFacetWithZeroAddress",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "_selector",
                  type: "bytes4",
                },
              ],
              name: "CannotReplaceImmutableFunction",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint8",
                  name: "_action",
                  type: "uint8",
                },
              ],
              name: "IncorrectFacetCutAction",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_initializationContractAddress",
                  type: "address",
                },
                {
                  internalType: "bytes",
                  name: "_calldata",
                  type: "bytes",
                },
              ],
              name: "InitializationFunctionReverted",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_contractAddress",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "_message",
                  type: "string",
                },
              ],
              name: "NoBytecodeAtAddress",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_facetAddress",
                  type: "address",
                },
              ],
              name: "NoSelectorsProvidedForFacetForCut",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_contractOwner",
                  type: "address",
                },
              ],
              name: "NotContractOwner",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_facetAddress",
                  type: "address",
                },
              ],
              name: "RemoveFacetAddressMustBeZeroAddress",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "facetAddress",
                      type: "address",
                    },
                    {
                      internalType: "enum IDiamond.FacetCutAction",
                      name: "action",
                      type: "uint8",
                    },
                    {
                      internalType: "bytes4[]",
                      name: "functionSelectors",
                      type: "bytes4[]",
                    },
                  ],
                  indexed: false,
                  internalType: "struct IDiamond.FacetCut[]",
                  name: "_diamondCut",
                  type: "tuple[]",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "_init",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "bytes",
                  name: "_calldata",
                  type: "bytes",
                },
              ],
              name: "DiamondCut",
              type: "event",
            },
            {
              inputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "facetAddress",
                      type: "address",
                    },
                    {
                      internalType: "enum IDiamond.FacetCutAction",
                      name: "action",
                      type: "uint8",
                    },
                    {
                      internalType: "bytes4[]",
                      name: "functionSelectors",
                      type: "bytes4[]",
                    },
                  ],
                  internalType: "struct IDiamond.FacetCut[]",
                  name: "_diamondCut",
                  type: "tuple[]",
                },
                {
                  internalType: "address",
                  name: "_init",
                  type: "address",
                },
                {
                  internalType: "bytes",
                  name: "_calldata",
                  type: "bytes",
                },
              ],
              name: "diamondCut",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        DiamondLoupeFacet: {
          address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
          abi: [
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "_functionSelector",
                  type: "bytes4",
                },
              ],
              name: "facetAddress",
              outputs: [
                {
                  internalType: "address",
                  name: "facetAddress_",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "facetAddresses",
              outputs: [
                {
                  internalType: "address[]",
                  name: "facetAddresses_",
                  type: "address[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_facet",
                  type: "address",
                },
              ],
              name: "facetFunctionSelectors",
              outputs: [
                {
                  internalType: "bytes4[]",
                  name: "_facetFunctionSelectors",
                  type: "bytes4[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "facets",
              outputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "facetAddress",
                      type: "address",
                    },
                    {
                      internalType: "bytes4[]",
                      name: "functionSelectors",
                      type: "bytes4[]",
                    },
                  ],
                  internalType: "struct IDiamondLoupe.Facet[]",
                  name: "facets_",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "_interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        OwnershipFacet: {
          address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_contractOwner",
                  type: "address",
                },
              ],
              name: "NotContractOwner",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "owner_",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        CrowdfundrDiamond: {
          address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
          abi: [
            {
              inputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "facetAddress",
                      type: "address",
                    },
                    {
                      internalType: "enum IDiamond.FacetCutAction",
                      name: "action",
                      type: "uint8",
                    },
                    {
                      internalType: "bytes4[]",
                      name: "functionSelectors",
                      type: "bytes4[]",
                    },
                  ],
                  internalType: "struct IDiamond.FacetCut[]",
                  name: "_diamondCut",
                  type: "tuple[]",
                },
                {
                  components: [
                    {
                      internalType: "address",
                      name: "owner",
                      type: "address",
                    },
                    {
                      internalType: "address",
                      name: "init",
                      type: "address",
                    },
                    {
                      internalType: "bytes",
                      name: "initCalldata",
                      type: "bytes",
                    },
                  ],
                  internalType: "struct DiamondArgs",
                  name: "_args",
                  type: "tuple",
                },
              ],
              stateMutability: "payable",
              type: "constructor",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "_selector",
                  type: "bytes4",
                },
              ],
              name: "CannotAddFunctionToDiamondThatAlreadyExists",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes4[]",
                  name: "_selectors",
                  type: "bytes4[]",
                },
              ],
              name: "CannotAddSelectorsToZeroAddress",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "_selector",
                  type: "bytes4",
                },
              ],
              name: "CannotRemoveFunctionThatDoesNotExist",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "_selector",
                  type: "bytes4",
                },
              ],
              name: "CannotRemoveImmutableFunction",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "_selector",
                  type: "bytes4",
                },
              ],
              name: "CannotReplaceFunctionThatDoesNotExists",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "_selector",
                  type: "bytes4",
                },
              ],
              name: "CannotReplaceFunctionWithTheSameFunctionFromTheSameFacet",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes4[]",
                  name: "_selectors",
                  type: "bytes4[]",
                },
              ],
              name: "CannotReplaceFunctionsFromFacetWithZeroAddress",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "_selector",
                  type: "bytes4",
                },
              ],
              name: "CannotReplaceImmutableFunction",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "_functionSelector",
                  type: "bytes4",
                },
              ],
              name: "FunctionNotFound",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint8",
                  name: "_action",
                  type: "uint8",
                },
              ],
              name: "IncorrectFacetCutAction",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_initializationContractAddress",
                  type: "address",
                },
                {
                  internalType: "bytes",
                  name: "_calldata",
                  type: "bytes",
                },
              ],
              name: "InitializationFunctionReverted",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_contractAddress",
                  type: "address",
                },
                {
                  internalType: "string",
                  name: "_message",
                  type: "string",
                },
              ],
              name: "NoBytecodeAtAddress",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_facetAddress",
                  type: "address",
                },
              ],
              name: "NoSelectorsProvidedForFacetForCut",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_facetAddress",
                  type: "address",
                },
              ],
              name: "RemoveFacetAddressMustBeZeroAddress",
              type: "error",
            },
            {
              stateMutability: "payable",
              type: "fallback",
            },
            {
              stateMutability: "payable",
              type: "receive",
            },
          ],
        },
        MainFacet: {
          address: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_user",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_contractOwner",
                  type: "address",
                },
              ],
              name: "NotContractOwner",
              type: "error",
            },
            {
              inputs: [],
              name: "claim",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "contribute",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
