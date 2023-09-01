import { FC, useState } from "react"

import { COMBAT_SKILLS, Character, NFT } from "@/types/server"
import { AddIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react"
import { IconSkill } from "@/components/icons"
import { colors } from "@/styles/defaultTheme"

export const Units: FC<{
	character: Character
	units: NFT[]
	handleEquipUnit: (unit: NFT) => void
	loadingUnitEquip: boolean
	combatSkillLevels: { skill: string; level: number }[]
	selectedSkill: string
	setSelectedSkill: (skill: string) => void
}> = ({
	character,
	units,
	handleEquipUnit,
	loadingUnitEquip,
	combatSkillLevels,
	selectedSkill,
	setSelectedSkill,
}) => {
	const filteredUnits =
		units.filter(
			(unit) =>
				String(unit.attributes.Skill).toLocaleUpperCase() ===
					selectedSkill.toUpperCase() || !selectedSkill.length,
		) || []
	return (
		<Box>
			<Flex flexDirection="row" overflow="auto" mb="2rem">
				{Object.keys(IconSkill).map((skill, index) => {
					if (
						COMBAT_SKILLS.find(
							(combatSkill) =>
								combatSkill.toUpperCase() === skill.toUpperCase(),
						)
					) {
						const Icon = Object.values(IconSkill)[index]
						const name = skill.charAt(0).toUpperCase() + skill.substring(1)
						return (
							<Flex
								onClick={() =>
									selectedSkill === skill
										? setSelectedSkill("")
										: setSelectedSkill(skill)
								}
								m="0 0.5rem"
								flexDir="row"
								borderRadius="0.5rem"
								p="1.5rem"
								flex="1 1 auto"
								bg={
									selectedSkill === skill
										? colors.brand.quaternary
										: colors.blacks[500]
								}
								color={
									selectedSkill === skill
										? colors.blacks[700]
										: colors.brand.secondary
								}
								_last={{ marginRight: 0 }}
								_first={{ marginLeft: 0 }}
								cursor="pointer"
								transition="all 0.1s ease"
								_hover={{
									bg:
										selectedSkill === skill
											? colors.brand.quaternary
											: colors.blacks[600],
								}}
								alignItems="center"
							>
								<Icon
									style={{
										fontSize: "2rem",
									}}
								/>
								<Text
									ml="1rem"
									textTransform="uppercase"
									fontWeight="600"
									fontSize="1.25rem"
								>
									{name}
								</Text>
							</Flex>
						)
					}
				})}
			</Flex>
			<Box overflow="auto">
				{filteredUnits.length ? (
					filteredUnits.map((unit) => {
						return (
							<Flex
								bgColor="blacks.500"
								p="1.5rem"
								borderRadius="0.5rem"
								key={unit.mint}
								flexDirection="row"
								alignItems="center"
								justifyContent="space-between"
								mb="2rem"
								_last={{ mb: 0 }}
							>
								<Flex
									bgColor="brand.tertiary"
									borderRadius="0.5rem"
									aspectRatio="1"
									w="12rem"
									h="12rem"
									p="1rem"
									bgImage={unit.image_uri}
									bgSize="cover"
									bgPos="center"
								>
									<Flex
										backgroundColor="rgba(0,0,0,0.5)"
										minW="2.75rem"
										p="0 0.25rem"
										height="2.75rem"
										borderRadius="0.25rem"
										justifyContent="center"
										alignItems="center"
									>
										<Text
											fontSize="1.75rem"
											fontWeight="700"
											display="block"
											textAlign="center"
											alignSelf="center"
											color="brand.secondary"
										>
											{unit.attributes.Rank}
										</Text>
									</Flex>
								</Flex>
								<Flex flexDirection="column" flex="1 1 auto" pl="2rem">
									<Flex
										flexDirection="row"
										justifyContent="space-between"
										alignItems="flex-start"
									>
										<Box>
											<Text
												fontWeight="600"
												fontSize="1.5rem"
												lineHeight="1.5rem"
												color="brand.tertiary"
												textTransform="uppercase"
											>
												Name
											</Text>
											<Text
												pt="0.5rem"
												fontWeight="600"
												fontSize="1.75rem"
												lineHeight="1.75rem"
											>
												{unit.name}
											</Text>
										</Box>
										<Flex
											flexDirection="row"
											flex="1 1 auto"
											alignSelf="center"
											alignContent="center"
											justifyContent="flex-end"
										>
											{Object.keys(IconSkill).map((skill, index) => {
												const unitSkill = String(
													unit.attributes.Skill,
												).toUpperCase()
												if (unitSkill === skill.toUpperCase()) {
													const Icon = Object.values(IconSkill)[index]
													return (
														<Flex
															p="0.625rem"
															bgColor="white.700"
															borderRadius="0.5rem"
														>
															<Icon
																style={{ color: "white", fontSize: "2.5rem" }}
															/>{" "}
														</Flex>
													)
												}
											})}
										</Flex>
									</Flex>
									<Flex flexDirection="row" w="100%" pt="2rem">
										<Flex flexDirection="column" pr="4rem">
											<Text
												fontWeight="600"
												fontSize="1.5rem"
												lineHeight="1.5rem"
												color="brand.tertiary"
												textTransform="uppercase"
											>
												Bonus 1
											</Text>
											<Text
												pt="0.5rem"
												fontWeight="600"
												fontSize="1.75rem"
												lineHeight="1.75rem"
											>
												{Object.keys(unit.attributes)[0]}
												{" +"}
												{unit.attributes[Object.keys(unit.attributes)[0]]}
											</Text>
										</Flex>
										<Flex flexDirection="column" pr="4rem">
											<Text
												fontWeight="600"
												fontSize="1.5rem"
												lineHeight="1.5rem"
												color="brand.tertiary"
												textTransform="uppercase"
											>
												Bonus 2
											</Text>
											<Text
												pt="0.5rem"
												fontWeight="600"
												fontSize="1.75rem"
												lineHeight="1.75rem"
											>
												{Object.keys(unit.attributes)[1]}
												{" +"}
												{unit.attributes[Object.keys(unit.attributes)[1]]}
											</Text>
										</Flex>
										<Flex
											flexDirection="row"
											flex="1 1 auto"
											alignSelf="center"
											alignContent="center"
											justifyContent="flex-end"
										>
											<Button
												bgColor="blacks.700"
												borderRadius="0.5rem"
												p="1.25rem"
												fontSize="1.5rem"
												lineHeight="1.5rem"
												fontWeight="600"
												onClick={
													loadingUnitEquip
														? () => {}
														: () => handleEquipUnit(unit)
												}
												opacity={loadingUnitEquip ? 0.5 : 1}
												cursor={loadingUnitEquip ? "not-allowed" : "cursor"}
											>
												{loadingUnitEquip ? <Spinner /> : <AddIcon />}
												<Box w="1rem" />
												Equip Unit
											</Button>
										</Flex>
									</Flex>
								</Flex>
							</Flex>
						)
					})
				) : (
					<Box
						bgColor="blacks.500"
						p="2rem"
						borderRadius="0.5rem"
						fontSize="1.5rem"
						lineHeight="1.5rem"
						fontWeight="600"
						color="brand.tertiary"
						textAlign="center"
						width="100%"
						textTransform="uppercase"
					>
						<Text opacity="0.5">
							{selectedSkill.length
								? `No ${selectedSkill} units available`
								: "No Units Available"}
						</Text>
					</Box>
				)}
			</Box>
		</Box>
	)
}