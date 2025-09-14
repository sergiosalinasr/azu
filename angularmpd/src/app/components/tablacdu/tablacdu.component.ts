import { Component } from '@angular/core';
import { Tablacdu } from '../../models/tablacdu';
import { TablacduService } from '../../services/tablacdu.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-tablacdu',
  templateUrl: './tablacdu.component.html',
  styleUrl: './tablacdu.component.css'
})
export class TablacduComponent {

  tablacduArray:Tablacdu[] = [];
  arreglo:Tablacdu[] = [];

  selectedTablacdu: Tablacdu = new Tablacdu(0, 0, "", "");
  
  filaEditando= {
    id: 0,
    id_tdu: 0,
    nombreCorto: "",
    descripcionLarga: ""
  }

  constructor(private tablacduService:TablacduService, private router: Router) { }

  ngOnInit(): void {
    this.tablacduService.tablaCduLista().subscribe(data =>{
      this.tablacduArray = data;
    })
  }

  datosValidos(validando: Tablacdu ){
    if ( validando.id_tdu < 1 || validando.nombreCorto === "" || validando.descripcionLarga === "" ){
      return false
    }
    return true
  }

  addOrEdit(){
    // Si estamos creando un registro:
    if (this.selectedTablacdu.id === 0 ) {
      if ( !this.datosValidos(this.selectedTablacdu)){
        alert('Debe ingrasar datos válidos al agregar');
      } else {
        this.tablacduService.postTablacdu(this.selectedTablacdu).subscribe({
          next: (data) => {
            let dataResponse: any = data;
            let arreglo = {
              id: dataResponse.id,
              id_tdu: dataResponse.id_tdu,
              nombreCorto: dataResponse.nombreCorto,
              descripcionLarga: dataResponse.descripcionLarga
            };
            this.tablacduArray.push(arreglo);
          },
          error: (err) => {
            
            alert('Hubo un problema al crear la nueva fila en la tabla CDU.');

            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([this.router.url]);
            });
          }
        });
      }
    }  else {
      if ( !this.datosValidos(this.selectedTablacdu)){
        this.refrescaFila();
        alert('Debe ingrasar datos válidos al actualizar');

      } else {
        this.tablacduService.putTablacdu(this.selectedTablacdu).subscribe({
          next: (data) => {
            let dataResponse: any = data;

          },
          error: (err) => {

            alert('Hubo un problema al actualizar la tabla CDU.');
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([this.router.url]);
            });
          }
        })
      }
    }
    
    this.selectedTablacdu = new Tablacdu(0, 0, "", "");
  }

  copiaFilaEditando(tablacdu: Tablacdu){

    this.filaEditando.id = tablacdu.id;
    this.filaEditando.id_tdu = tablacdu.id_tdu;
    this.filaEditando.nombreCorto = tablacdu.nombreCorto;
    this.filaEditando.descripcionLarga = tablacdu.descripcionLarga;
  }

  refrescaFila(){
    this.selectedTablacdu.id_tdu = this.filaEditando.id_tdu;
    this.selectedTablacdu.nombreCorto = this.filaEditando.nombreCorto;
    this.selectedTablacdu.descripcionLarga = this.filaEditando.descripcionLarga;
  }

  openForEdit(tablacdu: Tablacdu){

    this.copiaFilaEditando(tablacdu);

    if ( this.selectedTablacdu.id === 0){
      this.selectedTablacdu = tablacdu;
    } 
    else {
      this.selectedTablacdu = new Tablacdu(0, 0, "", "");
    }
    
  }

  delete(){
    if (confirm("Are yu sure you want to deleted it?")){
      const selectedTablacdu_id_antes = this.selectedTablacdu.id
      this.tablacduService.deleteTablacdu(this.selectedTablacdu).subscribe({
        next: (data) => {
          this.tablacduArray = this.tablacduArray.filter(item => item.id !== selectedTablacdu_id_antes);
        },
        error: (err) => {
          alert('Hubo un problema al BORRAR la fila en la tabla CDU.');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.router.url]);
          });
        }
      })
      this.selectedTablacdu = new Tablacdu(0, 0, "", "");
    }
  }


}
