import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { API_ROOT } from '../constants';

/**
 * Specifies aht <FormItem/> equals <Form.Item/>
 * @type {FormItem}
 */
const FormItem = Form.Item;

/**
 * Passed in props: handleLogin()
 */
class NormalLoginForm extends React.Component {
    /**
     * Asynchronous programming:
     * (1) Post the username and password to the backend
     * (2) If succeed then print success message
     * (3) Then use handleLogin (data)
     * @param e
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                /* Use ` ` to concatenate javascript expressions */
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
                        message.success('Login Success')
                        this.props.handleLogin(data);
                    })
                    .catch((e) => {
                        console.log(e)
                        message.error('Login Failed.');
                    });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            /**
             * Passed the handleSubmit to the form of login
             * Values returned is equal to the each FormItem's name
             * <Link> could be used to direct pages
             */
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