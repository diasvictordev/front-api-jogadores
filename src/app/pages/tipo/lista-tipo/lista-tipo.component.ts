import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { JogadorDto } from 'src/app/api/models/jogador-dto';
import {MatSnackBar} from "@angular/material/snack-bar";
import { JogadorControllerService } from 'src/app/api/services/jogador-controller.service';
import { ConfirmationDialog, ConfirmationDialogResult } from 'src/app/core/confirmation-dialog/confirmation-dialog.component';



@Component({
  selector: 'app-lista-tipo',
  templateUrl: './lista-tipo.component.html',
  styleUrls: ['./lista-tipo.component.scss']
})
export class ListaTipoComponent implements OnInit{
  colunasMostrar = ['id',
  'nome',
  'idade',
  'numeroCamisa',
  'time',
  'acao']
   tipoListaDataSource: MatTableDataSource <JogadorDto> = new MatTableDataSource<JogadorDto>([]);
  


  constructor(public jogadorcontrollerService: JogadorControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ){
  }

  ngOnInit(): void {
    this.buscarDados();
  }

  private buscarDados() {
    this.jogadorcontrollerService.listAll().subscribe(data => {
      this.tipoListaDataSource.data = data;
    })
  }

  remover(jogadorDto: JogadorDto){
    console.log("Removido", jogadorDto.id);
    this.jogadorcontrollerService.remover({id: jogadorDto.id || 0}).subscribe(retorno =>{
        this.buscarDados();
        this.showMensagemSimples("Excluído com sucesso !");
        console.log("Exclusão", retorno);
      }, error =>{
        if (error.status === 404) {
          this.showMensagemSimples("Ingresso cadastrado não existe mais!!");
        } else {
          this.showMensagemSimples("Erro ao excluir");
          console.log("Erro:", error);
        }
    }
    )

  }

  confirmarExcluir(jogadorDto: JogadorDto) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Confirmar?',
        mensagem: `A exclusão de: ${jogadorDto.nome} (ID: ${jogadorDto.id})?`,
        textoBotoes: {
          ok: 'Confirmar',
          cancel: 'Cancelar',
        },
        dado: jogadorDto
      },
    });
  }
  showMensagemSimples( mensagem: string, duracao: number = 2000) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: duracao,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}