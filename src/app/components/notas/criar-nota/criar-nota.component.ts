import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotaService } from '../nota.service';
import { Nota } from '../nota';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';

@Component({
  selector: 'app-criar-nota',
  templateUrl: './criar-nota.component.html',
  styleUrls: ['./criar-nota.component.css']
})

export class CriarNotaComponent implements OnInit {
  categorias: Categoria[] = [];
  nota: Nota;

  ngOnInit(): void {
    this.carregarCategorias();
  }

  constructor(private notaService: NotaService, private router: Router, private toastService: ToastrService, private categoriaService: CategoriaService) {
    this.carregarCategorias();
    this.nota = new Nota( '', '', 'success', 0, 1);
  }

  get categoriaSelecionada(): any {
    return this.categorias.find(categoria => categoria.id === this.nota.categoriaId);
  }

  mostrarMensagem() {
    this.toastService.error('Você deve cadastrar uma categoria antes de cadastrar uma nota.', 'Nenhuma categoria cadastrada!');
    this.router.navigate(['/notas', 'listar']);
  }

  carregarCategorias() {
    this.categoriaService.selecionarTodos().subscribe((categorias) => {
      this.categorias = categorias;

      if (this.categorias.length == 0) this.mostrarMensagem();
    });
  }

  encontrarCategoriaPorId(id: number): any {
    return this.categorias.find(categoria => categoria.id === id);
  }

  criarNota() {
    this.notaService.criar(this.nota).subscribe((nota) => {
      this.toastService.success('Nota criada com Sucesso!', 'Sucesso');
      this.router.navigate(['/notas', 'listar']);
    });
  }
}

