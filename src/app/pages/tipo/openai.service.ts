import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions'; // Substitua pela URL correta da API do ChatGPT
  private apiKey = ''; // Substitua pela sua chave de API válida

  constructor(private http: HttpClient) { }

  public enviarMensagem(mensagem: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [{"role": "user", "content": `Liste os times e anos que já jogou o  jogador ${mensagem}`}],
      // Não está passando o nome do jogador
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
