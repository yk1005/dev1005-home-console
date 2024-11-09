'use server';

import { Rcon } from "rcon-client";

const RCON_HOST = process.env.SECRET_RCON_HOST ?? "localhost";
const RCON_PORT = process.env.SECRET_RCON_PORT ? parseInt(process.env.SECRET_RCON_PORT) : 25575;
const RCON_PASSWORD = process.env.SECRET_RCON_PASSWORD ?? "password";

export type User = {
    name: string
    uuid: string
}

export async function fetchOnlineUsers() {
    try {
        const conn = await Rcon.connect({ host: RCON_HOST, port: RCON_PORT, password: RCON_PASSWORD })
        const res = await conn.send("list uuids")
        conn.end()

        const users: Array<User> = res.split(":")[1].split(",").map((value) => {
            const user: User = {
                name: value.match(/[^\(].*\(/)?.[0].replaceAll(" ", "").replaceAll("(", "") ?? "",
                uuid: value.match(/\(.*\)/)?.[0].replaceAll("(", "").replaceAll(")", "") ?? ""
            }

            return user
        }).filter((user) => user.name && user.uuid)

        return users

    } catch (error) {
        console.error(error)
    }
}
