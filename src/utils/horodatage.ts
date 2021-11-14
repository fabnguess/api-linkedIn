import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class Horodatage{
    @CreateDateColumn()
    dateCreation:Date

    @UpdateDateColumn()
    dateModification:Date

    @DeleteDateColumn()
    dateSuppression:Date
}