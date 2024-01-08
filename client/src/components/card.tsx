// import React from "react";
// import { ICard } from "@/interfaces";
// import styled from "styled-components";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";

// const Section = styled.section`
//   margin: 50px auto;
//   padding: 0px 30px;
// `;

// const Heading = styled.h2`
//   font-size: 20px;
//   margin-bottom: 20px;
// `;

// const CardWrapper = styled.div`
//   // Desktop
//   @media (max-width: 1280px) {
//     /* overflow-x: auto; */
//   }
//   // Tablet
//   @media (max-width: 834px) {
//     overflow-x: auto;
//   }
//   // Mobile
//   @media (max-width: 375px) {
//     overflow-x: auto;
//   }
// `;

// const CardContainer = styled.div`
//   flex-wrap: wrap;
//   width: 1200px;
//   display: flex;
//   margin: auto;
//   gap: 25px;
// `;

// const CardLink = styled(Link)`
//   width: 281px;
//   border-radius: 15px;
//   cursor: pointer;
//   color: #000;
//   text-decoration: none;
//   background-color: #fff;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// `;

// const CardImage = styled(Image)`
//   width: 100%;
//   height: 200px;
//   object-fit: cover;
//   border-radius: 15px 15px 0px 0px;
// `;

// const CardContent = styled.div`
//   padding: 16px;
// `;

// const CardTitle = styled.h2`
//   font-size: 18px;
//   margin-bottom: 8px;
// `;

// const CardDescription = styled.p`
//   font-size: 14px;
//   color: #555;
// `;

