import { Component, inject, signal } from '@angular/core';
import { THEMES, ThemeService } from '../../../../core/services/theme.service';
import { DropdownComponent, DropdownOption } from "../../../../shared/components/dropdown/dropdown.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NumberSumConfig } from '../../store/number-sum.types';
import { NumberSumStore } from '../../store/number-sum.store';
import { config } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

interface GameConfigForm {
  interval: FormControl<number | null>;
  amount: FormControl<number | null>;
  digits: FormControl<number | null>;
}

@Component({
  selector: 'app-game-config',
  imports: [DropdownComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './game-config.component.html',
  styleUrl: './game-config.component.scss',
})
export class GameConfigComponent {
  private themeService = inject(ThemeService);
  private fb = inject(FormBuilder);
  private store = inject(NumberSumStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  formConfig = this.fb.group<GameConfigForm>({
    interval: this.fb.control(null, Validators.required),
    amount: this.fb.control(null, Validators.required),
    digits: this.fb.control(null, Validators.required),
  });

  ngOnInit() {
    this.themeService.changeTheme(THEMES.NUMBER_SUM);
  }

  startGame() {
    if(this.formConfig.valid) {
      const config: NumberSumConfig = {
        interval: this.formConfig.value.interval!,
        digits: this.formConfig.value.digits!,
        amount: this.formConfig.value.amount!,
      }

      this.store.setGameConfig(config);
      this.router.navigate(['../play'], { relativeTo: this.route });
    }

  }

  readonly intervals: DropdownOption<number>[] = [
    { label: '0.1 second', value: 100 }, 
    { label: '0.3 seconds', value: 300 },
    { label: '0.5 seconds', value: 500 },
    { label: '0.8 seconds', value: 800 },
    { label: '1 second', value: 1000 },  
    { label: '1.5 seconds', value: 1500 },
    { label: '2 seconds', value: 2000 },  
  ];

  readonly digitsOptions: DropdownOption<number>[] = [
    { label: '1 digit', value: 1 },
    { label: '2 digits', value: 2 },
    { label: '3 digits', value: 3 },
  ];

  readonly numberOptions: DropdownOption<number>[] = [
    { label: '3 numbers', value: 3 },
    { label: '5 numbers', value: 5 },  
    { label: '7 numbers', value: 7 },  
    { label: '10 numbers', value: 10 }, 
    { label: '15 numbers', value: 15 }, 
    { label: '20 numbers', value: 20 }, 
  ];
  
}
