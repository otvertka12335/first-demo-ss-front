import {FormArray, FormControl, FormGroup, ValidatorFn} from '@angular/forms';

export function CheckingUniqueness(formArray: FormArray, fieldName: string): ValidatorFn {
  return (c: FormControl) => {
    return makeArrayOfStrings(formArray, fieldName)
      .reduce((count, value) => c.value === value ? ++count : count, 0) > 1 ?
      {notUnique: true} : null;
  };
}

function makeArrayOfStrings(formArray: FormArray, fieldName: string) {
  const fields = [];
  for (let i = 0; i < formArray.length; i++) {
    fields.push(formArray.at(i).get(fieldName).value);
  }
  return fields;
}
