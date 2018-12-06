import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import {API_ROOT, NODE_ROOT, TOKEN_KEY} from '../constants';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        debugger;
        console.log("handleSubmit function in Login.js script");
        debugger;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                // /**FETCH FUNCTION**/
                // var username = values.username;
                // var password = values.password;
                // var command = `${NODE_ROOT}users/verify?username=${username}`;
                // fetch(command)
                //     .then((response) => console.log(response))
                //     .catch((err) => console.log(err))
                fetch(`${API_ROOT}/login`, {
                    method: 'POST',
                    body: JSON.stringify({
                        username: values.username,
                        password: values.password,
                    }),
                }).then((response) => {
                    if (response.ok) {
                        return response.text();
                    }
                    throw new Error(response.statusText);
                })
                    .then((data) => {
                        this.props.handleLogin(data);
                        message.success('Login Success.');
                    })
                    .catch((e) => {
                        console.log(e);
                        message.error('Login Failed.');
                    });
            }
            else{
                console.log(err);
            }
        });
    }

    render() {
        console.log("Render function in Login.js script");
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <Link to="/register">register now!</Link>
                </FormItem>
            </Form>
        );
    }
}

export const Login = Form.create()(NormalLoginForm);