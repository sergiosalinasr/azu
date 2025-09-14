import { Component } from '@angular/core';
import { format } from 'date-fns';
import { UtilsService } from '../../../services/utils.service';
import { Riesgo } from '../../../models/riesgo';
import { Delito } from '../../../models/delito';
import { RiesgoService } from '../../../services/riesgo.service'
import { DelitoService } from '../../../services/delito.service'
import { Tablacdu } from '../../../models/tablacdu';
import { TablacduService } from '../../../services/tablacdu.service'
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-curiesgo',
  templateUrl: './curiesgo.component.html',
  styleUrl: './curiesgo.component.css'
})
export class CuriesgoComponent {

  selectedRiesgo: Riesgo = new Riesgo(0, 0, "", "", 0, 0, 0);
  riesgoIdEntrada: number = 0;
  id_Delito: number = 0;
  delitoArray: Delito[] = [];
  tduProbabilidadArray: Tablacdu[] = [];
  tduImpactoArray: Tablacdu[] = [];
  tduMitigacionArray: Tablacdu[] = [];
  riesgoNombreArray:Riesgo[] = [];
  riesgoArray:Riesgo[] = [];
  env_tdu_probabilidad = environment.env_tdu_probabilidad;
  env_tdu_impacto = environment.env_tdu_impacto;
  env_tdu_mitigacion = environment.env_tdu_mitigacion;

  constructor(private riesgoService:RiesgoService,
    private delitoService:DelitoService, 
    private router: Router, 
    private activerouter:ActivatedRoute, 
    private utilsService: UtilsService, 
    private tablacduService: TablacduService) { }

  ngOnInit(): void {

    // Carga arreglo de lista de Probabilidad
    this.cargaTduProbabilidad();

    // Carga arreglo de lista de Impacto
    this.cargaTduImpacto();

    // Carga arreglo de lista de Impacto
    this.cargaTduMitigacion();

    // Lee el paramatro de entrada necesario para saber si es una nueva Riesgo (=0) o es editar (>0)
    this.riesgoIdEntrada = Number(this.activerouter.snapshot.paramMap.get('id'));
    this.id_Delito = Number(this.activerouter.snapshot.paramMap.get('id_delito'));
    console.log("curiesgo.component/ngOnInit/this.id_Delito: " + this.id_Delito);
    
    // Si estamos editando, cargamos los daos respectivos
    if ( this.riesgoIdEntrada > 0){
      this.riesgoService.riesgoById(this.riesgoIdEntrada).subscribe(data =>{
        this.selectedRiesgo = data[0];
      })
    }else {
      this.selectedRiesgo.iddelito= this.id_Delito
    };

    // Carga de riesgoes para validaciones: no repetir nombre de riesgo
    this.riesgoService.riesgoLista().subscribe(data =>{
      this.riesgoArray = data;
    });

    // Carga de Delitoes para Seleccion
    this.delitoService.delitoLista().subscribe(data =>{
      this.delitoArray = data;
    });

  }

  cancelar() {

    this.router.navigate(['menulateral/rdriesgo', this.id_Delito]);

  }

  addOrEdit(){
    // Si estamos creando un registro:
    if (this.riesgoIdEntrada === 0 ) {
      let mensajeValidacion = this.datosValidos(this.selectedRiesgo);
      if ( mensajeValidacion != ""){
        alert(mensajeValidacion);
      } else {
        console.log("POST: this.selectedRiesgo: " + this.selectedRiesgo)
        this.riesgoService.postRiesgo(this.selectedRiesgo).subscribe({
          next: (data) => {
            let dataResponse: any = data;
            this.selectedRiesgo = new Riesgo(0, 0, "", "", 0, 0, 0);
            this.router.navigate(['menulateral/rdriesgo', this.id_Delito]);
          },
          error: (err) => {
            alert('Hubo un problema al crear la nueva fila en la tabla Riesgo.');
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([this.router.url]);
            });
          }
        });
      }
    }  else {
      let mensajeValidacion = this.datosValidos(this.selectedRiesgo);
      if ( mensajeValidacion != ""){
        alert(mensajeValidacion);
      } else {
        this.riesgoService.putRiesgo(this.selectedRiesgo).subscribe({
          next: (data) => {
            let dataResponse: any = data;
            this.router.navigate(['menulateral/rdriesgo', this.id_Delito]);
          },
          error: (err) => {
            alert('Hubo un problema al actualizar la tabla Riesgo.');
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([this.router.url]);
            });
          }
        })
      }
    }
  }

  datosValidos(validando: Riesgo ){

    let existe = false;

    if ( validando.nombre === "" ) {
      return "Ingresar nombre del Riesgo"
    }
    
    if ( this.existeRiesgoNombre(validando.nombre, validando.id) ) {
      return "Ese nombre de Riesgo ya existe"
    }

    if ( validando.descripcion === "" ) {
      return "Ingresar una descripción del Riesgo"
    }
    
    if ( validando.iddelito === 0 ) {
      return "Ingresar un DELITO del Riesgo"
    }
    
    if ( validando.probabilidad === 0 ) {
      return "Ingresar una probabilidad del Riesgo"
    }

    if ( validando.impacto === 0 ) {
      return "Ingresar un impacto del Riesgo"
    }

    if ( validando.mitigacion === 0 ) {
      return "Ingresar una mitigacion del Riesgo"
    }

    return ""

  }

  // Carga lista de Probabilidades para seleccion en pantalla
  cargaTduProbabilidad(){
    this.tablacduService.getCDUsByTDU(this.env_tdu_probabilidad).subscribe({
      next: (data) => {
        this.tduProbabilidadArray = data;
      },
      error: (err) => {
      }
    });
  }

  // Carga lista de Impacto para seleccion en pantalla
  cargaTduImpacto(){
    this.tablacduService.getCDUsByTDU(this.env_tdu_impacto).subscribe({
      next: (data) => {
        this.tduImpactoArray = data;
      },
      error: (err) => {
      }
    });
  }

  // Carga lista de Mitigacion para seleccion en pantalla
  cargaTduMitigacion(){
    this.tablacduService.getCDUsByTDU(this.env_tdu_mitigacion).subscribe({
      next: (data) => {
        this.tduMitigacionArray = data;
      },
      error: (err) => {
      }
    });
  }

  convertirAMayusculas(valor: string): void {
    this.selectedRiesgo.nombre = valor.toUpperCase();
  }
  
  existeRiesgoNombrex(riesgoNombre: string): boolean {
 
    console.log("Buscando nombre...: " + riesgoNombre);

    const riesgoEncontrado = this.riesgoArray.find((riesgo) => riesgo.nombre === riesgoNombre);
    if (riesgoEncontrado) {
      console.log("El Riesgo existe:", riesgoEncontrado);
      return true
    } else {
      console.log("El Riesgo no existe.");
      return false
    };

  }  

  existeRiesgoNombre(riesgoNombre: string, id: number): boolean {
    console.log("Buscando nombre...: " + riesgoNombre);
  
    // Buscar si hay un Riesgo con el mismo nombre y un ID distinto al proporcionado
    const riesgoEncontrado = this.riesgoArray.find(
      (riesgo) => riesgo.nombre === riesgoNombre && riesgo.id !== id
    );
  
    if (riesgoEncontrado) {
      console.log("Ese Riesgo ya existe:", riesgoEncontrado);
      return true;
    } else {
      console.log("El Riesgo no existe o tiene el mismo ID.");
      return false;
    }
  }

}


