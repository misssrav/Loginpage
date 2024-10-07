import { Component } from '@angular/core';
import{ FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faHome, faChartBar,faComment, faBookmark,faUser } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  home =faHome;
  chart= faChartBar;
  message = faComment;
  bookmark=faBookmark;
  user=faUser;

}
