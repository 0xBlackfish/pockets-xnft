import styled from "@emotion/styled"
import { Box, Flex, Grid, Spacer, Text, VStack } from "@chakra-ui/react"
import { colors } from "@/styles/defaultTheme"
import { useAllFactions, useGetLeaderboard } from "@/hooks/useAllFactions"
import { LeaderboardItem } from "./faction-leaderboard-bar.component"
import { Label } from "../dashboard/personal/personal.styled"
import { SortButton } from "./sort-button.component"
import { useEffect, useState } from "react"
import { Faction } from "@/types/server"
import { Tip } from "../tooltip"
import { usePrizePool } from "@/hooks/useWalletAssets"

export interface FactionScore {
	faction: Faction
	domination: number
	wealth: number
	knowledge: number
}

/**
 * Leaderboard
 * @returns
 */
export const LeaderboardList = () => {
	//const handleFilter = (e: any) => console.info(e);
	const { data: prizePool, isLoading: prizePoolIsLoading } = usePrizePool()
	const { data } = useGetLeaderboard()
	const [factions, setFactions] = useState<FactionScore[]>(
		data?.find((c) => c.condition === "knowledge")?.factions || [],
	)

	useEffect(() => {
		setFactions(data?.find((c) => c.condition == "domination")?.factions || [])
	}, [data])

	const selectTab = (tab: string) => {
		if (tab == "domination") {
			setFactions(data?.find((c) => c.condition == "domination")?.factions || [])
		} else if (tab == "knowledge") {
			setFactions(data?.find((c) => c.condition == "knowledge")?.factions || [])
		} else if (tab == "wealth") {
			setFactions(data?.find((c) => c.condition == "wealth")?.factions || [])
		}
	}

	return (
		<LeaderboardContainer>
			<Flex justifyContent="space-between" alignItems="center">
				<Title>LEADERBOARD</Title>
				<Tip label="For a chance to win this prize, join and participate in a faction!">
					<Text fontSize={"2rem"} fontWeight={700} fontFamily="heading">
						BONK Prize Pool: {prizePool}
					</Text>
				</Tip>
			</Flex>

			<Grid templateColumns="2fr 3fr" display={{ base: "none", sm: "grid" }}>
				<Spacer />
				<Flex justifyContent="space-between" my="1.5rem" opacity="0.5">
					<Tip
						label={`Domination is how many battles a faction's citizens have collectively won together.`}
						placement="top"
					>
						<Label
							onClick={() => {
								selectTab("domination")
							}}
						>
							Domination
						</Label>
					</Tip>

					<Tip
						label={`Wealth is how many resources a faction has burned.`}
						placement="top"
					>
						<Label
							onClick={() => {
								selectTab("wealth")
							}}
						>
							Wealth
						</Label>
					</Tip>

					<Tip
						label={`Knowledge is the total skill level of all the faction's citizens added together.`}
						placement="top"
					>
						<Label
							onClick={() => {
								selectTab("knowledge")
							}}
						>
							Knowledge
						</Label>
					</Tip>
				</Flex>
			</Grid>
			<VStack align="start" spacing={5} overflowY="auto" h="100%" w="100%">
				{factions?.map((faction) => (
					<LeaderboardItem
						key={faction.faction.id}
						rank={faction.faction.townhallLevel}
						name={faction.faction.name}
						imageUrl={faction.faction.image}
						stats={{
							knowledge: faction.knowledge,
							domWins: faction.domination,
							wealth: faction.wealth,
						}}
					/>
				))}
			</VStack>
		</LeaderboardContainer>
	)
}

export const LeaderboardContainer = styled(Box)`
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	padding: 3rem;
	width: 100%;
	border-radius: 0.5rem;
	background-color: ${colors.brand.primary};
`

const Title = styled(Text)`
	text-transform: uppercase;
	font-size: 3rem;
	font-weight: 800;
	font-spacing: 3px;
	margin-bottom: 3px;
`
