import Head from "next/head"
import styled from "@emotion/styled"
import { NavBar } from "@/components/nav"
import {
	DashboardInfo,
	DashboardMenu,
	CharacterList,
} from "@/components/dashboard"
import { useAssets } from "@/hooks/useCharacters"
import {
	DashboardMenuContainer,
	DashboardInfoContainer,
	DashboardContainer,
	SectionContainer,
} from "@/components/layout/containers.styled"
import { Box, Grid, useDisclosure } from "@chakra-ui/react"
import { useSolana } from "@/hooks/useSolana"
import { FactionModal } from "@/components/dashboard/faction/join-faction-modal"
import { useEffect, useState } from "react"
import { useSelectedCharacter } from "@/hooks/useSelectedCharacter"
import { ConsumeSkillModal } from "@/components/dashboard/character/tabs/skills-tab/consume-skill-modal"
import { PleaseSignInContainer } from "@/components/no-wallet.component"
import { CharacterTabs } from "@/components/dashboard/character/tabs"
import { useAllFactions } from "@/hooks/useAllFactions"
import { useRouter } from "next/router"

export default function CharacterPage() {
	const { query } = useRouter()
	const { data: allAssetData, isLoading: allAssetDataIsLoading } = useAssets()
	const { walletAddress } = useSolana()
	const joinFactionDisclosure = useDisclosure()
	const consumeResourceDisclosure = useDisclosure()
	const [_, setIsInFaction] = useState(false)
	const [selectedCharacter, setSelectedCharacter] = useSelectedCharacter()
	const [selectedSkill, setSelectedSkill] = useState<string>("")
	const { data: factionData } = useAllFactions()
	const allFactions = factionData?.factions

	useEffect(() => {
		setIsInFaction(!!selectedCharacter?.faction)
	}, [selectedCharacter])

	const selectSkill = (skill: string) => {
		setSelectedSkill(skill)
		consumeResourceDisclosure.onOpen()
	}

	return (
		<>
			<Head>
				<title>Pockets</title>
				<meta name="description" content="Idle-RPG with your NFTs" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<NavBar />
			<Grid placeItems="center" minH="50vh">
				{query?.wallet ? (
					<>
						<DashboardContainer>
							<DashboardInfoContainer>
								<DashboardInfo />
							</DashboardInfoContainer>
							<DashboardMenuContainer>
								<DashboardMenu />
							</DashboardMenuContainer>
							<FactionSection>
								<CharacterList
									data={allAssetData?.characters}
									isLoading={allAssetDataIsLoading}
									selectedCharacter={selectedCharacter}
									setSelectedCharacter={setSelectedCharacter}
								/>
								<SectionContainer>
									<CharacterTabs
										currentCharacter={allAssetData?.characters?.find(
											(e) => e.mint === selectedCharacter?.mint,
										)}
										allFactions={allFactions}
										selectSkill={selectSkill}
									/>
								</SectionContainer>
							</FactionSection>
						</DashboardContainer>
						<FactionModal
							setFactionStatus={() => {}}
							character={selectedCharacter!}
							{...joinFactionDisclosure}
						/>
					</>
				) : (
					<PleaseSignInContainer />
				)}
			</Grid>
			<ConsumeSkillModal skill={selectedSkill} {...consumeResourceDisclosure} />
		</>
	)
}

const FactionSection = styled(Box)`
	margin: 0 auto;
	display: flex;
	flex-direction: row;
`
