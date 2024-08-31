import { registerAs } from "@nestjs/config";

export enum ConfigKeys {
    App = "App",
    Db = "Db",
    Jwt = "Jwt"
}



const configApp = registerAs(ConfigKeys.App, () => ({
    port: 3000
}))

const configDb = registerAs(ConfigKeys.Db, () => ({
    port: 5432,
    host: "localhost",
    username: "postgres",
    password: "123456",

}))


const configJwt=registerAs(ConfigKeys.Jwt,()=>({
    accessToken:"dbb4e2e87aac8e36be36c80b5faefb410a408bf4",
    refreshToken:"fa13fd4dcd043515151184d7b71fe6ae8e752493"
}))


export const configuration = [configApp, configDb,configJwt]