import React, { useEffect, useState } from "react";
import {
  WrapperLeftContainer,
  WrapperRightContainer,
  WrapperTextLight,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import { WrapperInputForm } from "../../components/InputForm/style";
import ButtonComponent from "../../components/Button/ButtonComponent";
import SignInImage from "../../assets/SignIn-Up/sign-in.png";
import { Image } from "antd";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/Loading/Loading";
import * as message from "../../components/Message/Message";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const mutation = useMutationHooks((data) => UserService.signupUser(data));
  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      navigate("/sign-in");
    }
    if (isError) {
      message.error(data?.message);
    }
  }, [isSuccess, data, isError]);
  const signUpHandle = () => {
    mutation.mutate({
      email,
      password,
      confirmPassword,
    });
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "rgba(0,0,0,0.53)",
      }}>
      <div
        style={{
          width: "800px",
          borderRadius: "8px",
          background: "#fff",
          display: "flex",
        }}>
        <WrapperLeftContainer>
          <h1 style={{ fontSize: "26px", margin: "0px" }}>Wellcome</h1>
          <p style={{ fontSize: "14px" }}>Sign-up to your account</p>
          <InputForm
            style={{ marginBottom: "15px" }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <WrapperInputForm.Password
            placeholder="password"
            style={{ marginBottom: "15px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <WrapperInputForm.Password
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {data?.status === "ERROR" && (
            <span style={{ color: "red", fontSize: "12px", marginTop: "10px" }}>
              {data?.message}
            </span>
          )}
          <Loading spinning={isPending}>
            <ButtonComponent
              disabled={
                !email.length || !password.length || !confirmPassword.length
              }
              size={20}
              styleButton={{
                background: "rgb(255,57,69)",
                height: "48px",
                width: "100%",
                border: "none",
                borderRadius: "4px",
                margin: "26px 0",
              }}
              textButton="Sign Up"
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
              onClick={signUpHandle}
            />
          </Loading>
          <p style={{ fontSize: "14px" }}>
            you have an acount ?{" "}
            <WrapperTextLight
              onClick={() => {
                navigate("/sign-in");
              }}>
              Sign-in?
            </WrapperTextLight>{" "}
          </p>
        </WrapperLeftContainer>
        <WrapperRightContainer>
          <Image src={SignInImage} preview={false} height={203} width={203} />
          <h4
            style={{
              fontSize: "12px",
              color: "rgb(11, 116, 229)",
              marginBottom: "0",
            }}>
            Mua sam tai QuangDev
          </h4>
          <p
            style={{
              fontSize: "12px",
              color: "rgb(11, 116, 229)",
              margin: "0",
            }}>
            Sieu uu dai moi ngay
          </p>
        </WrapperRightContainer>
      </div>
    </div>
  );
};

export default SignUpPage;
