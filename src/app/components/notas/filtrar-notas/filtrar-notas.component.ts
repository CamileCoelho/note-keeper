import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Nota } from '../nota';
import { NotaService } from '../nota.service';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';

@Component({
  selector: 'app-filtrar-notas',
  templateUrl: './filtrar-notas.component.html',
  styleUrls: ['./filtrar-notas.component.css']
})
export class FiltrarNotasComponent implements OnInit {
  notas: Nota[] = [];
  categorias: Categoria[] = [];

  constructor(private route: ActivatedRoute, private notaService: NotaService, private categoriaService: CategoriaService, private router: Router, private toastService: ToastrService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = parseInt(params.get('categoriaId') as string);
      
      this.carregarCategorias();

      this.notaService.selecionarPorCategoria(id).subscribe((notas) => {
        this.notas = notas;
      
        if (notas.length == 0) 
          this.mostrarMensagem();
      });
    });
  }

  carregarCategorias() {
    this.categoriaService.selecionarTodos().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  mostrarMensagem() {
    this.toastService.warning('Nenhuma nota cadastrada na categoria selecionada!', 'Lista Vazia');
    this.router.navigate(['/notas', 'listar']);
  }
}
