import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JogadorDto } from 'src/app/api/models/jogador-dto';
import { JogadorControllerService } from 'src/app/api/services';
import { ConfirmationDialog } from 'src/app/core/confirmation-dialog/confirmation-dialog.component';
import {ConfirmationDialogResult} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-form-tipo',
  templateUrl: './form-tipo.component.html',
  styleUrls: ['./form-tipo.component.scss']
})
export class FormTipoComponent {
  formGroup!: FormGroup;
  public readonly ACAO_INCLUIR = "Incluir";
  public readonly ACAO_EDITAR = "Editar";
  acao : string = this.ACAO_INCLUIR;
  id!: number;


  constructor (private formBuilder: FormBuilder,
    private jogadorService: JogadorControllerService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    ){
    this.createForm();
    this.prepararEdicao();
  }

  prepararEdicao(){
    const paramId = this.route.snapshot.paramMap.get('codigo');
    if (paramId){
      const codigo = parseInt(paramId);
      console.log("codigo",paramId);
      this.jogadorService.obterPorId({id: codigo}).subscribe(
        retorno => {
          this.acao = this.ACAO_EDITAR;
          console.log("retorno", retorno);
          this.id = retorno.id;
          this.formGroup.patchValue(retorno);
        },error => {
          console.log("erro", error);
          //this.messageService.addMsgWarning(`Erro ao buscar ID: ${codigo}, mensagem: ${error.message}`);
        }
      )
    }
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      idade: [null, [Validators.required]],
      numeroCamisa: [null, [Validators.required]],
      time: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    })
}

onSubmit(){
  if(this.formGroup.valid){
    if(!this.id){
      this.realizarInclusao();
    }
  else{
    this.realizarEdicao();
  }
  }
}
  realizarEdicao() {
    console.log("Dados:", this.formGroup.value);
    this.jogadorService.alterar({id: this.id, body: this.formGroup.value }).subscribe(
      retorno => {
        console.log("Retorno:", retorno);
        this.confirmarAcao(retorno, this.ACAO_EDITAR);
      },
      erro => {
        console.log("Erro:", erro);
        //this.showError(erro.Error, this.ACAO_EDITAR)

      }
    );
  }

public handleError = (controlName: string, errorName: string) => {
  return this.formGroup.controls[controlName].hasError(errorName);
};

  private realizarInclusao() {
    console.log("Dados:", this.formGroup.value);
    this.jogadorService.incluir({ body: this.formGroup.value }).subscribe(
      retorno => {
        console.log("Retorno:", retorno);
        this.confirmarAcao(retorno, this.ACAO_INCLUIR);
      },
      erro => {
        console.log("Erro:", erro);
        //this.showError(erro.Error, this.ACAO_INCLUIR);
      }
    );
  }

  /*showError(erro: MessageResponse, acao: string) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: `Erro ao ${acao}`,
        mensagem: erro.message,
        textoBotoes: {
          ok: 'ok',
        },
      },
    });
  
  }*/

confirmarAcao(jogadorDto: JogadorDto, acao: string) {
  const dialogRef = this.dialog.open(ConfirmationDialog, {
    data: {
      titulo: 'Mensagem!!!',
      mensagem: `Ação de ${acao} dados: ${jogadorDto.nome} (ID: ${jogadorDto.id}) realiza com sucesso!`,
      textoBotoes: {
        ok: 'ok',
      },
    },
  });

}
}
