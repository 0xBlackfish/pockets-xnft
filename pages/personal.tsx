import Head from "next/head";
import { NavBar } from "@/components/nav";
import {
  DashboardBox
} from "@/components/dashboard";
import { useEffect, useState } from "react";
import { useAssets } from "@/hooks/useAssets";
import { Character } from "@/types/server";
import { timeout } from "@/lib/utils";
import { DashboardMenuContainer, DashboardInfoContainer} from "@/components/Containers.styled";

export default function Personal() {
  const {
    data: allAssetData,
    isLoading: allAssetDataIsLoading,
    refetch,
  } = useAssets();

  useEffect(() => {
  }, []);


  return (
    <>
      <Head>
        <title>Pocket.gg</title>
        <meta name="description" content="Idle-RPG with your NFTs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <DashboardMenuContainer>
      </DashboardMenuContainer>
      <DashboardInfoContainer>
      </DashboardInfoContainer>
    </>
  );
}