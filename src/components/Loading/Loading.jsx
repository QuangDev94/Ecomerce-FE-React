import React from 'react'
import { Flex, Spin } from 'antd';

const Loading = ({children,spinning,delay=200}) => {
  return (
        <Spin spinning={spinning} delay={delay}>{children}</Spin>
  )
}

export default Loading