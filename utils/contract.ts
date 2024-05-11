import { getContract } from "thirdweb";
import { client } from "@/app/client";
import { chain } from "@/app/chain";
import { contractABI } from "./contractABI";

const contractAddress = "0x2DB3F0ba195D857FE3361a42977E3f3e28Bf8197";

export const contract = getContract({
  client: client,
  chain: chain,
  address: contractAddress,
  abi: contractABI,
});
