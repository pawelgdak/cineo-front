import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export default function Page404() {
    const history = useHistory();
    return (
        <Container>
            <Result
                //@ts-ignore
                status="404"
                title="404"
                subTitle="Wybacz, strona którą chcesz odwiedzić nie istnieje."
                extra={
                    <Button onClick={() => history.push('/')} type="primary">
                        Powrót
                    </Button>
                }
            />
        </Container>
    );
}
