import { Categoria } from "./categoria";

export class Nota {
    id?: number;
    titulo: string;
    conteudo: string;
    tema: Tema;
    categoriaId: number;
    categoria?: Categoria;

    constructor(titulo: string, conteudo: string, tema: Tema, id: number, categoriaId: number) {
        this.id = id;
        this.titulo = titulo;
        this.conteudo = conteudo;
        this.tema = tema;
        this.categoriaId = categoriaId;
    }
}

type Tema = 'info' | 'warning' | 'danger' | 'success' | 'dark';
