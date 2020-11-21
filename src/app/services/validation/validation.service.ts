import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  // Método que no acepta el string 'Mangel':
  NoMangel(control: FormControl):{[s:string]:boolean}{
    if (control.value?.toLowerCase() === 'Mangel'){
      console.log('error');
      return { NoMangel: true }
    }
    return null;
  }

  // Validación de contraseñas:
  matchPassword(pass1: string, pass2: string){
    return(formGroup: FormGroup) => {
      const controlPass1 = formGroup.controls[pass1];
      const controlPass2 = formGroup.controls[pass2];

      if ( controlPass1.value === controlPass2.value){
        controlPass2.setErrors(null);
      }else{
        controlPass2.setErrors({passError: true});
      }
    }
  }
}
