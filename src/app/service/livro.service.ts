import { Item, LivrosResultado } from './../models/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  // Observer representa a ideia de uma coleção de callbacks, que "ouvi" os valores entregues pelos Observables; ele é usado por meio do subscribe() fica na minha classe .ts
  // Observable representa uma ideia de uma coleção de valores ou coleção de eventos futuros
  buscar(valorDigitado: string): Observable<Item[]> {
    const params = new HttpParams().append('q', valorDigitado);
    return this.http.get<LivrosResultado>(this.API, { params })
     // .()pipe serve para agrupar diversos outros tipos de operadores; é por onde vai passar o fluxo de informações.
    .pipe(
      tap((retornoAPI) => console.log('Fluxo do TAP', retornoAPI)),
      map(resultado => resultado.items),
      tap(resultado => console.log('Fluxo após o MAP', resultado)
      )
    )
  }

}
