import { Component } from '@angular/core';
import { format } from 'date-fns';
import { UtilsService } from '../../../services/utils.service';
import { Cdu } from '../../../models/cdu';
import { Tdu } from '../../../models/tdu';
import { CduService } from '../../../services/cdu.service'
import { TduService } from '../../../services/tdu.service'
import { Tablacdu } from '../../../models/tablacdu';
import { TablacduService } from '../../../services/tablacdu.service'
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cucdu',
  templateUrl: './cucdu.component.html',
  styleUrl: './cucdu.component.css'
})
export class CucduComponent {

  selectedCdu: Cdu = new Cdu(0, "", "", 0);
  cduIdEntrada: number = 0;
  idTdu: number = 0;
  tduArray: Tdu[] = [];
  tduSancionArray: Tablacdu[] = [];
  tduNivelgravedadArray: Tablacdu[] = [];
  cduNombreArray:Cdu[] = [];
  cduArray:Cdu[] = [];
  env_tdu_sancion = environment.env_tdu_sancion;
  env_tdu_nivelgravedad = environment.env_tdu_nivelgravedad;

  constructor(private cduService:CduService,
    private tduService:TduService, 
    private router: Router, 
    private activerouter:ActivatedRoute, 
    private utilsService: UtilsService, 
    private tablacduService: TablacduService) { }

  ngOnInit(): void {

    // Lee el paramatro de entrada necesario para saber si es una nueva Cdu (=0) o es editar (>0)
    this.cduIdEntrada = Number(this.activerouter.snapshot.paramMap.get('id'));
    this.idTdu = Number(this.activerouter.snapshot.paramMap.get('id_tdu'));
    
    // Si estamos editando, cargamos los daos respectivos
    if ( this.cduIdEntrada > 0){
      this.cduService.cduById(this.cduIdEntrada).subscribe(data =>{
        this.selectedCdu = data[0];
      })
    } else {
      this.selectedCdu.id_tdu = this.idTdu
    };

    // Carga de cdues para validaciones: no repetir nombre de cdu
    this.cduService.cduLista().subscribe(data =>{
      this.cduArray = data;
    });

    // Carga de Tdu para Seleccion
    this.tduService.tduLista().subscribe(data =>{
      this.tduArray = data;
    });

  }

  cancelar() {

    this.router.navigate(['menulateral/rdcdu', this.idTdu]);

  }

  addOrEdit(){
    // Si estamos creando un registro:
    if (this.cduIdEntrada === 0 ) {
      let mensajeValidacion = this.datosValidos(this.selectedCdu);
      if ( mensajeValidacion != ""){
        alert(mensajeValidacion);
      } else {
        console.log("POST: this.selectedCdu: " + this.selectedCdu)
        this.cduService.postCdu(this.selectedCdu).subscribe({
          next: (data) => {
            let dataResponse: any = data;
            this.selectedCdu = new Cdu(0, "", "", 0);
            this.router.navigate(['menulateral/rdcdu', this.idTdu]);
          },
          error: (err) => {
            alert('Hubo un problema al crear la nueva fila en la tabla Cdu.');
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([this.router.url]);
            });
          }
        });
      }
    }  else {
      let mensajeValidacion = this.datosValidos(this.selectedCdu);
      if ( mensajeValidacion != ""){
        alert(mensajeValidacion);
      } else {
        this.cduService.putCdu(this.selectedCdu).subscribe({
          next: (data) => {
            let dataResponse: any = data;
            this.router.navigate(['menulateral/rdcdu', this.idTdu]);
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
  }

  datosValidos(validando: Cdu ){

    let existe = false;

    if ( validando.nombreCorto === "" ) {
      return "Ingresar nombre del Cdu"
    }
    
    if ( this.existeCduNombre(validando.nombreCorto, validando.id) ) {
      return "Ese nombre de Cdu ya existe"
    }

    if ( validando.descripcionLarga === "" ) {
      return "Ingresar una descripción del Cdu"
    }

    if ( validando.id_tdu === 0 ) {
      return "Ingresar una TDU al CDU"
    }

    return ""

  }

  // Carga lista de Sanciones para seleccion en pantalla
  cargaTduSancion(){
    this.tablacduService.getCDUsByTDU(this.env_tdu_sancion).subscribe({
      next: (data) => {
        this.tduSancionArray = data;
      },
      error: (err) => {
      }
    });
  }

  // Carga lista de Niveles de Graveadad para seleccion en pantalla
  cargaTduNivelgravedad(){
    this.tablacduService.getCDUsByTDU(this.env_tdu_nivelgravedad).subscribe({
      next: (data) => {
        this.tduNivelgravedadArray = data;
      },
      error: (err) => {
      }
    });
  }

  convertirAMayusculas(valor: string): void {
    this.selectedCdu.nombreCorto = valor.toUpperCase();
  }
  
  existeCduNombre(cduNombre: string, id: number): boolean {
    console.log("Buscando nombre...: " + cduNombre);
  
    // Buscar si hay un Cdu con el mismo nombre y un ID distinto al proporcionado
    const cduEncontrado = this.cduArray.find(
      (cdu) => cdu.nombreCorto === cduNombre && cdu.id !== id
    );
  
    if (cduEncontrado) {
      console.log("Ese Cdu ya existe:", cduEncontrado);
      return true;
    } else {
      console.log("El Cdu no existe o tiene el mismo ID.");
      return false;
    }
  }

  

}
