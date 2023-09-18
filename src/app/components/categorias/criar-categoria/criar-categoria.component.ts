import { Component } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Categoria } from '../categoria';

@Component({
  selector: 'app-criar-categoria',
  templateUrl: './criar-categoria.component.html',
  styleUrls: ['./criar-categoria.component.css']
})

export class CriarCategoriaComponent {
  categoria: Categoria;

  constructor(private categoriaService: CategoriaService, private toastService: ToastrService, private router: Router) {
    this.categoria = new Categoria(0,'')
  }

  criarCategoria() {
    this.categoriaService.criar(this.categoria).subscribe((categoria) => {
      this.toastService.success('Categoria criada com Sucesso!', 'Sucesso');
      this.router.navigate(['/categorias', 'listar']);
    });
  }
}
