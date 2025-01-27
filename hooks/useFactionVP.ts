import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getCitizenPDA, getCitizenAccount, getFactionPDA, getFactionAccount } from "@/lib/solanaClient";
import { Connection, PublicKey } from "@solana/web3.js";
import toast from "react-hot-toast";

export type FactionAccountInfo = {
  unallocatedFactionVP: string;
  maxFactionVP: string;
};

export const useFactionVP = (
  factionId: string,
  connection: Connection
): { data: FactionAccountInfo; isLoading: boolean } => {

  const defaultQueryResult: FactionAccountInfo = {
    unallocatedFactionVP: "NA",
    maxFactionVP: "NA",
  };

  const queryResult = useQuery<FactionAccountInfo, unknown>(
    ["faction-vp", factionId],
    async (): Promise<FactionAccountInfo> => {
      const factionPDA = getFactionPDA(factionId);
      const factionAccount = await getFactionAccount(connection, factionPDA);

      if (!factionAccount) {
        console.error("Failed to fetch faction account");
        return defaultQueryResult;
      }

      return {
        unallocatedFactionVP: factionAccount.unallocatedVotingPower.toString(),
        maxFactionVP: factionAccount.maxVotingPower.toString(),
      };
    },
    {
      enabled: !!factionId && !!connection,
    }
  );

  return {
    data: queryResult.data || defaultQueryResult,
    isLoading: queryResult.isLoading
  };
};

