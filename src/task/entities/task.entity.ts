import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id_task: number;

    @Column()
    task: string;

    @Column({type: "timestamp", default: ()=> 'CURRENT_TIMESTAMP'})
    creation_task: string;
    
    @UpdateDateColumn()
    modify_task: Date;

    @Column()
    priority_task: number;

    @Column({type: "date"})
    endline_task: Date;

    @Column()
    complete: boolean;

    @ManyToOne(()=>User,(user)=>user.id_user)
    userfk: User;

}
