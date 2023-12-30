import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { toast } from "../toast";
import { handleSuccess } from "@/utils";

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
    margin-bottom: 10px;
    align-items: start;
    justify-items: flex-start;
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
    padding: 10px 20px;
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

enum ModalState {
  Register = "Register",
  Login = "Login",
  Reset = "Reset",
}

const Auth: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [modalState, setModalState] = useState<ModalState>(ModalState.Register);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleToggleState = (newState: ModalState) => {
    setModalState(newState);
  };

  const handleRegister = () => {
    if (!name || !email || !password) {
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

  const handleLogin = () => {
    if (!email || !password) {
      return toast({
        message: "Please fill out all fields",
        position: "bottom",
      });
    }

    try {
      toast({
        message: "Success",
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

  const handleReset = () => {
    if (!email) {
      return toast({
        message: "Please fill out all fields",
        position: "bottom",
      });
    }

    toast({
      message: "You're welcome",
      position: "bottom",
    });
    onClose();
  };

  return (
    <Container isOpen={isOpen}>
      <ModalContent>
        <div>
          {modalState === ModalState.Register ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <h2>{modalState}</h2>
                <Button onClick={() => handleToggleState(ModalState.Login)}>
                  Login
                </Button>
              </div>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleRegister}>Send</button>
            </>
          ) : (
            modalState === ModalState.Login && (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <h2>{modalState}</h2>
                  <Button
                    onClick={() => handleToggleState(ModalState.Register)}
                  >
                    Register
                  </Button>
                </div>
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Send</button>
              </>
            )
          )}
        </div>
      </ModalContent>
    </Container>
  );
};

export default Auth;
