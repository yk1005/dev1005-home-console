'use client';
import { useEffect, useState } from 'react';

import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, Container, Button, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import { fetchOnlineUsers, User } from '@/actions/rcon';

export default function Minecraft() {
    const [isLoading, setIsLoading] = useState<boolean>();
    const [users, setUsers] = useState<Array<User>>();

    const refresh = () => {
        setIsLoading(true)

        fetchOnlineUsers()
            .then((users) => setUsers(users))
            .finally(() => { setIsLoading(false) })
    }

    useEffect(() => {
        refresh()
    }, [])

    return (
        <Container maxWidth="lg" sx={{ paddingY: "16px" }}>
            <Box display={"flex"}>
                <Typography variant='h4' flexGrow={1}>Online Users</Typography>
                <Box alignContent={"center"}>
                    <Button variant='outlined' onClick={() => refresh()}>
                        <RefreshIcon />
                    </Button>
                </Box>
            </Box>
            <Paper sx={{ marginY: "16px" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: "30%" }}>Name</TableCell>
                            <TableCell sx={{ width: "70%" }}>UUID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={2} align='center'>
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        )}

                        {!isLoading && (
                            users?.length ? users.map((user) => (
                                <TableRow key={user.uuid}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.uuid}</TableCell>
                                </TableRow>
                            )) :
                                <TableRow>
                                    <TableCell colSpan={2}>
                                        <Typography>No online users.</Typography>
                                    </TableCell>
                                </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
}
