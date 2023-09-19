import { Injectable } from "@angular/core";
import { Nota } from "../models/nota";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class NotaService {
    private API_URL = 'http://localhost:3000/notas/'

    constructor(private http: HttpClient) {}

    criar(nota: Nota) {
        return this.http.post<Nota>(this.API_URL, nota);
    }

    editar(nota: Nota) {
        return this.http.put<Nota>(this.API_URL + nota.id, nota);
    }

    excluir(nota: Nota) {
        return this.http.delete<Nota>(this.API_URL + nota.id);
    }

    selecionarPorId(id: number): Observable<Nota> {
        return this.http.get<Nota>(this.API_URL + id);
    }

    selecionarTodos(): Observable<Nota[]> {
        return this.http.get<Nota[]>(this.API_URL);
    }

    selecionarPorCategoria(id: number) {
        return this.http.get<Nota[]>("http://localhost:3000/categorias/" + id + "/notas/?_expand=categoria");
    }

    selecionarTodosComCategoria() {
        return this.http.get<Nota[]>("http://localhost:3000/notas/?_expand=categoria");
    }
}