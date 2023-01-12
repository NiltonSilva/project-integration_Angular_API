import { LivroService } from './../../service/livro.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: [];
  campoBusca: string = '';
  subscription: Subscription

  constructor(private service: LivroService) { }

  buscarLivros() {
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      next: retornoAPI => console.log(),
      // o next pode ser chamado várias vezes dentro de um mesmo observable. Enquanto que o error e o complete só pode ser chamado uma vez cada.
      error: erro => console.error(erro),
      complete: () => console.log('Observable completado')
      // A notificação 'complete' só vai ser executada quando estiver tudo ok, ou seja, quando cair no 'next'. Se houver algum erro, o subscribe para de ser executado no 'error'.

    })
  }

  // Método para me desinscrever do Observable. Uso o ciclo de vida do Angular (ngOnDestroy). É uma boa pratica sempre me inscrever e após fazer o que preciso me desinscrever para liberar recursos e evitar vazamento de memória.
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}



