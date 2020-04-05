import React, { useState, useRef } from 'react';
import { Modal, Form, Input, Button, Carousel, message, Select, DatePicker } from 'antd';
import styled from 'styled-components';
import { get, post } from '../utils/requests';
import { saveToken } from '../utils/token';
import { useGlobalState } from '../state';
import IUser from '../interfaces/IUser';

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
    const { Option } = Select;

    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);

    const [registerLogin, setRegisterLogin] = useState(null);
    const [registerEmail, setRegisterEmail] = useState(null);
    const [registerPassword, setRegisterPassword] = useState(null);
    const [registerPasswordRepeat, setRegisterPasswordRepeat] = useState(null);
    const [registerCountry, setRegisterCountry] = useState(null);
    const [registerCity, setRegisterCity] = useState(null);
    const [registerGender, setRegisterGender] = useState(null);
    const [registerDateOfBirth, setRegisterDateOfBirth] = useState(null);

    const [user, setUser] = useGlobalState('user');

    const handleLogin = async () => {
        setLoading(true);

        if (!login || login.length === 0 || !password || password.length === 0) {
            message.warning('Musisz wypełnić wszystkie pola!');
            setLoading(false);
            return;
        }

        try {
            const API_RESPONSE_LOGIN = await post(
                'auth/login',
                {
                    username: login,
                    password: password,
                },
                { useToken: false },
            );

            if (API_RESPONSE_LOGIN) {
                saveToken(API_RESPONSE_LOGIN.token);

                const API_RESPONSE_USER = await get(`users/${14}`, { useToken: false });
                if (API_RESPONSE_USER) {
                    console.log(API_RESPONSE_USER);

                    setUser(API_RESPONSE_USER);
                }
            } else {
                message.warning('Podano niepoprawne dane.');
                setLoading(false);

                return;
            }

            // const userWithToken = await get('userwithtoken');
            // setUser(userWithToken.user);

            props.setVisible(false);
        } catch (err) {
            message.warning(err.map ? err.map((error: any) => error) : err.message);
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        setLoading(true);

        if (
            !registerCountry ||
            registerCountry.length === 0 ||
            !registerCity ||
            registerCity.length === 0 ||
            !registerGender ||
            registerGender.length === 0 ||
            !registerDateOfBirth ||
            registerDateOfBirth.length === 0
        ) {
            message.warning('Musisz wypełnić wszystkie pola!');
            setLoading(false);
            return;
        }

        if (registerGender !== 'male' && registerGender !== 'female' && registerGender !== 'other') {
            message.warning('Wybrano niepoprawną płeć.');
            setLoading(false);
            return;
        }

        if (!/\S+@\S+\.\S+/.test(registerEmail)) {
            message.warning('Podany adres email jest niepoprawny.');
            setLoading(false);
            return;
        }

        try {
            const API_RESPONSE = await post(
                'auth/register',
                {
                    username: registerLogin,
                    email: registerEmail,
                    password: registerPassword,
                    gender: registerGender,
                    dateOfBirth: registerDateOfBirth,
                    city: registerCity,
                    country: registerCountry,
                },
                { useToken: false },
            );

            if (API_RESPONSE) {
                let userData: IUser = API_RESPONSE;

                const API_RESPONSE_LOGIN = await post(
                    'auth/login',
                    {
                        username: registerLogin,
                        password: registerPassword,
                    },
                    { useToken: false },
                );

                if (API_RESPONSE_LOGIN) {
                    saveToken(API_RESPONSE_LOGIN.token);
                }

                setUser(userData);
                props.setVisible(false);
            } else {
                message.warning('Coś poszło nie tak. Spróbuj ponownie za jakiś czas.');
            }
        } catch (err) {
            message.warning(err.map ? err.map((error: any) => error) : err.message);
            setLoading(false);
        }
    };

    const handleOk = () => {
        if (slide === 0) {
            handleLogin();
        }

        if (slide === 1) {
            if (
                !registerLogin ||
                registerLogin.length === 0 ||
                !registerEmail ||
                registerEmail.length === 0 ||
                !registerPassword ||
                registerPassword.length === 0 ||
                !registerPasswordRepeat ||
                registerPasswordRepeat.length === 0
            ) {
                message.warning('Musisz wypełnić wszystkie pola!');
                return;
            }

            if (registerPassword !== registerPasswordRepeat) {
                message.warning('Podane hasła są różne');
                return;
            }

            changeSlide(2);
        }

        if (slide === 2) {
            handleRegister();
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
                slide === 2 ? (
                    <Button key="back" type="ghost" loading={loading} onClick={() => changeSlide(1)}>
                        Wróć
                    </Button>
                ) : (
                    ''
                ),
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    {slide === 0 ? 'Zaloguj' : slide === 1 ? 'Dalej' : 'Zarejestruj'}
                </Button>,
            ]}
        >
            <Carousel
                dots={false}
                ref={(ref) => {
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
                            <Input
                                onChange={(value) => setLogin(value.target.value)}
                                disabled={loading}
                                placeholder="jan.kowalski"
                            />
                        </Form.Item>
                        <Form.Item label="Hasło">
                            <Input
                                onChange={(value) => setPassword(value.target.value)}
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
                            <Input
                                onChange={(value) => setRegisterLogin(value.target.value)}
                                disabled={loading}
                                placeholder="jan.kowalski"
                            />
                        </Form.Item>
                        <Form.Item label="E-mail">
                            <Input
                                type="email"
                                onChange={(value) => setRegisterEmail(value.target.value)}
                                disabled={loading}
                                placeholder="jan@kowalski.pl"
                            />
                        </Form.Item>
                        <Form.Item label="Hasło">
                            <Input
                                onChange={(value) => setRegisterPassword(value.target.value)}
                                disabled={loading}
                                type="password"
                                placeholder="•••••••"
                            />
                        </Form.Item>
                        <Form.Item label="Powtórz hasło">
                            <Input
                                onChange={(value) => setRegisterPasswordRepeat(value.target.value)}
                                disabled={loading}
                                type="password"
                                placeholder="•••••••"
                            />
                        </Form.Item>
                        <Form.Item>
                            <a href="#" onClick={() => changeSlide(0)}>
                                Masz już konto? Zaloguj się
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
                        <Form.Item label="Kraj">
                            <Input
                                onChange={(value) => setRegisterCountry(value.target.value)}
                                disabled={loading}
                                placeholder="Polska"
                            />
                        </Form.Item>
                        <Form.Item label="Miasto">
                            <Input
                                onChange={(value) => setRegisterCity(value.target.value)}
                                disabled={loading}
                                placeholder="Opole"
                            />
                        </Form.Item>
                        <Form.Item label="Data urodzenia">
                            <DatePicker
                                style={{ width: '100%' }}
                                placeholder="1992-03-12"
                                onChange={(date) => setRegisterDateOfBirth(date)}
                            />
                        </Form.Item>
                        <Form.Item label="Płeć">
                            <Select
                                onChange={(value) => setRegisterGender(value)}
                                placeholder="Wybierz płeć"
                                allowClear
                            >
                                <Option value="male">Mężczyzna</Option>
                                <Option value="female">Kobieta</Option>
                                <Option value="other">Inna</Option>
                            </Select>
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
