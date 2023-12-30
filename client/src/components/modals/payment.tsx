import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { toast } from "../toast";

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
  border-radius: 0px;
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
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  const handleSubmit = () => {
    if (!cardName || !cardNumber || !expiryDate || !cvc) {
      return toast({
        message: "Please fill out all fields",
        position: "bottom",
      });
    }

    try {
      toast({
        message: "Successful",
        position: "bottom",
      });
      onClose();
    } catch (e) {
      toast({
        message: "Failed",
        position: "bottom",
      });
      onClose();
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
              style={{ height: "40px", width: "40px", cursor: "pointer" }}
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
                value={cvc}
                placeholder="CVC"
                onChange={(e) => setCvc(e.target.value)}
              />
            </div>
          </div>
          <button onClick={handleSubmit}>Send</button>
        </div>
      </ModalContent>
    </Container>
  );
};

export default Payment;
