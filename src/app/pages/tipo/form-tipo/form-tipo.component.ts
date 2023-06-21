import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JogadorDto } from 'src/app/api/models/jogador-dto';
import { JogadorControllerService } from 'src/app/api/services/jogador-controller.service';
import { ConfirmationDialog } from 'src/app/core/confirmation-dialog/confirmation-dialog.component';
import {ConfirmationDialogResult} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import { ActivatedRoute, Router } from '@angular/router';
//import {Message, MessageService} from "../../../api/models/message-response";

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
    //private messageSevice: MessageService
    ){
    this.createForm();
    this.prepararEdicao();
    
  }


  createForm() {
    this.formGroup = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      idade: [null, [Validators.required]],
      numeroCamisa: [null, [Validators.required]],
      time: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    })
}

onSubmit() {
  if (this.formGroup.valid) {
    if(!this.id){
      this.realizarInclusao();
    }else{
      this.realizarEdicao();
    }
  }
}

private realizarInclusao() {
  console.log("Dados:", this.formGroup.value);
  this.jogadorService.incluir({body: this.formGroup.value})
    .subscribe(retorno => {
      console.log("Retorno:", retorno);
      this.confirmarAcao(retorno, this.ACAO_INCLUIR);
      this.router.navigate(["/tipo"]);
    }, erro => {
      console.log("Erro:" , erro);
    })
}

  
public handleError = (controlName: string, errorName: string) => {
  return this.formGroup.controls[controlName].hasError(errorName);
};



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
        mensagem: `A ação de ${acao} dados: ${jogadorDto.nome} (ID: ${jogadorDto.id}) foi realizada com sucesso!`,
        textoBotoes: {
          ok: 'ok',
        },
      },
    });
  }


private prepararEdicao() {
  const paramId = this.route.snapshot.paramMap.get('codigo');
  if(paramId) {
    const codigo = parseInt(paramId);
    console.log("codigo", paramId);
    this.jogadorService.obterPorId({id: codigo})
      .subscribe(retorno =>
    {
      this.acao = this.ACAO_EDITAR;
      this.id = retorno.id;
      console.log("retorno", retorno);
      this.formGroup.patchValue(retorno);
    }
    ,error => {
      console.log("erro", error);}
      )
  }
}



private realizarEdicao() {
  console.log("Dados:", this.formGroup.value);
  this.jogadorService.alterar({id: this.id, body: this.formGroup.value})
    .subscribe(retorno => {
      console.log("Retorno:", retorno);
      this.confirmarAcao(retorno, this.ACAO_EDITAR);
      this.router.navigate(["/tipo"]);
    }, erro => {
      console.log("Erro:", erro.error);
    })
}

}
