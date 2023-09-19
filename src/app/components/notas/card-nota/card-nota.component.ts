import { Component, Input } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { Nota } from '../../../models/nota';
import { Categoria } from '../../../models/categoria';

@Component({
  selector: 'app-nota',
  templateUrl: './card-nota.component.html',
  styleUrls: ['./card-nota.component.css']
})

export class NotaComponent {
  categoria: Categoria;

  @Input() nota: Nota = {
    id: 0,
    titulo: '',
    conteudo: '',
    tema: "warning",
    categoriaId: 1,
  }

  constructor(private categoriaService: CategoriaService) {
    this.carregarCategoria();
    this.categoria = new Categoria(0,'',);
  }

  carregarCategoria() {
    this.categoriaService.selecionarPorId(this.nota.categoriaId).subscribe((categoria) => {
      this.categoria = categoria;
    });
  }
}
