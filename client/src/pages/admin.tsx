import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Seo } from "@/components/seo";
import Layout from "@/components/layout";
import { FormEvent, useEffect, useState } from "react";
import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
import Network from "@/components/network";
import { Progress } from "@/components/progress";
import Error from "@/components/error";
import {
  APPROVE_RECORD,
  GET_PENDING_RECORDS,
  GET_RECORD,
  REJECT_RECORD,
} from "@/querys/graphql";
import { capitalizeFirstLetter, shortDid } from "@/utils";
import Payment from "@/components/modals/payment";
import { useAppDispatch, useAppSelector } from "@/methods/app/hooks";
import { getLocalStorage } from "@/methods/features/marketplaceSlice";
import Auth from "@/components/modals/auth";
import Card from "@/components/card";
import Banner from "@/components/banner";
import { IRecord } from "@/interfaces";
import Link from "next/link";
import { toast } from "@/components/toast";

const Container = styled.section`
  margin: 140px 0px 50px;

  @media (min-width: 414px) {
    padding: 0px;
    margin: 80px 0px 30px;
  }

  @media (min-width: 360px) {
    padding: 0px;
    margin: 80px 0px 30px;
  }

  @media (min-width: 1280px) {
    margin: 140px 0px 80px;
    padding: 0 10rem;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;

  // Tablet
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1.5rem;
  }

  // Desktop
  @media (min-width: 1024px) {
    gap: 5rem;
  }
`;

const ImageContainer = styled.div`
  flex: 1;

  img {
    width: 100%;
    height: 400px;
    border-radius: 20px;
    object-fit: cover;

    @media (min-width: 414px) {
      border-radius: 0px;
    }

    @media (min-width: 360px) {
      border-radius: 0px;
    }

    @media (min-width: 1280px) {
      border-radius: 20px;
    }
  }
`;

const TextContainer = styled.div`
  flex: 1;

  @media (min-width: 414px) {
    padding: 30px;
  }

  @media (min-width: 360px) {
    padding: 30px;
  }

  @media (min-width: 1280px) {
    padding: 0px;
  }

  // Mobile
  @media (min-width: 414px) {
    h2 {
      font-size: 2rem;
      font-weight: bold;
      color: #1f2937;
      margin-bottom: 1rem;
      margin-top: 2rem;
    }

    p {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  }

  // Desktop
  @media (min-width: 1280px) {
    h2 {
      font-size: 2rem;
      font-weight: bold;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  }
`;

const Htssvatv = styled.div`
  color: #222222;
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 20px;
`;

const Section = styled.section`
  margin: 50px auto;
  /* padding: 0px 30px; */
`;

const Heading = styled.h2`
  font-size: 20px;

  @media (min-width: 414px) {
    padding: 0px 30px;
  }

  // Small
  @media (min-width: 360px) {
    padding: 0px 30px;
  }

  // Medium
  @media (min-width: 1280px) {
    padding: 0px 40px;
  }
`;

const Grid = styled.div`
  margin: auto;
  /* max-width: 74rem; */
  display: grid;
  gap: 1.5rem;

  // Small
  @media (min-width: 414px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    padding: 30px;
  }

  // Small
  @media (min-width: 360px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    padding: 30px;
  }

  // Medium
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    padding: 20px 40px;
  }

  /* @media (min-width: 414px) {
    padding: 1.5rem;
  }

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  } */
`;

const CardWrapper = styled.article`
  background-color: white;
  color: black;
  border-radius: 15px;
  /* padding: 0.75rem; */
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s; */

  /* &:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  } */

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const CardImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  border-radius: 15px;
`;

const CardImage = styled(Image)`
  width: 500%;
  height: 250px;
  object-fit: cover;
  background-position: center;
`;

const CardContent = styled.div`
  /* margin-top: 0.5rem; */
  padding: 0.5rem 0rem;

  h2 {
    font-weight: bold;
    font-size: 1rem;
    color: #222222;
  }

  p {
    margin-top: 0.5rem;
    font-size: 1rem;
    color: #222222;
  }
`;

const Title = styled.h1`
  color: #222222;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin: 0px;

  // Small
  /* @media (min-width: 414px) {
    font-size: 25px;
  } */

  // Medium
  /* @media (min-width: 1280px) {
    font-size: 18px;
  } */
`;

