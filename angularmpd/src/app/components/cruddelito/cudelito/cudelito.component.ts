import { Component } from '@angular/core';
import { format } from 'date-fns';
import { UtilsService } from '../../../services/utils.service';
import { Delito } from '../../../models/delito';
import { Ley } from '../../../models/ley';
import { DelitoService } from '../../../services/delito.service'
import { LeyService } from '../../../services/ley.service'
import { Tablacdu } from '../../../models/tablacdu';
import { TablacduService } from '../../../services/tablacdu.service'
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cudelito',
  templateUrl: './cudelito.component.html',
  styleUrl: './cudelito.component.css'
})
export class CudelitoComponent {

  selectedDelito: Delito = new Delito(0, 0, "", "", 0, 0);
  delitoIdEntrada: number = 0;
  id_Ley: number = 0;
  leyArray: Ley[] = [];
  tduSancionArray: Tablacdu[] = [];
  tduNivelgravedadArray: Tablacdu[] = [];
  delitoNombreArray:Delito[] = [];
  delitoArray:Delito[] = [];
  env_tdu_sancion = environment.env_tdu_sancion;
  env_tdu_nivelgravedad = environment.env_tdu_nivelgravedad;

  constructor(private delitoService:DelitoService,
    private leyService:LeyService, 
    private router: Router, 
    private activerouter:ActivatedRoute, 
    private utilsService: UtilsService, 
    private tablacduService: TablacduService) { }

  ngOnInit(): void {

    // Carga arreglo de lista de Sancion
    this.cargaTduSancion();

    // Carga arreglo de lista de Nivelgravedad
    this.cargaTduNivelgravedad();

    // Lee el paramatro de entrada necesario para saber si es una nueva Delito (=0) o es editar (>0)
    this.delitoIdEntrada = Number(this.activerouter.snapshot.paramMap.get('id'));
    this.id_Ley = Number(this.activerouter.snapshot.paramMap.get('id_ley'));
    
    // Si estamos editando, cargamos los daos respectivos
    if ( this.delitoIdEntrada > 0){
      this.delitoService.delitoById(this.delitoIdEntrada).subscribe(data =>{
        this.selectedDelito = data[0];
      })
    }else {
      this.selectedDelito.idley = this.id_Ley
    };

    // Carga de delitoes para validaciones: no repetir nombre de delito
    this.delitoService.delitoLista().subscribe(data =>{
      this.delitoArray = data;
    });

    // Carga de Leyes para Seleccion
    this.leyService.leyLista().subscribe(data =>{
      this.leyArray = data;
    });

  }

  cancelar() {

    this.router.navigate(['menulateral/rddelito', this.id_Ley]);

  }

  addOrEdit(){
    // Si estamos creando un registro:
    if (this.delitoIdEntrada === 0 ) {
      let mensajeValidacion = this.datosValidos(this.selectedDelito);
      if ( mensajeValidacion != ""){
        alert(mensajeValidacion);
      } else {
        console.log("POST: this.selectedDelito: " + this.selectedDelito)
        this.delitoService.postDelito(this.selectedDelito).subscribe({
          next: (data) => {
            let dataResponse: any = data;
            this.selectedDelito = new Delito(0, 0, "", "", 0, 0);
            this.router.navigate(['menulateral/rddelito', this.id_Ley]);
          },
          error: (err) => {
            alert('Hubo un problema al crear la nueva fila en la tabla Delito.');
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([this.router.url]);
            });
          }
        });
      }
    }  else {
      let mensajeValidacion = this.datosValidos(this.selectedDelito);
      if ( mensajeValidacion != ""){
        alert(mensajeValidacion);
      } else {
        this.delitoService.putDelito(this.selectedDelito).subscribe({
          next: (data) => {
            let dataResponse: any = data;
            this.router.navigate(['menulateral/rddelito', this.id_Ley]);
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

  datosValidos(validando: Delito ){

    let existe = false;

    if ( validando.nombre === "" ) {
      return "Ingresar nombre del Delito"
    }
    
    if ( this.existeDelitoNombre(validando.nombre, validando.id) ) {
      return "Ese nombre de Delito ya existe"
    }

    if ( validando.descripcion === "" ) {
      return "Ingresar una descripción del Delito"
    }
    
    
    if ( validando.idley === 0 ) {
      return "Ingresar una LEY del Delito"
    }

    if ( validando.nivelgravedad === 0 ) {
      return "Ingresar un nivel de gravedad del Delito"
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
    this.selectedDelito.nombre = valor.toUpperCase();
  }
  
  existeDelitoNombre(delitoNombre: string, id: number): boolean {
    console.log("Buscando nombre...: " + delitoNombre);
  
    // Buscar si hay un Delito con el mismo nombre y un ID distinto al proporcionado
    const delitoEncontrado = this.delitoArray.find(
      (delito) => delito.nombre === delitoNombre && delito.id !== id
    );
  
    if (delitoEncontrado) {
      console.log("Ese Delito ya existe:", delitoEncontrado);
      return true;
    } else {
      console.log("El Delito no existe o tiene el mismo ID.");
      return false;
    }
  }

  

}

