import { Component ,input} from '@angular/core';
import {IconDefinition, faMoneyBill, faUsers, faClock, faBriefcase} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
 
  title = input<string>("");
  value = input<number>(0);
  change = input<string>('');
  iconName = input<string>('');

  iconMappings:{[key:string]:IconDefinition}={
    budget:faMoneyBill,
    project:faUsers,
    clock:faClock,
    briefcase:faBriefcase,
  };

  // get icon(): IconDefinition{
  //   return this.iconMappings[this.iconName]|| faMoneyBill;
  // }
}
