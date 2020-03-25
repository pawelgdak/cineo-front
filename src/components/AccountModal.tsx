import React, { useState, useRef } from 'react';
import { Modal, Form, Input, Button, Carousel, message } from 'antd';
import styled from 'styled-components';

const Heading = styled.p`
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 18px;
`;

export default function AccountModal(props: { visible: boolean; setVisible: Function }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [slide, setSlide] = useState(0);
    const slider: any = useRef();

    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);

    const handleLogin = () => {
        setLoading(true);

        if (!login || login.length === 0 || !password || password.length === 0) {
            message.warning('Musisz wypełnić wszystkie pola!');
            setLoading(false);
            return;
        }
    };

    const handleOk = () => {
        setLoading(true);

        if (slide === 0) {
            handleLogin();
        }
    };

    const changeSlide = (slide: number) => {
        if (loading) return;

        setSlide(slide);
        slider.current.goTo(slide);
    };

    return (
        <Modal
            title="Zaloguj się"
            onCancel={() => props.setVisible(false)}
            onOk={() => {}}
            visible={props.visible}
            footer={[
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    {slide === 0 ? 'Zaloguj' : 'Zarejestruj'}
                </Button>,
            ]}
        >
            <Carousel
                dots={false}
                ref={ref => {
                    slider.current = ref;
                }}
            >
                <div>
                    <Heading>Zaloguj się do swojego konta</Heading>
                    <Form
                        layout="vertical"
                        form={form}
                        initialValues={{
                            layout: 'vertical',
                        }}
                    >
                        <Form.Item label="Login">
                            <Input onChange={value => setLogin(value)} disabled={loading} placeholder="jan.kowalski" />
                        </Form.Item>
                        <Form.Item label="Hasło">
                            <Input
                                onChange={value => setPassword(value)}
                                disabled={loading}
                                type="password"
                                placeholder="•••••••"
                            />
                        </Form.Item>
                        <Form.Item>
                            <a href="#" onClick={() => changeSlide(1)}>
                                Nie masz jeszcze konta? Załóż konto i zdobywaj bonusy!
                            </a>
                        </Form.Item>
                    </Form>
                </div>
                <div>
                    <Heading>Załóż konto</Heading>
                    <Form
                        layout="vertical"
                        form={form}
                        initialValues={{
                            layout: 'vertical',
                        }}
                    >
                        <Form.Item label="Login">
                            <Input disabled={loading} placeholder="jan.kowalski" />
                        </Form.Item>
                        <Form.Item label="Hasło">
                            <Input disabled={loading} type="password" placeholder="•••••••" />
                        </Form.Item>
                        <Form.Item label="Powtórz hasło">
                            <Input disabled={loading} type="password" placeholder="•••••••" />
                        </Form.Item>
                        <Form.Item>
                            <a href="#" onClick={() => changeSlide(0)}>
                                Masz już konto? Zaloguj się
                            </a>
                        </Form.Item>
                    </Form>
                </div>
            </Carousel>
        </Modal>
    );
}