// const Card: React.FC<ICard> = ({ records, title, route }) => {
//   const router = useRouter();
//   return (
//     <Section>
//       <Heading>{title}</Heading>
//       <CardWrapper>
//         <CardContainer>
//           {records.length !== 0 ? (
//             records.map((record: any) => (
//               <CardLink
//                 key={record._id}
//                 href={`/${route}/${record.id as string}`}
//               >
//                 <CardImage
//                   src={
//                     record.profileImage !== ""
//                       ? record.profileImage
//                       : record.imageUrl
//                   }
//                   alt={record.name as string}
//                   height={500}
//                   width={500}
//                 />
//                 <CardContent>
//                   <CardTitle>{record.name}</CardTitle>
//                   {router.asPath === "/" ? null : (
//                     <CardDescription>{record.description}</CardDescription>
//                   )}
//                 </CardContent>
//               </CardLink>
//             ))
//           ) : (
//             <div style={{ textAlign: "center", width: "100%" }}>
//               <svg
//                 width="84"
//                 height="126"
//                 viewBox="0 0 84 126"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <g clipPath="url(#clip0_1_4)">
//                   <path
//                     d="M55.9248 57.8938C52.0569 54.0258 46.8108 51.8529 41.3407 51.8529C35.8707 51.8529 31.3317 53.3187 27.4638 57.1867"
//                     stroke="black"
//                   />
//                   <circle cx="29.9585" cy="45.4258" r="3.6123" fill="black" />
//                   <circle cx="53.4282" cy="45.4258" r="3.6123" fill="black" />
//                   <path
//                     d="M71.3299 17.6884L71.33 17.6886C71.9653 18.3238 72.3184 19.1853 72.3184 20.0747V20.5635H52.5684V0.813538H53.0572C53.9639 0.813538 54.8251 1.16742 55.4595 1.80186L71.3299 17.6884ZM46.3809 0.813538V22.3604C46.3809 24.7764 48.3555 26.751 50.7715 26.751H72.3184V79.4229C72.3184 81.3028 70.8076 82.8135 68.9277 82.8135H14.459C12.5791 82.8135 11.0684 81.3028 11.0684 79.4229V4.20416C11.0684 2.32425 12.5791 0.813538 14.459 0.813538H46.3809Z"
//                     stroke="black"
//                   />
//                 </g>
//                 <path
//                   d="M22.8534 116.485H20.4594L16.4554 110.423V116.485H14.0614V106.657H16.4554L20.4594 112.747V106.657H22.8534V116.485ZM28.1447 116.597C27.3794 116.597 26.6887 116.434 26.0727 116.107C25.466 115.78 24.9854 115.314 24.6307 114.707C24.2854 114.1 24.1127 113.391 24.1127 112.579C24.1127 111.776 24.29 111.072 24.6447 110.465C24.9994 109.849 25.4847 109.378 26.1007 109.051C26.7167 108.724 27.4074 108.561 28.1727 108.561C28.938 108.561 29.6287 108.724 30.2447 109.051C30.8607 109.378 31.346 109.849 31.7007 110.465C32.0554 111.072 32.2327 111.776 32.2327 112.579C32.2327 113.382 32.0507 114.091 31.6867 114.707C31.332 115.314 30.842 115.78 30.2167 116.107C29.6007 116.434 28.91 116.597 28.1447 116.597ZM28.1447 114.525C28.602 114.525 28.9894 114.357 29.3067 114.021C29.6334 113.685 29.7967 113.204 29.7967 112.579C29.7967 111.954 29.638 111.473 29.3207 111.137C29.0127 110.801 28.63 110.633 28.1727 110.633C27.706 110.633 27.3187 110.801 27.0107 111.137C26.7027 111.464 26.5487 111.944 26.5487 112.579C26.5487 113.204 26.698 113.685 26.9967 114.021C27.3047 114.357 27.6874 114.525 28.1447 114.525ZM40.1516 106.657C41.1876 106.657 42.0929 106.862 42.8676 107.273C43.6422 107.684 44.2396 108.262 44.6596 109.009C45.0889 109.746 45.3036 110.6 45.3036 111.571C45.3036 112.532 45.0889 113.386 44.6596 114.133C44.2396 114.88 43.6376 115.458 42.8536 115.869C42.0789 116.28 41.1782 116.485 40.1516 116.485H36.4696V106.657H40.1516ZM39.9976 114.413C40.9029 114.413 41.6076 114.166 42.1116 113.671C42.6156 113.176 42.8676 112.476 42.8676 111.571C42.8676 110.666 42.6156 109.961 42.1116 109.457C41.6076 108.953 40.9029 108.701 39.9976 108.701H38.8636V114.413H39.9976ZM46.1654 112.565C46.1654 111.762 46.3148 111.058 46.6134 110.451C46.9214 109.844 47.3368 109.378 47.8594 109.051C48.3821 108.724 48.9654 108.561 49.6094 108.561C50.1601 108.561 50.6408 108.673 51.0514 108.897C51.4714 109.121 51.7934 109.415 52.0174 109.779V108.673H54.4114V116.485H52.0174V115.379C51.7841 115.743 51.4574 116.037 51.0374 116.261C50.6268 116.485 50.1461 116.597 49.5954 116.597C48.9608 116.597 48.3821 116.434 47.8594 116.107C47.3368 115.771 46.9214 115.3 46.6134 114.693C46.3148 114.077 46.1654 113.368 46.1654 112.565ZM52.0174 112.579C52.0174 111.982 51.8494 111.51 51.5134 111.165C51.1868 110.82 50.7854 110.647 50.3094 110.647C49.8334 110.647 49.4274 110.82 49.0914 111.165C48.7648 111.501 48.6014 111.968 48.6014 112.565C48.6014 113.162 48.7648 113.638 49.0914 113.993C49.4274 114.338 49.8334 114.511 50.3094 114.511C50.7854 114.511 51.1868 114.338 51.5134 113.993C51.8494 113.648 52.0174 113.176 52.0174 112.579ZM60.4974 114.455V116.485H59.2794C58.4114 116.485 57.7347 116.275 57.2494 115.855C56.7641 115.426 56.5214 114.73 56.5214 113.769V110.661H55.5694V108.673H56.5214V106.769H58.9154V108.673H60.4834V110.661H58.9154V113.797C58.9154 114.03 58.9714 114.198 59.0834 114.301C59.1954 114.404 59.3821 114.455 59.6434 114.455H60.4974ZM61.3549 112.565C61.3549 111.762 61.5042 111.058 61.8029 110.451C62.1109 109.844 62.5262 109.378 63.0489 109.051C63.5716 108.724 64.1549 108.561 64.7989 108.561C65.3496 108.561 65.8302 108.673 66.2409 108.897C66.6609 109.121 66.9829 109.415 67.2069 109.779V108.673H69.6009V116.485H67.2069V115.379C66.9736 115.743 66.6469 116.037 66.2269 116.261C65.8162 116.485 65.3356 116.597 64.7849 116.597C64.1502 116.597 63.5716 116.434 63.0489 116.107C62.5262 115.771 62.1109 115.3 61.8029 114.693C61.5042 114.077 61.3549 113.368 61.3549 112.565ZM67.2069 112.579C67.2069 111.982 67.0389 111.51 66.7029 111.165C66.3762 110.82 65.9749 110.647 65.4989 110.647C65.0229 110.647 64.6169 110.82 64.2809 111.165C63.9542 111.501 63.7909 111.968 63.7909 112.565C63.7909 113.162 63.9542 113.638 64.2809 113.993C64.6169 114.338 65.0229 114.511 65.4989 114.511C65.9749 114.511 66.3762 114.338 66.7029 113.993C67.0389 113.648 67.2069 113.176 67.2069 112.579Z"
//                   fill="black"
//                 />
//                 <defs>
//                   <clipPath id="clip0_1_4">
//                     <rect
//                       width="83"
//                       height="83"
//                       fill="white"
//                       transform="translate(0.193359 0.313538)"
//                     />
//                   </clipPath>
//                 </defs>
//               </svg>
//             </div>
//           )}
//         </CardContainer>
//       </CardWrapper>
//     </Section>
//   );
// };

// export default Card;

import React from "react";
import { ICard, IRecord } from "@/interfaces";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/utils";
import { useRouter } from "next/router";

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
  cursor: pointer;
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

const Card: React.FC<ICard> = ({ records, title, route }) => {
  const router = useRouter();

  const approve = () => {};

  const reject = () => {};

  return (
    <Section>
      <Heading>{title}</Heading>
      <Grid>
        {records.map((record: IRecord) => (
          <CardWrapper key={record._id}>
            <Link href={`/${route}/${record._id as string}`}>
              <CardImageWrapper>
                <CardImage
                  src={record.imageUrl}
                  alt={record.name as string}
                  height={500}
                  width={500}
                />
              </CardImageWrapper>
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
                      onClick={approve}
                      style={{
                        backgroundColor: "green",
                      }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={reject}
                      style={{
                        backgroundColor: "red",
                      }}
                    >
                      Reject
                    </button>
                  </ButtonWrapper>
                ) : null}
              </CardContent>
            </Link>
          </CardWrapper>
        ))}
      </Grid>
    </Section>
  );
};

export default Card;
