import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownComponent } from './dropdown.component';
import { ButtonComponent } from '../button/button.component'; // Ajuste o caminho se necessário
import { JsonPipe } from '@angular/common';

const meta: Meta<DropdownComponent<any>> = {
  component: DropdownComponent,
  title: 'Components/Dropdown',
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, ButtonComponent, JsonPipe],
    }),
  ],
};

export default meta;
type Story = StoryObj<DropdownComponent<any>>;

// --- Dados Mockados ---
const opcoesPeriodo = [
  { label: 'Manhã', value: 'morning' },
  { label: 'Tarde', value: 'afternoon' },
  { label: 'Noite', value: 'night' },
];

const opcoesCategoria = [
  { label: 'Desenvolvimento', value: 'dev' },
  { label: 'Design', value: 'design' },
  { label: 'Gerência', value: 'management' },
];

const opcoesStatus = [
  { label: 'Ativo', value: true },
  { label: 'Inativo', value: false },
];

// --- Story com FormGroup ---
export const FormGroupIntegration: Story = {
  render: (args) => {
    // Criação do FormGroup com 3 controles
    const form = new FormGroup({
      periodo: new FormControl(null, Validators.required), // Validação Required
      categoria: new FormControl('dev'), // Valor inicial
      status: new FormControl({ value: true, disabled: true }) // Inicialmente desabilitado
    });

    return {
      props: {
        form,
        opcoesPeriodo,
        opcoesCategoria,
        opcoesStatus,
        // Função para alternar o estado de desabilitado do campo 'status'
        toggleStatusDisabled: () => {
          const control = form.get('status');
          control?.enabled ? control.disable() : control?.enable();
        },
        // Função de submit simulada
        submitForm: () => {
          if (form.valid) {
            alert(JSON.stringify(form.value, null, 2));
          } else {
            form.markAllAsTouched(); // Marca campos para mostrar erros (se houver estilização para erro)
            alert('Formulário inválido! Verifique os campos.');
          }
        },
        resetForm: () => {
            form.reset({
                periodo: null,
                categoria: 'dev',
                status: true
            });
        }
      },
      template: `
        <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 500px; padding: 1.5rem; font-family: sans-serif;">
          
          <h3 style="margin: 0; color: #333;">Filtros de Busca</h3>

          <form [formGroup]="form" style="display: flex; flex-direction: column; gap: 1rem;">
            
            <app-dropdown 
              formControlName="periodo"
              label="Período *" 
              placeholder="Selecione o turno"
              [options]="opcoesPeriodo"
            ></app-dropdown>

            <app-dropdown 
              formControlName="categoria"
              label="Categoria" 
              placeholder="Selecione a área"
              [options]="opcoesCategoria"
            ></app-dropdown>

            <div style="display: flex; gap: 10px; align-items: flex-end;">
                <div style="flex-grow: 1;">
                    <app-dropdown 
                    formControlName="status"
                    label="Status do Usuário" 
                    [options]="opcoesStatus"
                    ></app-dropdown>
                </div>
                <div style="margin-bottom: 2px;">
                    <app-button 
                        [text]="form.get('status')?.enabled ? 'Bloquear' : 'Desbloquear'" 
                        variant="outline" 
                        size="sm"
                        (click)="toggleStatusDisabled()"
                    ></app-button>
                </div>
            </div>

            <div style="display: flex; gap: 1rem; margin-top: 1rem; border-top: 1px solid #eee; padding-top: 1rem;">
              <app-button 
                text="Enviar Dados" 
                variant="primary" 
                size="md"
                [disabled]="form.invalid"
                (click)="submitForm()"
              ></app-button>

               <app-button 
                text="Limpar" 
                variant="outline" 
                size="md"
                (click)="resetForm()"
              ></app-button>
            </div>

          </form>

          <div style="background: #282c34; color: #abb2bf; padding: 1rem; border-radius: 6px; font-size: 0.85rem;">
            <div style="margin-bottom: 0.5rem; font-weight: bold; color: #61dafb;">Form State:</div>
            <pre style="margin: 0;">{{ form.value | json }}</pre>
            <div style="margin-top: 0.5rem;">Valid: <span [style.color]="form.valid ? '#98c379' : '#e06c75'">{{ form.valid }}</span></div>
            <div>Touched: {{ form.touched }}</div>
          </div>

        </div>
      `,
    };
  },
};