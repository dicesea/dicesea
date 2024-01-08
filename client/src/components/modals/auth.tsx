import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "../toast";
import { LOGIN_USER, REGISTER_USER } from "@/querys/graphql";
import { useMutation } from "@apollo/client";
import { Web5 } from "@web5/api";
import { useRouter } from "next/router";
import { saveToken } from "@/utils";

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
  font-size: 14px;
  font-weight: 600;
  border-radius: 50px;
  padding: 5px 10px;
  background-color: #eee;
  border: 1px solid #eee;
`;

const Shsgsysyau = styled.h2`
  margin: 0px !important;
`;

enum ModalState {
  Register = "Register",
  Login = "Login",
  Reset = "Reset",
}

const Auth: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const [modalState, setModalState] = useState<ModalState>(ModalState.Register);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleToggleState = (newState: ModalState) => {
    setModalState(newState);
  };

  const [registerUser, {}] = useMutation(REGISTER_USER);
  const [loginUser, {}] = useMutation(LOGIN_USER);

  const register = async () => {
    const { did } = await Web5.connect({ sync: "5s" });

    if (did && name && email && password) {
      try {
        setLoading(true);

        const user = {
          did,
          name,
          email,
          password,
          description: "I love DiceSea",
          profileImage:
            "https://scontent.fabb1-1.fna.fbcdn.net/v/t39.30808-6/414713354_312394515117410_8247061755525529656_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeH8K5twdBo06w87zvTNzdHwhfCND8WtCf6F8I0Pxa0J_s0XHphetQBUy_Nvn0yKam_Id_WgHizxV2qZ8ZgH61OD&_nc_ohc=F_FLdbevhVAAX9P8KCE&_nc_zt=23&_nc_ht=scontent.fabb1-1.fna&oh=00_AfB97Z27QupfdObniYZiDI24A91YDdfM8xzfzksNqqpf8A&oe=659D4A47",
          bannerImage:
            "https://scontent.fabb1-1.fna.fbcdn.net/v/t39.30808-6/414106955_312347485122113_5568931635377713877_n.png?_nc_cat=101&ccb=1-7&_nc_sid=783fdb&_nc_eui2=AeGOU7cIBm91Oo9nywzuVYT4tpniI_SVUK22meIj9JVQrVUAgMvQlSqlFgIxMY3aZTg8u1VcqTVs6kxDQ-2e89KY&_nc_ohc=jqt80moDdnwAX9fSz3K&_nc_zt=23&_nc_ht=scontent.fabb1-1.fna&oh=00_AfDxOoSZYLdVBzTTgMm39dTqvPG9Y_gv_0NJdeIimz4p7Q&oe=659D3CD2",
          role: "USER",
        };

        const { data } = await registerUser({
          variables: { user: user },
        });

        if (data && data.registerUser.user) {
          saveToken(data.registerUser.user);
          toast({ message: "Account created", position: "bottom" });
          setLoading(false);
          router.reload();
          setTimeout(() => {
            onClose();
          }, 500);
        }
      } catch (e: any) {
        console.error(e.message);
        toast({
          message: "Regsiter failed. " + e.message,
          position: "bottom",
        });
        setLoading(false);
      }
    } else {
      toast({ message: "Wrong inputs. Check again", position: "bottom" });
    }
  };

  const login = async () => {
    const user = {
      email,
      password,
    };

    if (email && password) {
      try {
        setLoading(true);

        const { data } = await loginUser({
          variables: { user: user },
        });

        if (data && data.loginUser) {
          saveToken(data.loginUser.user);
          setLoading(false);
          router.reload();
          setTimeout(() => {
            onClose();
          }, 500);
        }
      } catch (e: any) {
        console.error(e.message);
        toast({
          message: "Login failed. " + e.message,
          position: "bottom",
        });
        setLoading(false);
      }
    } else {
      toast({ message: "Wrong inputs. Check again", position: "bottom" });
    }
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
                <Shsgsysyau>{modalState}</Shsgsysyau>
                <Button onClick={() => handleToggleState(ModalState.Login)}>
                  Login
                </Button>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <label>Name</label>
                <small>Required</small>
              </div>
              <input
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <label>Email</label>
                <small>Required</small>
              </div>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <label>Password</label>
                <small>Required</small>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button disabled={loading} onClick={register}>
                {loading ? "Sending..." : "Send"}
              </button>
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
                  <Shsgsysyau>{modalState}</Shsgsysyau>
                  <Button
                    onClick={() => handleToggleState(ModalState.Register)}
                  >
                    Register
                  </Button>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <label>Email or DID</label>
                  <small>Required</small>
                </div>
                <input
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <label>Password</label>
                  <small>Required</small>
                </div>
                <input
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button disabled={loading} onClick={login}>
                  {loading ? "Sending..." : "Send"}
                </button>
              </>
            )
          )}
        </div>
      </ModalContent>
    </Container>
  );
};

export default Auth;
