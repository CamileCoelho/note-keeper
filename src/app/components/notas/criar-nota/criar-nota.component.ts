import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotaService } from '../../../services/nota.service';
import { Nota } from '../../../models/nota';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-criar-nota',
  templateUrl: './criar-nota.component.html',
  styleUrls: ['./criar-nota.component.css']
})

export class CriarNotaComponent implements OnInit {
  categorias: Categoria[] = [];
  nota: Nota;
  categoriaSelecionada?: Categoria;

  ngOnInit(): void {
    this.carregarCategorias();    
  }

  constructor(private notaService: NotaService, private router: Router, private toastService: ToastrService, private categoriaService: CategoriaService) {
    this.carregarCategorias();
    this.nota = new Nota( '', '', 'success', 0, 1);
  }

  mostrarMensagem() {
    this.toastService.error('Você deve cadastrar uma categoria antes de cadastrar uma nota.', 'Nenhuma categoria cadastrada!');
    this.router.navigate(['/notas', 'listar']);
  }

  carregarCategorias() {
    this.categoriaService.selecionarTodos().subscribe((categorias) => {
      this.categorias = categorias;

      this.onCategoriaSelecionada(categorias[0].id!);

      if (this.categorias.length == 0) 
        this.mostrarMensagem();
    });
  }
  
  onCategoriaSelecionada(categoriaId: number): any {
    const categoria = this.categorias.find(categoria => categoria.id === categoriaId);
    this.categoriaSelecionada = categoria;
  }

  criarNota() {
    this.notaService.criar(this.nota).subscribe((nota) => {
      this.toastService.success('Nota criada com Sucesso!', 'Sucesso');
      this.router.navigate(['/notas', 'listar']);
    });
  }
}

