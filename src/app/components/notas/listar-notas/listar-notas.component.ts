import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotaService } from '../../../services/nota.service';
import { Nota } from '../../../models/nota';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-listar-notas',
  templateUrl: './listar-notas.component.html',
  styleUrls: ['./listar-notas.component.css']
})

export class ListarNotasComponent implements OnInit {
  notas: Nota[] = [];
  categorias: Categoria[] = [];
  constructor(private route: ActivatedRoute, private notaService: NotaService, private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.carregarCategorias();

    this.notaService.selecionarTodosComCategoria().subscribe((notas) => {
      this.notas = notas;
    });
  }

  carregarCategorias() {
    this.categoriaService.selecionarTodos().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }
}