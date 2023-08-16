import { useEffect, useState } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { colors } from "@/styles/defaultTheme";
import { useSolana } from "@/hooks/useSolana";
import { useCreateFaction } from "@/hooks/useCreateFaction";
import { CreateFaction } from "./createfaction.component";
import Confetti from "@/components/Confetti";
import { timeout } from "@/lib/utils";

export const Faction = () => {
  const [confetti, setConfetti] = useState(false);
  const fireConfetti = async () => {
    if (confetti) return;
    setConfetti(true);
    await timeout(3600);
    setConfetti(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Text
        mt="2rem"
        textAlign="center"
        fontSize="24px"
        fontWeight="800"
        maxWidth="50rem"
        letterSpacing="1px"
      >
        AW SHUCKS ANON, YOU’RE NOT IN A FACTION!
      </Text>
      <Button
        cursor="pointer"
        mt="3rem"
        bg={colors.brand.tertiary}
        borderRadius="0.5rem"
        p="1rem"
        width="40rem"
        fontSize="2rem"
        fontWeight={600}
        letterSpacing="1px"
        onClick={() => {}}
      >
        Join a Faction
      </Button>
      <CreateFaction fire={fireConfetti} />
      {confetti && <Confetti canFire={confetti} />}
    </Box>
  );
};
