import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "../toast";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { PAYMENT_DETAIL } from "@/querys/graphql";
import { useAppDispatch, useAppSelector } from "@/methods/app/hooks";
import { getLocalStorage } from "@/methods/features/marketplaceSlice";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
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

const Payment: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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
  }, [dispatch, user]);

  // Use the useMutation hook to create data
  const [paymentDetail, {}] = useMutation(PAYMENT_DETAIL);

  const handlePay = async () => {
    if (!cardName || !cardNumber || !expiryDate || !cvcNumber) {
      return toast({
        message: "Please fill out all fields",
        position: "bottom",
      });
    }

    try {
      setLoading(true);

      const detail = {
        cardName,
        cardNumber,
        expiryDate,
        cvcNumber,
        user: {
          _id: user._id,
          name: user.did,
          description: user.description,
          profileImage: user.profileImage,
          bannerImage: user.bannerImage,
        },
      };

      const { data } = await paymentDetail({
        variables: { detail: detail },
      });

      // Check if the operation was successful
      if (data && data.paymentDetail) {
        toast({ message: "Successful paid", position: "bottom" });
        setLoading(false);

        // Perform any additional actions after successful creation
        router.push("/profile");
        setLoading(false);
        onClose();
        router.reload();
      } else {
        // Handle the case where the operation failed
        toast({ message: "Failed", position: "bottom" });
        setLoading(false);
      }
    } catch (e) {
      toast({
        message: "Failed",
        position: "bottom",
      });
      setLoading(false);
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
              stroke-width="1.5"
              stroke="currentColor"
              onClick={() => onClose()}
              style={{ height: "30px", width: "30px", cursor: "pointer" }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
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
                placeholder="CVC"
                onChange={(e) => setCvcNumber(e.target.value)}
              />
            </div>
          </div>
          <button onClick={handlePay}>{loading ? "Sending..." : "Send"}</button>
        </div>
      </ModalContent>
    </Container>
  );
};

export default Payment;
