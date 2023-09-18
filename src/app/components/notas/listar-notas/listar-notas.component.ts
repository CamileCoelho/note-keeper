import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotaService } from '../nota.service';
import { Nota } from '../nota';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';

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

    this.notaService.selecionarTodos().subscribe((notas) => {
      this.notas = notas;
    });
  }

  carregarCategorias() {
    this.categoriaService.selecionarTodos().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }
}