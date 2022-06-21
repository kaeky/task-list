import { Task } from "src/task/entities/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @OneToMany(()=>Task,(task)=>task.userfk)
    tasks: Task[];
}
