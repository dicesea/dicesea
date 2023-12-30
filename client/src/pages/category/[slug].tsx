import { Seo } from "@/components/seo";
import Layout from "@/components/layout";
import Banner from "@/components/banner";
import Card from "@/components/card";
import { capitalizeFirstLetter } from "@/utils";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IRecord } from "@/interfaces";
import { Progress } from "@/components/progress";
import Network from "@/components/network";
import Error from "@/components/error";
import { NetworkStatus, useQuery } from "@apollo/client";
import { GET_APPROVED_RECORDS } from "@/querys/graphql";
import { upperCase } from "lodash-es";

export default function Slug() {
  const router = useRouter();
  const { slug } = router.query;

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

  const capitalizedSlug =
    typeof slug === "string" ? capitalizeFirstLetter(slug) : "";

  const filteredCollection = records.filter(
    (collection: IRecord) => collection.category === upperCase(slug as string)
  );
  return (
    <Layout>
      <Seo
        title={`Explore ${capitalizedSlug} | DiceSea`}
        description="DiceSea is an online marketplace for everyone."
      />
      <Banner title={capitalizedSlug} backgroundImage="/images/banner.svg" />
      <Card
        records={filteredCollection}
        title={`${capitalizedSlug} Category`}
        route="asset"
      />
    </Layout>
  );
}
