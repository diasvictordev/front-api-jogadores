import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JogadorDto } from 'src/app/api/models/jogador-dto';
import { JogadorControllerService } from 'src/app/api/services';
import { ConfirmationDialog } from 'src/app/core/confirmation-dialog/confirmation-dialog.component';
import {ConfirmationDialogResult} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
@Component({
  selector: 'app-form-tipo',
  templateUrl: './form-tipo.component.html',
  styleUrls: ['./form-tipo.component.scss']
})
export class FormTipoComponent {
  formGroup!: FormGroup;

  constructor (private formBuilder: FormBuilder,
    private jogadorService: JogadorControllerService,
    private dialog: MatDialog,
    ){
    this.createForm();
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
  console.log("Dados:", this.formGroup.value);
  this.jogadorService.incluir({body: this.formGroup.value}).subscribe( 
    retorno =>{
    console.log("Retorno:",retorno);
  this.confirmarInclusao(retorno);},
   erro=>{
      console.log("Erro:", erro);
      alert("Erro ao incluir");
    }
  )
  }
}

public handleError = (controlName: string, errorName: string) => {
  return this.formGroup.controls[controlName].hasError(errorName);
};

confirmarInclusao(jogadorDto: JogadorDto) {
  const dialogRef = this.dialog.open(ConfirmationDialog, {
    data: {
      titulo: 'Mensagem!!!',
      mensagem: `Inclusão de: ${jogadorDto.nome} (ID: ${jogadorDto.id}) realiza com sucesso!`,
      textoBotoes: {
        ok: 'ok',
      },
    },
  });

}
}
