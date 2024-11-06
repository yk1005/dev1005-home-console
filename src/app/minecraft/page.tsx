'use client';
import { fetchOnlineUsers, User } from '@/actions/rcon';
import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';

export default function Minecraft() {
    const [users, setUsers] = useState<Array<User>>();

    useEffect(() => {
        fetchOnlineUsers()
            .then((users) => setUsers(users))
    }, [])

    return (
        <Container maxWidth="lg" sx={{ paddingY: "16px" }}>
            <Typography variant='h4'>Online Users</Typography>
            <Paper sx={{ marginY: "16px" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: "30%" }}>Name</TableCell>
                            <TableCell sx={{ width: "70%" }}>UUID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((user) => (
                            <TableRow key={user.uuid}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.uuid}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
}
