import React, { useEffect, useState } from 'react'
import { WrapperContent, WrapperHeader, WrapperInput, WrapperLabel } from './style'
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/Button/ButtonComponent';
import { useSelector } from 'react-redux';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import Loading from '../../components/Loading/Loading'
import * as message from '../../components/Message/Message'

const ProfilePage = () => {
    const user =  useSelector((state) => state.user);
    const [name,setName] = useState(user.name);
    const [email,setEmail] = useState(user.email);
    const [phone,setPhone] = useState(`+84 ${user.phone}`);
    const [address,setAddress] = useState(user.address);
    const [avatar,setAvatar] = useState(user.avatar);

    const mutation = useMutationHooks(async (data) => {
        const {id,access_token,...rest} = data;
        await UserService.updateUser(id,rest,access_token);
    });

    const {isPending,isSuccess, isError} = mutation;

    useEffect(() => {
        setName(user?.name);
        setEmail(user?.email);
        setPhone(`+84 ${user?.phone}`);
        setAddress(user?.address);
        setAvatar(user?.avatar);
    },[user]);
    useEffect(() => {
        if(isSuccess) {
            message.success();
        }
        if(isError) {
            message.error();
        }
    },[isSuccess]);

    const handleOnchangeName= () => {
        mutation.mutate({id: user?.id,name,access_token: user?.access_token})
    };
    const handleOnchangeEmail= () => {
        mutation.mutate({id: user?.id,email,access_token: user?.access_token})
    }
    const handleOnchangePhone= () => {
        mutation.mutate({id:user?.id, phone: Number(phone),access_token: user?.access_token})
    }
    const handleOnchangeAddress= () => {
        mutation.mutate({id:user?.id, address,access_token: user?.access_token})
    }
    const handleOnchangeAvatar= () => {
        mutation.mutate({id:user?.id,avatar,access_token: user?.access_token});

    }

    return (
        <div style={{padding: '0 120px'}}>
            <WrapperHeader>User Information</WrapperHeader>
            <Loading spinning={isPending}>
                <WrapperContent>
                    <WrapperInput>
                        <WrapperLabel htmlFor='name'>Name</WrapperLabel>
                        <InputForm id='name' value={name} onChange={(e) => {setName(e.target.value)}}/>
                        <ButtonComponent
                            size={20}
                            styleButton={{
                                background: 'rgb(255,57,69)',
                                height: '30px',
                                width: 'fit-content',
                                border: 'none',
                                borderRadius: '4px',
                                margin: '6px 0',
                            }}
                            textButton='Update'
                            styleTextButton={{color: '#fff',fontSize: '15px', fontWeight: '700'}}
                            onClick = {handleOnchangeName}
                        />
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='email'>Email</WrapperLabel>
                        <InputForm id='email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                        <ButtonComponent
                            size={20}
                            styleButton={{
                                background: 'rgb(255,57,69)',
                                height: '30px',
                                width: 'fit-content',
                                border: 'none',
                                borderRadius: '4px',
                                margin: '6px 0',
                            }}
                            textButton='Update'
                            styleTextButton={{color: '#fff',fontSize: '15px', fontWeight: '700'}}
                            onClick = {handleOnchangeEmail}
                        />
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='phone'>Phone</WrapperLabel>
                        <InputForm id='phone' value={phone} onChange={(e) => {setPhone(e.target.value)}}/>
                        <ButtonComponent
                            size={20}
                            styleButton={{
                                background: 'rgb(255,57,69)',
                                height: '30px',
                                width: 'fit-content',
                                border: 'none',
                                borderRadius: '4px',
                                margin: '6px 0',
                            }}
                            textButton='Update'
                            styleTextButton={{color: '#fff',fontSize: '15px', fontWeight: '700'}}
                            onClick = {handleOnchangePhone}
                        />
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='address'>Address</WrapperLabel>
                        <InputForm id='address' value={address} onChange={(e) => {setAddress(e.target.value)}}/>
                        <ButtonComponent
                            size={20}
                            styleButton={{
                                background: 'rgb(255,57,69)',
                                height: '30px',
                                width: 'fit-content',
                                border: 'none',
                                borderRadius: '4px',
                                margin: '6px 0',
                            }}
                            textButton='Update'
                            styleTextButton={{color: '#fff',fontSize: '15px', fontWeight: '700'}}
                            onClick = {handleOnchangeAddress}
                        />
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor='avatar'>Avatar</WrapperLabel>
                        <InputForm id='avatar' value={avatar} onChange={(e) => {setAvatar(e.target.value)}}/>
                        <ButtonComponent
                            size={20}
                            styleButton={{
                                background: 'rgb(255,57,69)',
                                height: '30px',
                                width: 'fit-content',
                                border: 'none',
                                borderRadius: '4px',
                                margin: '6px 0',
                            }}
                            textButton='Update'
                            styleTextButton={{color: '#fff',fontSize: '15px', fontWeight: '700'}}
                            onClick = {handleOnchangeAvatar}
                        />
                    </WrapperInput>
                </WrapperContent>
            </Loading>
        </div>
    )
}

export default ProfilePage