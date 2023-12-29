import React from "react";
import { ISlug } from "@/interfaces";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Section = styled.section`
  margin: 50px auto;
  padding: 0px 30px;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
`;

const CardWrapper = styled.div`
  // Desktop
  @media (max-width: 1280px) {
    /* overflow-x: auto; */
  }
  // Tablet
  @media (max-width: 834px) {
    overflow-x: auto;
  }
  // Mobile
  @media (max-width: 375px) {
    overflow-x: auto;
  }
`;

const CardContainer = styled.div`
  flex-wrap: wrap;
  width: 1200px;
  display: flex;
  margin: auto;
  gap: 25px;
`;

const CardLink = styled(Link)`
  width: 281px;
  border-radius: 15px;
  cursor: pointer;
  color: #000;
  text-decoration: none;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled(Image)`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px 15px 0px 0px;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 8px;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #555;
`;

const Slug: React.FC<ISlug> = ({ items, title, route }) => {
  const router = useRouter();
  return (
    <Section>
      <Heading>{title}</Heading>
      <CardWrapper>
        <CardContainer>
          {items.length !== 0 ? (
            items.map((item) => (
              <CardLink key={item.id} href={`/${route}/${item.id as string}`}>
                {router.asPath === "/" ? null : (
                  <CardImage
                    src={item.imageUrl}
                    alt={item.name as string}
                    height={500}
                    width={500}
                  />
                )}
                <CardContent>
                  <CardTitle>{item.name}</CardTitle>
                  {router.asPath === "/" ? null : (
                    <CardDescription>{item.description}</CardDescription>
                  )}
                </CardContent>
              </CardLink>
            ))
          ) : (
            <div style={{ textAlign: "center", width: "100%" }}>
              <Image
                src="/icons/inbox.svg"
                alt="No data"
                height={100}
                width={100}
              />
              <p>No data</p>
            </div>
          )}
        </CardContainer>
      </CardWrapper>
    </Section>
  );
};

export default Slug;
