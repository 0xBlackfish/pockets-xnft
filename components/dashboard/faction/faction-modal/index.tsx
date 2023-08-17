import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Input,
  Flex,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { GiMagnifyingGlass } from "react-icons/gi";
import styled from "@emotion/styled";
import { colors } from "@/styles/defaultTheme";
import { FactionBox } from "./faction-item.component";
import { Character, Faction } from "@/types/server";
import { useFetchAllFactions } from "@/hooks/useFetchAllFactions";

interface FactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  character?: Character | null;
}

export const FactionModal: FC<FactionModalProps> = ({
  onClose,
  isOpen,
  character,
}) => {


  const [factionsList, setFactionsList] = useState<Faction[]>([])
  const { data } = useFetchAllFactions();
  const [factionsList, setFactionsList] = useState<Faction[]>([])

  useEffect(() => {
    if (data?.total) {
      setFactionsList(data?.factions);
    }
  }, [data, setFactionsList]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        p="1rem"
        minW={{ base: "95%", sm: "600px" }}
        minH="600px"
        maxH="800px"
        bg="blacks.500"
        color="brand.secondary"
        borderRadius="1rem"
        overflow="auto"
      >
        <ModalBody>
          <Flex
            mt="1rem"
            bg="brand.primary"
            borderRadius="1rem"
            alignItems="center"
          >
            <SearchBar
              placeholder="faction"
              _focus={{
                outline: "none",
              }}
            />
            <GiMagnifyingGlass
              fontSize="3rem"
              style={{ marginRight: "2rem" }}
            />
          </Flex>
          <Flex direction="column" mt="2rem" gap="2rem">
            {factionsList?.map((faction, i) => (
              <FactionBox key={i + "faction"} onClose={onClose} faction={faction} characterMint={character?.mint} />
            ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const SearchBar = styled(Input)`
  color: ${colors.brand.tertiary};
  background-color: inherit;
  border-radius: inherit;
  padding: 2rem;
  width: 100%;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 3px;

  :focus: {
    outline: none;
  }
`;

