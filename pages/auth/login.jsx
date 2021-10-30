import React, { useState } from 'react';
import Router from 'next/router';
import { Typography, Form, Input, Button } from 'antd';
import { useUser } from '../../lib/auth/hooks';

const { Title } = Typography;

const Login = () => {
  useUser({ redirectTo: '/users/me', redirectIfFound: true })
  const [errorMsg, setErrorMsg] = useState('');

  const onFinish = async (values) => {

    const body = {
      username: values.username,
      password: values.password,
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.status === 200) {
        Router.push('/users/me')
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error('An unexpected error happened occurred:', error)
      setErrorMsg(error.message)
    }
  };

  return (
    <>
      <Title>Login</Title>
      {errorMsg && <Title level={4} type='danger' className="error">{errorMsg}</Title>}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Login
