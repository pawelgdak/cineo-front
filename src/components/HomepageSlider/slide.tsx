import React from 'react';
import styled from 'styled-components';
import { Row, Col, Button } from 'antd';
import { ClockCircleOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import colors from '../../resources/colors';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.4)), url("${(props) => props.image}");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    background-attachment: fixed;
    overflow: scroll;

    text-shadow: 0px 0px 10px rgba(0,0,0,0.1);
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: url('overlay.png');
`;

const Content = styled.div`
    padding: 0 64px;

    @media (max-width: 576px) {
        padding: 0 24px;
        padding-top: 200px;
    }

    padding-top: 200px;
`;

const Footer = styled(Row)`
    padding: 0 64px;

    @media (max-width: 576px) {
        padding: 0 24px;
        padding-bottom: 64px;
    }
`;

const Ratings = styled(Row)``;
const Rating = styled.span`
    font-family: 'Monoton';
    font-size: 42px;
    color: rgba(255, 255, 255, 0.4);
`;

const Info = styled.span`
    color: white;
    font-family: 'Poppins';
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
`;

const Icon = styled.div`
    margin-right: 8px;
    display: inline-block;
`;

const Title = styled.span`
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 82px;
    line-height: 82px;
    margin: 16px 0;
    color: white;
    text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.3);

    @media (max-width: 768px) {
        font-size: 64px;
        line-height: 64px;
    }

    @media (max-width: 576px) {
        font-size: 48px;
        line-height: 48px;
    }
`;

const Description = styled.span`
    font-family: 'Poppins';
    font-weight: 400;
    font-size: 14px;
    color: white;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const DescriptionContainer = styled.div`
    max-width: 600px;
`;

const StyledButton = styled(Button)`
    color: white;
    height: 56px;
    padding: 9.4px 31px;
    font-size: 22px;

    &:hover {
        color: ${colors.primary};
    }
`;

const Actor = styled.div`
    font-family: 'Poppins';
    color: rgba(255, 255, 255, 0.6);
`;

export default function Slide(props: any) {
    const image = props.data.image;
    const history = useHistory();
    const { width } = useWindowDimensions();

    const buyTicket = () => {
        history.push(`/seanse/${props.data.id}`);
    };

    return (
        <Container image={image}>
            <Overlay />
            <Content>
                <Row gutter={24}>
                    <Col>
                        <Info>
                            <Icon>
                                <VideoCameraOutlined style={{ color: colors.primary }} />
                            </Icon>{' '}
                            {props.data.genre}
                        </Info>
                    </Col>
                    <Col>
                        <Info>
                            <Icon>
                                <ClockCircleOutlined style={{ color: colors.primary }} />
                            </Icon>{' '}
                            {props.data.duration}
                        </Info>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ margin: '24px 0' }}>
                        <Title>{props.data.title}</Title>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DescriptionContainer>
                            <Description>{props.data.description}</Description>
                        </DescriptionContainer>
                    </Col>
                </Row>
                <Row style={{ marginTop: 24 }}>
                    <Col>
                        <StyledButton onClick={() => buyTicket()} size="large" type="ghost">
                            Kup bilet
                        </StyledButton>
                    </Col>
                </Row>
            </Content>
            <Footer style={{ marginTop: 64 }}>
                <Col xs={24} sm={24} md={12} span={12}>
                    <Row>
                        <Col>
                            <Row>
                                <Info>Obsada</Info>
                            </Row>
                            <Row gutter={[32, 18]}>
                                {props.data.cast &&
                                    props.data.cast.map((actor: string, index: Number) => (
                                        <Col span={8} key={index.toString()}>
                                            <Actor>{actor}</Actor>
                                        </Col>
                                    ))}
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={24} md={12} span={12}>
                    <Ratings justify={width > 768 ? 'end' : 'start'} gutter={84} style={{ marginRight: 0 }}>
                        <Col xs={0} sm={0} md={10}></Col>
                        <Col xs={24} sm={24} md={7}>
                            <Row justify={width > 768 ? 'end' : 'start'}>
                                <Info>IMDB</Info>
                            </Row>
                            <Row justify={width > 768 ? 'end' : 'start'}>
                                <Rating>{props.data.imdbScore.toFixed(1)}</Rating>
                            </Row>
                        </Col>
                        <Col xs={24} sm={24} md={7}>
                            <Row justify={width > 768 ? 'end' : 'start'}>
                                <Info>Metacritic</Info>
                            </Row>
                            <Row justify={width > 768 ? 'end' : 'start'}>
                                <Rating>{props.data.metacriticScore}%</Rating>
                            </Row>
                        </Col>
                    </Ratings>
                </Col>
            </Footer>
        </Container>
    );
}
