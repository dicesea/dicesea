import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "../toast";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { CREATE_RECORD, SEND_PAYMENT } from "@/querys/graphql";
import { useAppDispatch, useAppSelector } from "@/methods/app/hooks";
import { getLocalStorage } from "@/methods/features/marketplaceSlice";
import { IRecord } from "@/interfaces";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: IRecord;
}

const Container = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(45, 47, 49, 0.8);
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: opacity 0.2s;
  pointer-events: ${(props) => (props.isOpen ? "auto" : "none")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  margin: 20px;
  border-radius: 20px;
  max-width: 400px;
  width: 100%;
  text-align: center;

  label {
    display: flex;
    margin-bottom: 5px;
    align-items: start;
    justify-items: flex-start;
    font-size: 13px;
  }

  small {
    font-size: 13px;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    box-sizing: border-box;
    border: 2px solid rgb(229, 232, 235);
    border-radius: 0px;
  }

  button {
    background-color: #007bff;
    color: #fff;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    font-size: 16px;
    margin-top: 10px;
    border-radius: 50px;
  }
`;

const Button = styled.div`
  cursor: pointer;
`;

const Payment: React.FC<ModalProps> = ({ isOpen, onClose, record }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvcNumber, setCvcNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useAppSelector((state: any) => state.marketplace);
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

  const [sendPayment, {}] = useMutation(SEND_PAYMENT);
  const [createRecord, {}] = useMutation(CREATE_RECORD);

  const submit = async () => {
    // Validate required fields
    if (
      cardName &&
      cardNumber &&
      expiryDate &&
      cvcNumber &&
      record._id &&
      record.name &&
      record.description &&
      record.imageUrl &&
      record.category &&
      record.price
    ) {
      try {
        setLoading(true);

        // Perform payment processing
        const paymentDetails = {
          cardName,
          cardNumber,
          expiryDate,
          cvcNumber,
          cardAmount: record.price,
          user: {
            _id: user._id,
            did: user.did,
            name: user.did,
            email: user.email,
            role: user.role,
          },
        };

        const { data } = await sendPayment({
          variables: { detail: paymentDetails },
        });

        // Check if the payment operation was successful
        if (data && data.sendPayment) {
          const duplicateRecord = {
            name: record.name,
            description: record.description,
            price: record.price,
            imageUrl: record.imageUrl,
            category: record.category,
            creator: record.user.did,
            owner: user.did,
            user: {
              _id: user._id,
              did: user.did,
              name: user.name,
              email: user.email,
              description: user.description,
              profileImage: user.profileImage,
              bannerImage: user.bannerImage,
              role: user.role,
            },
          };

          // Create the duplicate record
          await createRecord({
            variables: { record: duplicateRecord },
          });

          // Perform any additional actions after successful creation
          toast({ message: "Payment successful", position: "bottom" });
          router.push("/profile");
          setLoading(false);
          setTimeout(() => {
            router.reload();
          }, 1000);
          // onClose();
        } else {
          // Handle the case where the payment operation failed
          toast({ message: "Payment failed", position: "bottom" });
          setLoading(false);
        }
      } catch (e: any) {
        console.error(e.message);
        toast({ message: e.message, position: "bottom" });
        setLoading(false);
      }
    } else {
      toast({
        message: "Wrong data. Check again",
        position: "bottom",
      });
    }
  };

  return (
    <Container isOpen={isOpen}>
      <ModalContent>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ margin: "0px", fontSize: "25px" }}>Payment</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              onClick={() => onClose()}
              style={{ height: "30px", width: "30px", cursor: "pointer" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <label>Name on card</label>
            <small>Required</small>
          </div>
          <input
            type="text"
            value={cardName}
            required
            placeholder="Name on card"
            onChange={(e) => setCardName(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <label>Card number</label>
            <small>Required</small>
          </div>
          <input
            type="text"
            value={cardNumber}
            required
            placeholder="Card number"
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <div style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <label>Expiry date</label>
                <small>Required</small>
              </div>
              <input
                type="text"
                value={expiryDate}
                required
                placeholder="MM/YY"
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
            <div style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <label>CVC/CVV</label>
                <small>Required</small>
              </div>
              <input
                type="text"
                value={cvcNumber}
                required
                placeholder="CVC"
                onChange={(e) => setCvcNumber(e.target.value)}
              />
            </div>
          </div>
          <button onClick={submit}>{loading ? "Sending..." : "Send"}</button>
        </div>
      </ModalContent>
    </Container>
  );
};

export default Payment;
