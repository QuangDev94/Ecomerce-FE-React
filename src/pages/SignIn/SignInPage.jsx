import React, { useEffect, useState } from 'react'
import { WrapperLeftContainer, WrapperRightContainer, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/Button/ButtonComponent'
import {  Image } from 'antd'
import SignInImage from '../../assets/SignIn-Up/sign-in.png';
import { WrapperInputForm } from '../../components/InputForm/style'
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/Loading/Loading'
import * as message from '../../components/Message/Message'
import { jwtDecode } from "jwt-decode";
import {useDispatch} from 'react-redux';
import { updateUser } from '../../redux/slices/userSlice'

const SignInPage = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const mutation = useMutationHooks(data => UserService.loginUser(data));
  const {data,isPending,isSuccess} = mutation;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      message.success();
      navigate('/');
      localStorage.setItem("access_token",JSON.stringify(data?.access_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.payload?.id) {
          handleGetDetailsUser(decoded?.payload?.id,data?.access_token);
        }
      }
    } else {
      message.error(data?.message);
    }
  },[isSuccess,data]);

  const handleGetDetailsUser = async (id,token) => {
    const res = await UserService.getDetailsUser(id,token);
    dispatch(updateUser({...res.data,access_token: token}));
  }
  const signInHandle = () => {
    mutation.mutate({
      email,
      password
    })
  };

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'rgba(0,0,0,0.53)'}}>
      <div style={{ width: '800px',borderRadius: "8px",background: "#fff", display: 'flex'}}>
        <WrapperLeftContainer>
          <h1 style={{fontSize: '26px', margin: '0px'}}>Wellcome</h1>
          <p style={{fontSize: '14px'}}>Sign-in to your account</p>
          <InputForm style={{marginBottom: '15px'}} placeholder="abc@gmail.com" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
          <WrapperInputForm.Password placeholder="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
          {data?.status === "ERROR" && <span style={{color: "red",fontSize: "12px",marginTop: "10px"}}>{data?.message}</span>}
          <Loading spinning={isPending}>
            <ButtonComponent
                disabled={!email.length || !password.length}
                size={20}
                styleButton={{
                    background: 'rgb(255,57,69)',
                    height: '48px',
                    width: '100%',
                    border: 'none',
                    borderRadius: '4px',
                    margin: '26px 0',
                }}
                textButton='Sign In'
                styleTextButton={{color: '#fff',fontSize: '15px', fontWeight: '700'}}
                onClick = {signInHandle}
            />
          </Loading>
          <WrapperTextLight>Forget password ?</WrapperTextLight>
          <p style={{fontSize: '14px'}}>Don't have acount ? <WrapperTextLight onClick={() => {navigate('/sign-up')}}>Create acount?</WrapperTextLight> </p>
        </WrapperLeftContainer>
        <WrapperRightContainer>
          <Image src={SignInImage} preview={false} height={203} width={203}/>
          <h4  style={{fontSize: '12px', color: 'rgb(11, 116, 229)', marginBottom: '0'}}>Mua sam tai QuangDev</h4>
          <p style={{fontSize: '12px', color: 'rgb(11, 116, 229)', margin: '0'}}>Sieu uu dai moi ngay</p>
        </WrapperRightContainer>
      </div>
    </div>
  )
}

export default SignInPage