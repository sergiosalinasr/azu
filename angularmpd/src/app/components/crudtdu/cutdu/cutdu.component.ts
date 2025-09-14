import { Component } from '@angular/core';
import { format } from 'date-fns';
import { UtilsService } from '../../../services/utils.service';
import { Tdu } from '../../../models/tdu';
import { Delito } from '../../../models/delito';
import { TduService } from '../../../services/tdu.service'
import { DelitoService } from '../../../services/delito.service'
import { Tablacdu } from '../../../models/tablacdu';
import { TablacduService } from '../../../services/tablacdu.service'
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cutdu',
  templateUrl: './cutdu.component.html',
  styleUrl: './cutdu.component.css'
})
export class CutduComponent {

  selectedTdu: Tdu = new Tdu(0, "", "");
  tduIdEntrada: number = 0;
  tduNombreArray:Tdu[] = [];
  tduArray:Tdu[] = [];


  constructor(private tduService:TduService,
    private delitoService:DelitoService, 
    private router: Router, 
    private activerouter:ActivatedRoute, 
    private utilsService: UtilsService, 
    private tablacduService: TablacduService) { }

  ngOnInit(): void {

    // Lee el paramatro de entrada necesario para saber si es una nueva Tdu (=0) o es editar (>0)
    this.tduIdEntrada = Number(this.activerouter.snapshot.paramMap.get('id'));
    
    // Si estamos editando, cargamos los daos respectivos
    if ( this.tduIdEntrada > 0){
      this.tduService.tduById(this.tduIdEntrada).subscribe(data =>{
        this.selectedTdu = data[0];
      })
    };

    // Carga de tdues para validaciones: no repetir nombre de tdu
    this.tduService.tduLista().subscribe(data =>{
      this.tduArray = data;
    });

  }

  cancelar() {

    this.router.navigate(['menulateral/rdtdu']);

  }

  addOrEdit(){
    // Si estamos creando un registro:
    if (this.tduIdEntrada === 0 ) {
      let mensajeValidacion = this.datosValidos(this.selectedTdu);
      if ( mensajeValidacion != ""){
        alert(mensajeValidacion);
      } else {
        console.log("POST: this.selectedTdu: " + this.selectedTdu)
        this.tduService.postTdu(this.selectedTdu).subscribe({
          next: (data) => {
            let dataResponse: any = data;
            this.selectedTdu = new Tdu(0, "", "");
            this.router.navigate(['menulateral/rdtdu']);
          },
          error: (err) => {
            alert('Hubo un problema al crear la nueva fila en la tabla Tdu.');
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([this.router.url]);
            });
          }
        });
      }
    }  else {
      let mensajeValidacion = this.datosValidos(this.selectedTdu);
      if ( mensajeValidacion != ""){
        alert(mensajeValidacion);
      } else {
        this.tduService.putTdu(this.selectedTdu).subscribe({
          next: (data) => {
            let dataResponse: any = data;
            this.router.navigate(['menulateral/rdtdu']);
          },
          error: (err) => {
            alert('Hubo un problema al actualizar la tabla Tdu.');
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([this.router.url]);
            });
          }
        })
      }
    }
  }

  datosValidos(validando: Tdu ){

    let existe = false;

    if ( validando.nombreCorto === "" ) {
      return "Ingresar nombre del Tdu"
    }
    
    if ( this.existeTduNombre(validando.nombreCorto, validando.id) ) {
      return "Ese nombre de Tdu ya existe"
    }

    if ( validando.descripcionLarga === "" ) {
      return "Ingresar una descripción del Tdu"
    }
    
    return ""

  }


  convertirAMayusculas(valor: string): void {
    this.selectedTdu.nombreCorto = valor.toUpperCase();
  }  

  existeTduNombre(tdunombreCorto: string, id: number): boolean {
    console.log("Buscando nombre...: " + tdunombreCorto);
  
    // Buscar si hay un Tdu con el mismo nombre y un ID distinto al proporcionado
    const tduEncontrado = this.tduArray.find(
      (tdu) => tdu.nombreCorto === tdunombreCorto && tdu.id !== id
    );
  
    if (tduEncontrado) {
      console.log("Ese Tdu ya existe:", tduEncontrado);
      return true;
    } else {
      console.log("El Tdu no existe o tiene el mismo ID.");
      return false;
    }
  }

}


