import { Seo } from "@/components/seo";
import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/methods/app/hooks";
import { getLocalStorage } from "@/methods/features/marketplaceSlice";
import { shortDid } from "@/utils";
import { GET_OWNER_RECORDS } from "@/querys/graphql";
import { NetworkStatus, useQuery } from "@apollo/client";
import { Progress } from "@/components/progress";
import Error from "@/components/error";
import Network from "@/components/network";
import Card from "@/components/card";
import styled from "styled-components";
import { toast } from "@/components/toast";
import Auth from "@/components/modals/auth";

const Z1syfKXsr2 = styled.section`
  width: 100%;
`;

const G2ERfT5gTR = styled.div`
  background-image: url("/images/banner.svg");
  /* background-size: cover; */
  background-position: center;
  background-repeat: no-repeat;
  height: 450px;
  position: relative;
  overflow: hidden;

  @media (min-width: 414px) {
    border-radius: 0px;
    margin: 80px 0px;
  }

  @media (min-width: 360px) {
    border-radius: 0px;
    margin: 80px 0px;
  }

  @media (min-width: 1280px) {
    border-radius: 30px;
    margin: 100px 30px 0px;
  }

  h5 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 25px;
    font-weight: 600;
    display: flex;
  }
`;

export default function Profile() {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state: any) => state.marketplace);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const initializeApp = async () => {
      await dispatch(getLocalStorage());

      if (!user) {
        toggleModal();
      }
    };

    initializeApp();
  }, [dispatch, isLoading, user]);

  // Use the useQuery hook to fetch data
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_OWNER_RECORDS,
    {
      variables: {
        owner: user?.did || "",
      },
    }
  );

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

  const records = data.getOwnerRecords;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    try {
      toast({
        message: "Copied",
        position: "bottom",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <Seo
        title="Profile | DiceSea"
        description="DiceSea is an online marketplace for everyone."
      />
      <Z1syfKXsr2>
        <G2ERfT5gTR>
          <h5>
            {isLoading
              ? "Loading..."
              : user?.did || ""
              ? shortDid(user?.did || "")
              : "No DID found"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              onClick={() => {
                handleCopy(user?.did || "");
              }}
              style={{
                marginLeft: "5px",
                width: "30px",
                height: "30px",
                cursor: "pointer",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
              />
            </svg>
          </h5>
        </G2ERfT5gTR>
        <div>
          <Card
            records={records}
            title={`${records.length} Records`}
            route="asset"
          />
        </div>
      </Z1syfKXsr2>
      {user ? null : <Auth isOpen={isModalOpen} onClose={toggleModal} />}
    </Layout>
  );
}
