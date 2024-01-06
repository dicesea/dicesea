import { Seo } from "@/components/seo";
import Layout from "@/components/layout";
import Frame from "@/components/Frame";
import { useEffect } from "react";
import { NetworkStatus, useQuery } from "@apollo/client";
import Network from "@/components/network";
import { Progress } from "@/components/progress";
import Error from "@/components/error";
import { GET_APPROVED_RECORDS } from "@/querys/graphql";
import { IRecord } from "@/interfaces";
import Card from "@/components/card";
import { getLocalStorage } from "@/methods/features/marketplaceSlice";
import { useAppDispatch, useAppSelector } from "@/methods/app/hooks";

export default function Home() {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state: any) => state.marketplace);

  useEffect(() => {
    const initializeApp = async () => {
      await dispatch(getLocalStorage());

      // if (!user.did) {
      //   toggleModal();
      // }
    };

    initializeApp();
  }, [dispatch, isLoading, user]);

  // Use the useQuery hook to fetch data
  const { loading, error, data, refetch, networkStatus } =
    useQuery(GET_APPROVED_RECORDS);

  useEffect(() => {
    if (networkStatus === NetworkStatus.refetch) {
      refetch();
    }
  }, [networkStatus, refetch]);

  if (networkStatus === NetworkStatus.refetch) {
    return <Network refetch={refetch} />;
  }

  if (loading) {
    return <Progress />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  const records = data.getApprovedRecords;

  const filteredArtRecords = records.filter(
    (record: IRecord) => record.category === "ART"
  );
  const filteredMusicRecords = records.filter(
    (record: IRecord) => record.category === "MUSIC"
  );
  const filteredBookRecords = records.filter(
    (record: IRecord) => record.category === "BOOK"
  );
  return (
    <Layout>
      <Seo
        title="DiceSea, the online marketplace for everyone"
        description="DiceSea is an online marketplace for everyone."
      />
      <Frame videoId="ELqDZKsmQhk" />
      <Card records={filteredArtRecords} title="Art Category" route="asset" />
      <Card
        records={filteredMusicRecords}
        title="Music Category"
        route="asset"
      />
      <Card records={filteredBookRecords} title="Book Category" route="asset" />
    </Layout>
  );
}
