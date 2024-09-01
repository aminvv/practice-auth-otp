import { UserEntity } from "src/modules/user/user/entities/user.entity";

declare global{
    namespace Express{
        interface Request{
            user?:UserEntity
        }
    }
}