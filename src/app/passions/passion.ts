import { User } from "../users/user";

export interface Passion{
    _id?: string,
    libelle: string,
    informations: string,
    sinceWhen: string,
    examples: string[],
    //ajout
    user: User
}