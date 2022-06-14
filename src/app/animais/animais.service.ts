import { environment } from './../../environments/environment';
import { TokenService } from './../autenticacao/token.service';
import { Animais, Animal } from './animais';
import { catchError, mapTo, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

  const API = environment.apiUrl;
  const NOT_MODIFIED = '304';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  listDoUsuario(nomeDoUsuario: string): Observable<Animais> {
    return this.httpClient.get<Animais>(`${API}/${nomeDoUsuario}/photos`);
  }

  buscaPorId(id:number) : Observable<Animal>{
    return this.httpClient.get<Animal>(`${API}/photos/${id}`);
  }

  excluiAnimal(id: number): Observable<Animal>{
    return this.httpClient.delete<Animal>(`${API}/photos/${id}`);
  }

  curtir(id:number): Observable<boolean> {
    return this.httpClient.post(`${API}/photos/${id}/like`, {}, {observe: 'response'}).pipe(
      mapTo(true), catchError((error) => {
        return error.status === NOT_MODIFIED ? of(false) : throwError(error);
      })
    );
  }
}
