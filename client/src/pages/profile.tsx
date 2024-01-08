import { Seo } from "@/components/seo";
import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/methods/app/hooks";
import { getLocalStorage } from "@/methods/features/marketplaceSlice";
import { deleteToken, handleCopy, shortDid } from "@/utils";
import { GET_OWNER_RECORDS } from "@/querys/graphql";
import { NetworkStatus, useQuery } from "@apollo/client";
import { Progress } from "@/components/progress";
import Error from "@/components/error";
import Network from "@/components/network";
import Card from "@/components/card";
import styled from "styled-components";
import Auth from "@/components/modals/auth";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const router = useRouter();

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

  const logout = () => {
    deleteToken();
    router.push("/");
    setTimeout(() => {
      router.reload();
    }, 500);
  };
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
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{
                  width: "25px",
                  height: "25px",
                }}
              >
                <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
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
              <button
                type="button"
                onClick={logout}
                style={{
                  fontWeight: "500",
                  fontSize: "13px",
                  marginRight: "20px",
                  color: "#fff",
                  border: "1px solid #eee",
                  borderRadius: "50px",
                  padding: "10px 20px",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
                Log out
              </button>
              {/* {user.role === "ADMIN" ? (
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
              ) : null} */}
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