const Paragragh = styled.p`
  color: #717171 !important;
  font-weight: 400 !important;
  font-size: 13px !important;
  line-height: 20px;
  margin: 0px !important;
`;

const Price = styled.span`
  color: #222222 !important;
  font-size: 14px !important;
  font-weight: 500 !important;
`;

const Rhsgstab = styled.div`
  font-size: 10px !important;
  color: white !important;
  font-weight: 500 !important;
  padding: 4px 8px;
  border-radius: 50px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;

  button {
    border-radius: 50px;
    padding: 10px 20px;
    font-size: 12px;
    border: 0px;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
`;

export default function Admin() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { slug } = router.query;

  const { user } = useAppSelector((state: any) => state.marketplace);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);

  const { loading, error, data, refetch, networkStatus } =
    useQuery(GET_PENDING_RECORDS);

  // Use the useMutation hook to create data
  const [approveRecord] = useMutation(APPROVE_RECORD);
  const [rejectRecord] = useMutation(REJECT_RECORD);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const initializeApp = async () => {
      await dispatch(getLocalStorage());
    };

    if (!user) {
      toggleModal();
    }

    initializeApp();
  }, [dispatch, user]);

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

  const records = data.getPendingRecords;

  const approve = async (_id: string) => {
    try {
      setApproveLoading(true);
      const response = await approveRecord({
        variables: { _id },
      });
      if (response.data.approveRecord) {
        toast({ message: "Sucessfully", position: "bottom" });
        setTimeout(() => {
          router.reload();
        }, 500);
      }
      setApproveLoading(false);
    } catch (e: any) {
      console.error(e.message);
      setApproveLoading(false);
      toast({ message: e.message, position: "bottom" });
    }
  };

  const reject = async (_id: string) => {
    try {
      setRejectLoading(true);
      const response = await rejectRecord({
        variables: { _id },
      });
      if (response.data.rejectRecord) {
        toast({ message: "Sucessfully", position: "bottom" });
        setTimeout(() => {
          router.reload();
        }, 500);
      }
      setApproveLoading(false);
    } catch (e: any) {
      console.error(e.message);
      setRejectLoading(false);
      toast({ message: e.message, position: "bottom" });
    }
  };
  return (
    <Layout>
      <Seo
        title="Admin | DiceSea"
        description="DiceSea is an online marketplace for everyone."
      />
      <Banner title="Admin" backgroundImage="/images/banner.svg" />
      <Section>
        <Heading>Pending Records</Heading>
        <Grid>
          {records.map((record: IRecord) => (
            <CardWrapper key={record._id}>
              <div>
                <Link href={`asset/${record._id}`}>
                  <CardImageWrapper>
                    <CardImage
                      src={record.imageUrl}
                      alt={record.name as string}
                      height={500}
                      width={500}
                    />
                  </CardImageWrapper>
                </Link>
                <CardContent>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Title>{record.name}</Title>
                    {router.asPath === "/profile" || "/admin" ? (
                      <Rhsgstab
                        style={{
                          backgroundColor:
                            record.status === "PENDING"
                              ? "#e5bb26"
                              : record.status === "APPROVED"
                              ? "green"
                              : record.status === "REJECTED"
                              ? "red"
                              : "transparent",
                        }}
                      >
                        {capitalizeFirstLetter(record.status)}
                      </Rhsgstab>
                    ) : null}
                  </div>
                  <Paragragh>{record.description}</Paragragh>
                  <Price>${record.price}</Price>
                  {router.asPath === "/admin" ? (
                    <ButtonWrapper>
                      <button
                        onClick={() => approve(record._id)}
                        style={{
                          backgroundColor: "green",
                        }}
                      >
                        {approveLoading ? "Approving" : "Approve"}
                      </button>
                      <button
                        onClick={() => reject(record._id)}
                        style={{
                          backgroundColor: "red",
                        }}
                      >
                        {rejectLoading ? "Rejecting" : "Reject"}
                      </button>
                    </ButtonWrapper>
                  ) : null}
                </CardContent>
              </div>
            </CardWrapper>
          ))}
        </Grid>
      </Section>
      {user ? null : <Auth isOpen={isModalOpen} onClose={toggleModal} />}
    </Layout>
  );
}
