import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChartModule } from 'primeng/chart';

interface Workout {
  type: string;
  minutes: number;
}

interface UserData {
  id: number;
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,ChartModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  // get user from the route params
  constructor(private router: Router) {}

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  user: UserData | null = null;
  basicData: any;
  basicOptions: any;

  onSubmit() {
    // check if the form is valid
    if (!this.userForm.valid) {
      return;
    }

    const username = this.userForm.value.name;

    const userData = JSON.parse(localStorage.getItem('userData') || '[]');
    this.user = userData.find((user: UserData) => user.name === username) || null;
    console.log(this.user);

    if (this.user) {
      this.basicData = {
        labels: this.user.workouts.map((workout) => workout.type),
        datasets: [
          {
            label: 'Minutes',
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
            data: this.user.workouts.map((workout) => workout.minutes),
          },
        ],
      };
    }
  }

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}
