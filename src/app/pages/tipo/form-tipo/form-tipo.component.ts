import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JogadorControllerService } from 'src/app/api/services';


@Component({
  selector: 'app-form-tipo',
  templateUrl: './form-tipo.component.html',
  styleUrls: ['./form-tipo.component.scss']
})
export class FormTipoComponent {
  formGroup!: FormGroup;

  constructor (private formBuilder: FormBuilder,
    private jogadorService: JogadorControllerService
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
    retorno => {
      console.log("Retorno:", retorno);
        alert("Incluido com sucesso! Mensagem: "+ retorno.id)
    }, erro=>{
      console.log("Erro:", erro);
      alert("Erro ao incluir");
    }
  )
  }
}

public handleError = (controlName: string, errorName: string) => {
  return this.formGroup.controls[controlName].hasError(errorName);
};
}
