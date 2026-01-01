import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, FormGroup, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CheckboxComponent } from './checkbox.component';
import { JsonPipe, CommonModule } from '@angular/common';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, JsonPipe, CommonModule],
    }),
  ],
  argTypes: {
    labelPosition: {
      control: 'radio',
      options: ['before', 'after'],
    },
  },
};

export default meta;
export type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {
  args: {
    label: 'Checkbox Label',
    checked: false,
  },
};

export const CheckboxGroup: Story = {
  render: (args) => {
    const form = new FormGroup({
      newsletter: new FormControl(true),
      marketing: new FormControl(false),
      terms: new FormControl(false),
    });

    return {
      props: { ...args, form },
      template: `
        <form [formGroup]="form" style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
          <app-checkbox formControlName="newsletter" label="Receber Newsletter"></app-checkbox>
          <app-checkbox formControlName="marketing" label="Permitir Marketing"></app-checkbox>
          <app-checkbox formControlName="terms" label="Aceitar Termos e Condições"></app-checkbox>
          <div style="margin-top: 1rem; padding: 1rem; background: #eee; border-radius: 8px; font-family: monospace; font-size: 12px;">
            {{ form.value | json }}
          </div>
        </form>
      `,
    };
  },
};

export const SelectAllMaster: Story = {
  render: (args) => {
    const form = new FormGroup({
      master: new FormControl(false),
      children: new FormArray([
        new FormControl(true),
        new FormControl(false),
        new FormControl(false)
      ])
    });

    const getChildrenControls = () => (form.get('children') as FormArray).controls;

    const updateMaster = () => {
      const values = (form.get('children')?.value as boolean[]) ?? [];
      const allChecked = values.length > 0 && values.every(v => v);
      const noneChecked = values.every(v => !v);
      form.get('master')?.setValue(allChecked, { emitEvent: false });
      return { indeterminate: values.length > 0 && !allChecked && !noneChecked };
    };

    const toggleAll = () => {
      const isChecked = !!form.get('master')?.value;
      const children = form.get('children') as FormArray;
      children.controls.forEach(c => c.setValue(isChecked));
    };

    return {
      props: { 
        ...args,
        form, 
        toggleAll, 
        updateMaster,
        childControls: getChildrenControls()
      },
      template: `
        <div [formGroup]="form" style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 300px;">
          <app-checkbox 
            formControlName="master" 
            label="Selecionar Todos"
            [indeterminate]="updateMaster().indeterminate"
            (click)="toggleAll()">
          </app-checkbox>
          <div style="margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; border-left: 2px dashed #ccc; padding-left: 1rem;">
            <ng-container formArrayName="children">
              @for(control of childControls; track $index) {
                <app-checkbox [formControlName]="$index" [label]="'Item ' + ($index + 1)"></app-checkbox>
              }
            </ng-container>
          </div>
        </div>
      `,
    };
  },
};

export const FormValidation: Story = {
  render: (args) => {
    const form = new FormGroup({
      confirm: new FormControl(false, (c) => c.value ? null : { required: true }),
    });

    return {
      props: { ...args, form },
      template: `
        <form [formGroup]="form">
          <app-checkbox formControlName="confirm" label="Aceito os riscos"></app-checkbox>
          @if (form.get('confirm')?.touched && form.get('confirm')?.invalid) {
            <p style="color: red; font-size: 12px; font-family: sans-serif;">Campo obrigatório</p>
          }
          <button [disabled]="form.invalid" style="margin-top: 1rem;">Enviar</button>
        </form>
      `,
    };
  },
};

export const NeoBrutalismShowcase: Story = {
  args: {
    label: 'Efeito Neo-box',
  },
  decorators: [
    (story) => {
      const { template, props } = story() as any;
      return {
        props,
        template: `
          <div style="padding: 3rem; background-color: #fafafa; display: flex; justify-content: center;">
            ${template}
          </div>
        `,
      };
    },
  ],
};