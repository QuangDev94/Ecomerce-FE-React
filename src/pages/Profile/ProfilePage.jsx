import React, { useEffect, useState } from "react";
import {
  WrapperContent,
  WrapperHeader,
  WrapperInput,
  WrapperLabel,
  WrapperUploadFile,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/Button/ButtonComponent";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import Loading from "../../components/Loading/Loading";
import * as message from "../../components/Message/Message";
import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { getBase64 } from "../../utils";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(`+84 ${user.phone}`);
  const [address, setAddress] = useState(user.address);
  const [avatar, setAvatar] = useState(user.avatar);

  const mutation = useMutationHooks(async (data) => {
    const { id, access_token, ...rest } = data;
    await UserService.updateUser(id, rest, access_token);
  });

  const { isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPhone(`+84 ${user?.phone}`);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);
  useEffect(() => {
    if (isSuccess) {
      message.success();
    }
    if (isError) {
      message.error();
    }
  }, [isSuccess]);

  const handleUpdateName = () => {
    mutation.mutate({ id: user?.id, name, access_token: user?.access_token });
  };
  const handleUpdateEmail = () => {
    mutation.mutate({ id: user?.id, email, access_token: user?.access_token });
  };
  const handleUpdatePhone = () => {
    mutation.mutate({
      id: user?.id,
      phone: Number(phone),
      access_token: user?.access_token,
    });
  };
  const handleUpdateAddress = () => {
    mutation.mutate({
      id: user?.id,
      address,
      access_token: user?.access_token,
    });
  };
  const handleUpdateAvatar = () => {
    mutation.mutate({ id: user?.id, avatar, access_token: user?.access_token });
  };
  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file?.url && !file?.preview) {
      file.preview = await getBase64(file?.originFileObj);
    }
    setAvatar(file.preview);
  };
  return (
    <div style={{ padding: "0 120px" }}>
      <WrapperHeader>User Information</WrapperHeader>
      <Loading spinning={isPending}>
        <WrapperContent>
          <WrapperInput>
            <WrapperLabel htmlFor="name">Name</WrapperLabel>
            <InputForm
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <ButtonComponent
              size={20}
              styleButton={{
                background: "rgb(255,57,69)",
                height: "30px",
                width: "fit-content",
                border: "none",
                borderRadius: "4px",
                margin: "6px 0",
              }}
              textButton="Update"
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
              onClick={handleUpdateName}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="email">Email</WrapperLabel>
            <InputForm
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <ButtonComponent
              size={20}
              styleButton={{
                background: "rgb(255,57,69)",
                height: "30px",
                width: "fit-content",
                border: "none",
                borderRadius: "4px",
                margin: "6px 0",
              }}
              textButton="Update"
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
              onClick={handleUpdateEmail}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
            <InputForm
              id="phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <ButtonComponent
              size={20}
              styleButton={{
                background: "rgb(255,57,69)",
                height: "30px",
                width: "fit-content",
                border: "none",
                borderRadius: "4px",
                margin: "6px 0",
              }}
              textButton="Update"
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
              onClick={handleUpdatePhone}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="address">Address</WrapperLabel>
            <InputForm
              id="address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <ButtonComponent
              size={20}
              styleButton={{
                background: "rgb(255,57,69)",
                height: "30px",
                width: "fit-content",
                border: "none",
                borderRadius: "4px",
                margin: "6px 0",
              }}
              textButton="Update"
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
              onClick={handleUpdateAddress}
            />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
            <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </WrapperUploadFile>
            {avatar && (
              <img
                src={avatar}
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                alt="avatar"
              />
            )}
            <ButtonComponent
              size={20}
              styleButton={{
                background: "rgb(255,57,69)",
                height: "30px",
                width: "fit-content",
                border: "none",
                borderRadius: "4px",
                margin: "6px 0",
              }}
              textButton="Update"
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
              onClick={handleUpdateAvatar}
            />
          </WrapperInput>
        </WrapperContent>
      </Loading>
    </div>
  );
};

export default ProfilePage;
