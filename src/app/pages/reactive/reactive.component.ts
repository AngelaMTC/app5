import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styles: [
  ]
})
export class ReactiveComponent implements OnInit {

  // Variable para almacenar el nuevo formulario:
  form: FormGroup;

  // Getters de los controles:
  get ValidNombre(){
    return this.form.get('nombre').invalid && this.form.get('nombre').touched
  }

  get ValidApellido(){
    return this.form.get('apellido').invalid && this.form.get('apellido').touched
  }

  get ValidCorreo(){
    return this.form.get('correo').invalid && this.form.get('correo').touched
  }

  // Getters para controles dentro de un FormGroup:
  get ValidEstado(){
    return this.form.get('direccion.estado').invalid && this.form.get('direccion.estado').touched
  }

  get ValidMunicipio(){
    return this.form.get('direccion.municipio').invalid && this.form.get('direccion.municipio').touched
  }
  // Getters para un FormArray:
  get arrayPasatiempos(){
    return this.form.get('pasatiempos') as FormArray;
  }

  // Getters password - Validación personalizada:
  get Password1(){
    return this.form.get('pass1').invalid && this.form.get('pass1').touched
  }
  get Password2(){
    const pass1 = this.form.get('pass1').value;
    const pass2 = this.form.get('pass2').value;
    // If de operador tenario:
    return (pass1 == pass2) ? false : true;
  }

  constructor( private fb: FormBuilder, private CustomValidation: ValidationService) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  createForm(){
    this.form = this.fb.group({
      // El primer valor(string) representa el valor por defecto de c/control.
      // El segundo valor() estaremos agregando las validaciones.
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['', [Validators.required, Validators.minLength(4), this.CustomValidation.NoMangel]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        estado: ['', [Validators.required, Validators.minLength(3)]],
        municipio: ['', [Validators.required, Validators.minLength(3)]]
      }),
      pasatiempos: this.fb.array([])
    },{
      validators: this.CustomValidation.matchPassword('pass1', 'pass2')
    });
  }

  enviar(){
    console.log(this.form);
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
        if(control instanceof FormGroup){
          return Object.values(control.controls).forEach(control => control.markAllAsTouched())
        }else{
          control.markAllAsTouched();
        }
      });
    }
  }

  // Para agregar elementos al FormArray:
  newControl(){
    this.arrayPasatiempos?.push(this.fb.control('', Validators.required));
  }
  // Para borrar del FormArray el control seleccionado:
  removeControl(id: number){
    this.arrayPasatiempos?.removeAt(id);
  }
}
