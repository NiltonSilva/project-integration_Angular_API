import { VolumeInfo, ImageLinks, Item } from './../../models/interfaces';
import { LivroService } from './../../service/livro.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription, switchMap, map, filter, debounceTime } from 'rxjs';
import { Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { FormControl } from '@angular/forms';

const PAUSA: number = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  //listaLivros: Livro[];
  campoBusca = new FormControl();
  //subscription: Subscription
  //livro: Livro

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges
    .pipe(
      debounceTime(PAUSA),
      filter((valorDigitado) => valorDigitado.length >= 3),
      switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
      map((items) => /*this.listaLivros = */ this.livrosResultadoParaLivros(items))
      //
    )

  // buscarLivros() {
  //   this.subscription = this.service.buscar(this.campoBusca).subscribe({
  //     next: (itens) => {
  //       console.log('requisições ao servidor');
  //       this.listaLivros = this.livrosResultadoParaLivros(itens);
  //     },
  //     // o next pode ser chamado várias vezes dentro de um mesmo observable. Enquanto que o error e o complete só pode ser chamado uma vez cada.
  //     error: erro => console.error(erro),
  //     // A notificação 'complete' só vai ser executada quando estiver tudo ok, ou seja, quando cair no 'next'. Se houver algum erro, o subscribe para de ser executado no 'error'.

  //   })
  // }

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })

    /* É A MESMA COISA DO CÓDIGO QUE VEM LOGO A SEGUIR. PORÉM NO CÓDIGO DE CIMA USO UMA CLASSE (EM MODELS) PARA FAZER ESSA TRANSFORMAÇÃO */
    // const livros: Livro[] = []

    // items.forEach(item => {
    //   livros.push(this.livro = {
    //     title: item.volumeInfo?.title,
    //     authors: item.volumeInfo?.authors,
    //     publisher: item.volumeInfo?.publisher,
    //     publishedDate: item.volumeInfo?.publishedDate,
    //     description: item.volumeInfo?.description,
    //     previewLink: item.volumeInfo?.previewLink,
    //     thumbnail: item.volumeInfo?.imageLinks?.thumbnail
    //   })
    // })

    // return livros
  }

  // Método para me desinscrever do Observable. Uso o ciclo de vida do Angular (ngOnDestroy). É uma boa pratica sempre me inscrever e após fazer o que preciso me desinscrever para liberar recursos e evitar vazamento de memória.
  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }

}



