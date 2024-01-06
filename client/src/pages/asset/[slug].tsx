import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Seo } from "@/components/seo";
import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import { NetworkStatus, useQuery } from "@apollo/client";
import Network from "@/components/network";
import { Progress } from "@/components/progress";
import Error from "@/components/error";
import { GET_RECORD } from "@/querys/graphql";
import { capitalizeFirstLetter, shortDid } from "@/utils";
import Payment from "@/components/modals/payment";
import { useAppDispatch, useAppSelector } from "@/methods/app/hooks";
import { getLocalStorage } from "@/methods/features/marketplaceSlice";
import Auth from "@/components/modals/auth";

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

const Button = styled.button`
  width: 50%;
  background-color: #2e5fd2;
  padding: 15px;
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;

  // Mobile
  @media (min-width: 414px) {
    width: 100%;
  }

  @media (min-width: 360px) {
    width: 100%;
  }

  // Desktop
  @media (min-width: 1280px) {
    width: 100%;
  }
`;

export default function Slug() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { slug } = router.query;

  const { user } = useAppSelector((state: any) => state.marketplace);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_RECORD,
    {
      variables: { _id: slug as string },
    }
  );

  useEffect(() => {
    const initializeApp = async () => {
      await dispatch(getLocalStorage());
    };

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

  const record = data.getRecord;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsLoading(!isLoading);
  };

  const handlePayment = () => {
    setIsLoading(!isLoading);
    toggleModal();
  };
  return (
    <Layout>
      <Seo
        title={`${record.name} - Asset | DiceSea`}
        description="DiceSea is an online marketplace for everyone."
      />
      <Container>
        <FlexContainer>
          <ImageContainer>
            <Image
              src={record?.imageUrl as string}
              alt={record?.name as string}
              height={500}
              width={500}
            />
          </ImageContainer>
          <TextContainer>
            <Htssvatv style={{ marginTop: "20px" }}>
              Owned by {shortDid(record?.owner)}
            </Htssvatv>
            <Htssvatv>Name is {record?.name}</Htssvatv>
            <Htssvatv>Description is {record?.description}</Htssvatv>
            <Htssvatv>
              Category is {capitalizeFirstLetter(record?.category)}
            </Htssvatv>
            <Htssvatv>
              Current price is $
              {record?.price ? parseFloat(record.price).toFixed(2) : "N/A"}
            </Htssvatv>
            {user.did === record?.owner ? (
              <Button type="button" disabled={true}>
                On sale
              </Button>
            ) : (
              <Button type="button" onClick={handlePayment}>
                {isLoading ? "Processing" : "Buy now"}
              </Button>
            )}
            {user ? (
              <Payment isOpen={isModalOpen} onClose={toggleModal} />
            ) : (
              <Auth isOpen={isModalOpen} onClose={toggleModal} />
            )}
          </TextContainer>
        </FlexContainer>
      </Container>
    </Layout>
  );
}
