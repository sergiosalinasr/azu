import { Component } from '@angular/core';
import { format } from 'date-fns';
import { UtilsService } from '../../../services/utils.service';
import { Ley } from '../../../models/ley';
import { LeyService } from '../../../services/ley.service'
import { Tablacdu } from '../../../models/tablacdu';
import { TablacduService } from '../../../services/tablacdu.service'
import { Router, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-culey',
  templateUrl: './culey.component.html',
  styleUrl: './culey.component.css'
})
export class CuleyComponent {

  selectedLey: Ley = new Ley(0, "", "", "", 0);
  leyIdEntrada: number = 0;
  isValidFecha: boolean = true;
  paisArray: Tablacdu[] = [];
  leyNombreArray:Ley[] = [];
  leyArray:Ley[] = [];
  env_tdu_pais = environment.env_tdu_pais;

  constructor(private leyService:LeyService, 
    private router: Router, 
    private activerouter:ActivatedRoute, 
    private utilsService: UtilsService, 
    private tablacduService: TablacduService) { }

  ngOnInit(): void {

    // Carga arreglo de lista de paises
    this.cargaPaises();

    // Lee el paramatro de entrada necesario para saber si es una nueva Ley (=0) o es editar (>0)
    this.leyIdEntrada = Number(this.activerouter.snapshot.paramMap.get('id'));
    
    // Si estamos editando, cargamos los daos respectivos
    if ( this.leyIdEntrada > 0){
      this.leyService.leyById(this.leyIdEntrada).subscribe(data =>{
        this.selectedLey = data[0];
        this.selectedLey.fechapublicacion = this.utilsService.formatISODateToDDMMYYYY(this.selectedLey.fechapublicacion)
      })
    };

    // Carga de leyes para validaciones: no repetir nombre de ley
    this.leyService.leyLista().subscribe(data =>{
      this.leyArray = data;
    });
  }

  cancelar() {

    this.router.navigate(['menulateral/cdley']);

  }

  addOrEdit(){
    // Si estamos creando un registro:
    if (this.leyIdEntrada === 0 ) {
      let mensajeValidacion = this.datosValidos(this.selectedLey);
      if ( mensajeValidacion != ""){
        alert(mensajeValidacion);
      } else {
        // Cambia el formato de la fecha de DDMMAAAA a AAAAMMDD para enviarlo a la BD
        this.selectedLey.fechapublicacion = this.utilsService.formatDateToYYYYMMDD(this.selectedLey.fechapublicacion)
        this.leyService.postLey(this.selectedLey).subscribe({
          next: (data) => {
            let dataResponse: any = data;
            this.selectedLey = new Ley(0, "", "", "", 0);
            this.router.navigate(['menulateral/cdley']);
          },
          error: (err) => {
            alert('Hubo un problema al crear la nueva fila en la tabla Ley.');
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate([this.router.url]);
            });
          }
        });
      }
    }  else {
      let mensajeValidacion = this.datosValidos(this.selectedLey);
      if ( mensajeValidacion != ""){
        alert(mensajeValidacion);
      } else {
        // Cambia el formato de la fecha de DDMMAAAA a AAAAMMDD para enviarlo a la BD
        this.selectedLey.fechapublicacion = this.utilsService.formatDateToYYYYMMDD(this.selectedLey.fechapublicacion)
        this.leyService.putLey(this.selectedLey).subscribe({
          next: (data) => {
            let dataResponse: any = data;
            this.router.navigate(['menulateral/cdley']);
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


  // Función de validación
  esFechaValida(fecha: string): boolean {
    //Cambia la fecha en caso de / a - que es el formao correcto
    fecha = fecha.replace(/\//g, "-")
    // lo muestra en la pantalla:
    this.selectedLey.fechapublicacion = fecha;
    const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/;
    if (!regex.test(fecha)) return false;

    const [dia, mes, anio] = fecha.split('-').map(Number);
    //const fechaObj = new Date(anio, mes - 1, dia);
    const fechaObj = new Date(anio, mes - 1, dia);
    return fechaObj.getFullYear() === anio &&
           fechaObj.getMonth() === mes - 1 &&
           fechaObj.getDate() === dia;
  }

  datosValidos(validando: Ley ){

    let existe = false;

    console.log("Fecha validando.fechapublicacion: " + validando.fechapublicacion)
    if ( validando.nombre === "" ) {
      return "Ingresar nombre de la Ley"
    }
    
    if ( this.existeLeyNombre(validando.nombre, validando.id) ) {
      return "Ese nombre de Ley ya existe"
    }

    if ( validando.descripcion === "" ) {
      return "Ingresar una descripción de la Ley"
    }

    if ( !this.esFechaValida(validando.fechapublicacion)) {
      return "Ingresar una fecha válida"
    }

    if ( validando.pais === 0 ) {
      return "Ingresar un PAIS"
    }
    
    return ""

  }

  // Carga lista de paieses para seleccion en pantalla
  cargaPaises(){
    this.tablacduService.getCDUsByTDU(this.env_tdu_pais).subscribe({
      next: (data) => {
        this.paisArray = data;
      },
      error: (err) => {
      }
    });
  }

  getDescripcionPais(idPais: number): string {
    const pais = this.paisArray.find((p) => p.id === idPais);
    return pais ? pais.nombreCorto : 'PAIS No encontrado';
  }

  convertirAMayusculas(valor: string): void {
    this.selectedLey.nombre = valor.toUpperCase();
  }
  
  existeLeyNombre(leyNombre: string, id: number): boolean {
    console.log("Buscando nombre...: " + leyNombre);
  
    // Buscar si hay una ley con el mismo nombre y un ID distinto al proporcionado
    const leyEncontrada = this.leyArray.find(
      (ley) => ley.nombre === leyNombre && ley.id !== id
    );
  
    if (leyEncontrada) {
      console.log("Esa Ley ya existe:", leyEncontrada);
      return true;
    } else {
      console.log("El país no existe o tiene el mismo ID.");
      return false;
    }
  }
  
  

  async verificarRespuestaConTimeout(paisNombre: string) {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Tiempo de espera excedido')), 5000)
    );
    let existe = false;
    try {
      const respuesta = await Promise.race([this.leyService.getleybynombre(paisNombre), timeout]);
      console.log('Respuesta recibida:', respuesta);
      
        if (this.leyNombreArray.length === 0) {
          console.log("No existe - this.leyNombreArray.length: " + this.leyNombreArray.length);
          // Realizar acciones cuando no existe
          existe = false;
        } else {
          console.log("Si existe: " + paisNombre);
          // Realizar acciones cuando existe
          existe = true;
        }
    } catch (error) {
      console.error('Error o timeout:', error);
    }
  }
  
  

}
