import { UtilisateurEntity } from "src/utilisateurs/entities/utilisateur.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Horodatage } from './../../utils/horodatage';


@Entity('articles')
export class ArticleEntity extends Horodatage {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text', nullable: false })
    contenu: string

    @ManyToOne(type => UtilisateurEntity, utilisateur => utilisateur.articles)
    auteur: UtilisateurEntity
}
