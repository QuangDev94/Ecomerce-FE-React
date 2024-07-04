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
import { useDispatch, useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import Loading from "../../components/Loading/Loading";
import * as message from "../../components/Message/Message";
import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { getBase64 } from "../../utils";
import { WrraperContainer } from "../Home/style";
import { updateUser } from "../../redux/slices/userSlice";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(`+84 ${user.phone}`);
  const [address, setAddress] = useState(user.address);
  const [city, setCity] = useState(user.city);
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
    setCity(user?.city);
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
    dispatch(updateUser({ ...user, name }));
  };
  const handleUpdateEmail = () => {
    mutation.mutate({ id: user?.id, email, access_token: user?.access_token });
    dispatch(updateUser({ ...user, email }));
  };
  const handleUpdatePhone = () => {
    mutation.mutate({
      id: user?.id,
      phone: Number(phone),
      access_token: user?.access_token,
    });
    dispatch(updateUser({ ...user, phone }));
  };
  const handleUpdateAddress = () => {
    mutation.mutate({
      id: user?.id,
      address,
      access_token: user?.access_token,
    });
    dispatch(updateUser({ ...user, address }));
  };
  const handleUpdateCity = () => {
    mutation.mutate({
      id: user?.id,
      city,
      access_token: user?.access_token,
    });
    dispatch(updateUser({ ...user, city }));
  };
  const handleUpdateAvatar = () => {
    mutation.mutate({ id: user?.id, avatar, access_token: user?.access_token });
    dispatch(updateUser({ ...user, avatar }));
  };
  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file?.url && !file?.preview) {
      file.preview = await getBase64(file?.originFileObj);
    }
    setAvatar(file.preview);
  };
  return (
    <WrraperContainer style={{ height: "600px" }}>
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
            <WrapperLabel htmlFor="city">City</WrapperLabel>
            <InputForm
              id="city"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
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
              onClick={handleUpdateCity}
            />
          </WrapperInput>
          <WrapperInput style={{ flexWrap: "wrap" }}>
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
    </WrraperContainer>
  );
};

export default ProfilePage;
