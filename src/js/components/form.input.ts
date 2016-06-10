import { Component, Input, Output, Provider, EventEmitter, ElementRef, forwardRef, ViewChild } from '@angular/core';
// import { FORM_DIRECTIVES, FORM_PROVIDERS } from '@angular/common';
import { Control, ControlValueAccessor, CORE_DIRECTIVES, NG_VALUE_ACCESSOR } from '@angular/common';

@Component({
  selector: 'form-input',
  template: require('./form-input.template.html'),
  directives: [ CORE_DIRECTIVES ],
  // host: {
  //   '(change)': 'onChange($event)'
  // },
  providers: [
    new Provider(NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => FormInputComponent), multi: true}),
  ]
})
export class FormInputComponent implements  ControlValueAccessor {
  @ViewChild('input')   input:ElementRef;

  @Input() type         = 'text';
  @Input() id           = 'password';
  @Input() label        = 'Label';
  @Input() value        = '';
  @Input() ngFormControl: Control;

  @Output() valueChange = new EventEmitter();

  inputClasses          = {};

  private _onChangeCallback: (_:any) => void = (_) => {};

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  setValue(value) {
    this.value = value;

    this.inputClasses['mwl-not-empty'] = !! value;

    this._onChangeCallback(value);
    this.valueChange.emit(value);
  }

  onKeyup($event) {
    this.setValue($event.target.value);
  }

  onTouched() {

  };

  writeValue(value: any): void {
    this.setValue(value);
  }

  registerOnChange(fn: (_: any) => void): void { this._onChangeCallback = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
