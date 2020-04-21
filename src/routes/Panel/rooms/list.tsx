import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { get } from '../../../utils/requests';
import IMovie from '../../../interfaces/IMovie';
import { useHistory } from 'react-router-dom';
import IRoom from '../../../interfaces/IRoom';

export default function RoomsList() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    const columns: any = [
        {
            title: 'Numer sali',
            dataIndex: 'id',
            key: 'id',
            render: (val: number) => <span>Sala numer {val}</span>,
        },
        {
            title: 'Liczba miejsc',
            key: 'seats_count',
            render: (room: IRoom) => {
                let seatCount = 0;
                for (let i = 0; i < room.seatMap.length; i++) {
                    if (room.seatMap[i] !== '_' && room.seatMap[i] !== '\n') {
                        seatCount++;
                    }
                }

                return seatCount;
            },
        },
    ];

    let _isMounted = false;
    useEffect(() => {
        _isMounted = true;
        (async () => {
            const API_RESPONSE = await get('room/getall');
            if (API_RESPONSE) {
                _isMounted &&
                    setRooms(
                        API_RESPONSE.map((el: IMovie) => {
                            return { ...el, key: el.id };
                        }),
                    );
                _isMounted && setLoading(false);
            }

            return () => (_isMounted = false);
        })();
    }, []);

    return (
        <Table
            rowClassName="cursor-pointer"
            loading={loading}
            onRow={(record, rowIndex) => {
                return {
                    onClick: () => {
                        history.push(`/panel/rooms/${record.id}`);
                    },
                };
            }}
            dataSource={rooms}
            columns={columns}
        />
    );
}
