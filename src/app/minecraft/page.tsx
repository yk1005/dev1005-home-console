'use client';
import { useState } from 'react';

import { Container, Toolbar, Tab, Tabs } from '@mui/material';
import OnlineUsersView from './views/OnlineUsers';


export default function Minecraft() {
    const [tab, setTab] = useState<number>(0);

    return (
        <Container maxWidth="lg" sx={{ paddingY: "16px" }}>
            <Tabs value={tab} onChange={(_, val) => { setTab(val) }}>
                <Tab label="Online Users" value={0}/>
            </Tabs>
            <Toolbar />

            {tab == 0 && <OnlineUsersView />}

        </Container>
    );
}
