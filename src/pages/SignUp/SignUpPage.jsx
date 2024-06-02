import React from 'react'
import { WrapperLeftContainer, WrapperRightContainer, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import { WrapperInputForm } from '../../components/InputForm/style'
import ButtonComponent from '../../components/Button/ButtonComponent'
import SignInImage from '../../assets/SignIn-Up/sign-in.png';
import { Image } from 'antd'

const SignUpPage = () => {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'rgba(0,0,0,0.53)'}}>
      <div style={{ width: '800px',borderRadius: "8px",background: "#fff", display: 'flex'}}>
        <WrapperLeftContainer>
          <h1 style={{fontSize: '26px', margin: '0px'}}>Wellcome</h1>
          <p style={{fontSize: '14px'}}>Sign-up to your account</p>
          <InputForm style={{marginBottom: '15px'}} placeholder="abc@gmail.com"/>
          <WrapperInputForm.Password placeholder="password" style={{marginBottom: '15px'}}/>
          <WrapperInputForm.Password placeholder="confirm password"/>
          <ButtonComponent
              size={20}
              styleButton={{
                  background: 'rgb(255,57,69)',
                  height: '48px',
                  width: '100%',
                  border: 'none',
                  borderRadius: '4px',
                  margin: '26px 0',
              }}
              textButton='Sign Up'
              styleTextButton={{color: '#fff',fontSize: '15px', fontWeight: '700'}}
          />
          <p style={{fontSize: '14px'}}>you have an acount ? <WrapperTextLight>Sign-in?</WrapperTextLight> </p>
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

export default SignUpPage