import { useJoinFaction } from "@/hooks/useJoinFaction";
import { useSolana } from "@/hooks/useSolana";
import { Character, Faction } from "@/types/server";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { FC } from "react";

export const FactionBox: FC<{ onClose: () => void; faction: Faction; characterMint: string }> = ({
  onClose,
  faction,
  characterMint
}) => {
  const {
    connection,
    walletAddress,
    signTransaction,
    buildMemoIx,
    encodeTransaction,
  } = useSolana();

  const { mutate } = useJoinFaction();

  const onSuccess = (data: any) => {
    console.log('Left Faction!');
    onClose();
  };

  const handleJoinFaction = async () => {

    const payload = {
      mint: characterMint,
      timestamp: Date.now().toString(),
      factionId: faction?.id,
    };

    const encodedSignedTx = await encodeTransaction({
      walletAddress,
      connection,
      signTransaction,
      txInstructions: [buildMemoIx({ walletAddress, payload })],
    });

    if (!encodedSignedTx) throw Error("No Tx");
    mutate({ signedTx: encodedSignedTx }, { onSuccess });
  };


  return (
    <>
      <Flex
        bg="brand.primary"
        w="100%"
        h="13rem"
        borderRadius="0.5rem"
        alignItems="center"
        justifyContent="space-between"
        p="2rem"
      >
        <Flex gap="2rem" alignItems="center">
          <Box
            bg="blacks.500"
            h="10rem"
            w="10rem"
            backgroundImage="https://picsum.photos/200"
            backgroundPosition="center"
            backgroundSize="cover"
            borderRadius="0.5rem"
          />
          <Box>
            <Text textTransform="uppercase" fontSize="1.25rem">
              population{" "}
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "2rem",
                  marginLeft: "0.5rem",
                }}
              >
                12
              </span>
            </Text>
            <Text textTransform="uppercase" fontSize="2.5rem" fontWeight={700}>
              Faction Name
            </Text>
            <Text
              color="brand.tertiary"
              letterSpacing="0.25rem"
              textTransform="uppercase"
              fontSize="1.5rem"
              textDecor="underline"
            >
              factionsite.com
            </Text>
          </Box>
        </Flex>
        <Box>
          <Button onClick={handleJoinFaction}>join</Button>
        </Box>
      </Flex>
    </>
  );
};
