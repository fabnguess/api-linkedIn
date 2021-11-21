import { ArticleEntity } from "src/article/entities/article.entity";
import { RoleUtilisateur } from "src/utils/role-enum"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Horodatage } from './../../utils/horodatage';

@Entity('utilisateurs')
export class UtilisateurEntity extends Horodatage {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nom: string

    @Column()
    prenoms: string

    @Column({ unique: true })
    email: string

    @Column({ select: false })
    motPasse: string

    @Column({ select: false })
    salt: string

    @Column({
        type: 'enum',
        enum: RoleUtilisateur,
        default: RoleUtilisateur.USER
    })
    role: string

    @OneToMany(type => ArticleEntity, article => article.auteur)
    articles: ArticleEntity[]
}
