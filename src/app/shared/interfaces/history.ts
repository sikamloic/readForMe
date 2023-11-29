export interface History {
    id: string
    titre: string,
    text: string,
    public: boolean,
    user: {
        id: string,
        pseudo: string
    }
}
