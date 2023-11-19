import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/components/shared/shared.module';
import { ZoomableDirective } from 'src/app/directives/zoomable.directive';
import { SnakeGameComponent } from '../../components/home/snake-game/snake-game.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommonModule, SharedModule, HomeRoutingModule],
  declarations: [HomeComponent, ZoomableDirective, SnakeGameComponent],
})
export class HomeModule {}
