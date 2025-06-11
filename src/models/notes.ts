/* 
 Model Definaltion for notes
*/
import { UserWithoutPassword } from "./user"

export interface Note {
    title: string,
    body: string,
    email: string,
    id?: string
}

export interface NotesWithUser {
    note: Note[],
    user: UserWithoutPassword
}