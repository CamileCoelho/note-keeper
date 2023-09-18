import { Component } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotaService } from '../../notas/nota.service';
import { Categoria } from '../categoria';

@Component({
  selector: 'app-excluir-categoria',
  templateUrl: './excluir-categoria.component.html',
  styleUrls: ['./excluir-categoria.component.css']
})

export class ExcluirCategoriaComponent {
  categoria: Categoria;

  constructor(private categoriaService: CategoriaService, private router: Router, private toastService: ToastrService, private route: ActivatedRoute, private notaService: NotaService) {
    this.categoria = new Categoria(0, "");
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id') as string);

    this.notaService.selecionarPorCategoria(id).subscribe((notas) => {
      if (notas.length > 0) 
        this.mostrarMensagem();
    });

    this.categoriaService.selecionarPorId(id).subscribe((categoria) => { this.categoria = categoria; });
  }

  mostrarMensagem() {
    this.toastService.error('A categoria selecionada pertence a uma nota.', 'Não é possível excluí-la!');
    this.router.navigate(['/categorias', 'listar']);
  }

  excluirCategoria() {
    this.categoriaService.excluir(this.categoria).subscribe((categoria) => {
      this.toastService.success('Categoria excluída com sucesso!', 'Sucesso');
      this.router.navigate(['/categorias', 'listar']);
    });
  }
}
