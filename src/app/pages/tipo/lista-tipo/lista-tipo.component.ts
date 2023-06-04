import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { JogadorDto } from 'src/app/api/models/jogador-dto';
import { JogadorControllerService } from 'src/app/api/services/jogador-controller.service';

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
  'time']
   tipoListaDataSource: MatTableDataSource <JogadorDto> = new MatTableDataSource<JogadorDto>([]);


  constructor(public jogadorcontrollerService: JogadorControllerService){
  }

  ngOnInit(): void {
    this.jogadorcontrollerService.listAll().subscribe(
      data => {
        this.tipoListaDataSource.data = data;
      }
    );
  }

}
