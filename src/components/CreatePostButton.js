import React from 'react';
import { Modal, Button, message } from 'antd';
import { CreatePostForm } from './CreatePostForm';
import { API_ROOT, POS_KEY, TOKEN_KEY, AUTH_HEADER, LOC_SHAKE } from '../constants';

/**loadNearby Posts function is passed from Home.js to CreatePostButton.js
 * When CreatePostButton successfully changes the data at back end using post,
 * We call loadNearbyPosts in Home.js to re render the gallery. See Galleries'
 * Prototype to see what the attributes are needed.
 */
export class CreatePostButton extends React.Component {
    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
    }

    showModal = () => {
        console.log("showModal function in createPostButton.js script");
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        console.log("handleOK function in createPostButton.js script");
        this.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
                /**MAY NOT NEED THIS ANYMORE**/
                const token = localStorage.getItem(TOKEN_KEY);
                const formData = new FormData();
                formData.set('lat', lat + LOC_SHAKE * Math.random() * 2 - LOC_SHAKE);
                formData.set('lon', lon + LOC_SHAKE * Math.random() * 2 - LOC_SHAKE);
                formData.set('message', values.message);
                formData.set('image', values.image[0].Obj);
                console.log(values);
                this.setState({ confirmLoading: true });
                /**FETCH FUNCTION, REPLACE WITH FECTCH FROM THE NODE JS SERVER AND CHANG THE JSON INTO
                 *
                 * **/
                fetch(`${API_ROOT}/post`, {
                    method: 'POST',
                    headers: {
                        Authorization: `${AUTH_HEADER} ${token}`,
                    },
                    body: formData,
                }).then((response) => {
                    console.log(response);
                    if (response.ok) {
                        this.form.resetFields();
                        this.setState({ visible: false, confirmLoading: false });
                        return this.props.loadNearbyPosts();
                    }
                    throw new Error(response.statusText);
                })
                    .then(() => message.success('Post created successfully!'))
                    .catch((e) => {
                        console.log(e);
                        this.setState({ confirmLoading: false });
                        message.error('Failed to create the post.');
                    });
            }
        });
    }

    handleCancel = () => {
        console.log("handleCancel function in createPostBUTTON.js script");
        // console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }

    saveFormRef = (formInstance) => {
        console.log("saveFormRef function in createPostBUTTON.js script");
        this.form = formInstance;
    }

    render() {
        console.log("Render function in createPostBUTTON.js script");
        const { visible, confirmLoading } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Create New Post
                </Button>
                <Modal title="Create New Post"
                       visible={visible}
                       onOk={this.handleOk}
                       okText="Create"
                       confirmLoading={confirmLoading}
                       onCancel={this.handleCancel}
                >
                    <CreatePostForm ref={this.saveFormRef}/>
                </Modal>
            </div>
        );
    }
}