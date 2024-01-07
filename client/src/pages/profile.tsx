import { Seo } from "@/components/seo";
import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/methods/app/hooks";
import { getLocalStorage } from "@/methods/features/marketplaceSlice";
import { handleCopy, shortDid } from "@/utils";
import { GET_OWNER_RECORDS } from "@/querys/graphql";
import { NetworkStatus, useQuery } from "@apollo/client";
import { Progress } from "@/components/progress";
import Error from "@/components/error";
import Network from "@/components/network";
import Card from "@/components/card";
import styled from "styled-components";
import Auth from "@/components/modals/auth";
import Link from "next/link";

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

  .wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 25px;
    font-weight: 600;
    display: flex;
    cursor: pointer;
    gap: 5px;
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
  }, []);

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
  return (
    <Layout>
      <Seo
        title="Profile | DiceSea"
        description="DiceSea is an online marketplace for everyone."
      />
      <Z1syfKXsr2>
        <G2ERfT5gTR>
          {user ? (
            <div
              className="wrapper"
              onClick={() => {
                handleCopy(user?.did);
              }}
            >
              <h5>{shortDid(user?.did)}</h5>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                style={{
                  width: "25px",
                  height: "25px",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                />
              </svg>
            </div>
          ) : null}
          {user ? (
            <div
              style={{
                display: "flex",
                color: "#fff",
                bottom: 30,
                justifyContent: "space-between",
                alignContent: "center",
                alignItems: "center",
                position: "absolute",
                width: "100%",
              }}
            >
              <h3 style={{ marginLeft: "20px" }}>Hello, {user?.name}</h3>
              {user.role === "ADMIN" ? (
                <Link
                  href="/admin"
                  style={{
                    fontWeight: "400",
                    fontSize: "12px",
                    marginRight: "20px",
                    color: "#fff",
                    textDecoration: "none",
                    border: "1px solid #eee",
                    borderRadius: "50px",
                    padding: "5px",
                  }}
                >
                  Admin
                </Link>
              ) : null}
            </div>
          ) : null}
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
