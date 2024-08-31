import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";


@Entity("otp")
export class OtpEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    code: string

    @Column()
    userId: number


    @Column()
    expires_in: Date

    @OneToOne(() => UserEntity, (user) => user.otp, { onDelete: "CASCADE" })
    user:UserEntity

}




