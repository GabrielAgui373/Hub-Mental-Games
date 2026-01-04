import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MathTricksConfig, MathTricksResult, MathTrickType } from '../../types/math-tricks.types';
import { GameService } from '../../../../core/services/game/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownOption, DropdownComponent } from '../../../../shared/components/dropdown/dropdown.component';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { CheckboxComponent } from "../../../../shared/components/checkbox/checkbox.component";

interface MathTricksForm {
  timeLimit: FormControl<number>;
  multiply11: FormControl<boolean>;
  sameFirstEnd5: FormControl<boolean>;
  sumTenUnits: FormControl<boolean>;
}

@Component({
  selector: 'app-game-config',
  imports: [ReactiveFormsModule, DropdownComponent, ButtonComponent, CheckboxComponent],
  templateUrl: './game-config.component.html',
  styleUrl: './game-config.component.scss',
})
export class GameConfigComponent {
private fb = inject(FormBuilder).nonNullable;
  private game = inject(GameService<MathTricksConfig, MathTricksResult>);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly timeOptions: DropdownOption<number>[] = [
    { label: '30 Seconds', value: 30000 },
    { label: '1 Minute', value: 60000 },
    { label: '2 Minutes', value: 120000 },
    { label: '5 Minutes', value: 300000 },
  ];

  formConfig = this.fb.group<MathTricksForm>(
    {
      timeLimit: this.fb.control(60000, { validators: Validators.required }),
      multiply11: this.fb.control(true),
      sameFirstEnd5: this.fb.control(false),
      sumTenUnits: this.fb.control(false),
    },
    { validators: this.atLeastOneCheckboxChecked() }
  );

  startGame() {
    if (this.formConfig.valid) {
      const val = this.formConfig.value;
      const enabledTricks: MathTrickType[] = [];

      if (val.multiply11) enabledTricks.push('multiply11');
      if (val.sameFirstEnd5) enabledTricks.push('sameFirstEnd5');
      if (val.sumTenUnits) enabledTricks.push('sumTenUnits');

      const config: MathTricksConfig = {
        timeLimit: val.timeLimit!,
        enabledTricks,
      };

      this.game.setGameConfig(config);
      this.router.navigate(['../play'], { relativeTo: this.route });
    }
  }

  private atLeastOneCheckboxChecked(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup<MathTricksForm>;
      const isAnyChecked =
        group.value.multiply11 ||
        group.value.sameFirstEnd5 ||
        group.value.sumTenUnits;
      return isAnyChecked ? null : { noTrickSelected: true };
    };
  }
}
