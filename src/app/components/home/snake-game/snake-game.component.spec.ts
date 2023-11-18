import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeGameComponent } from './snake-game.component';

describe('SnakeGameComponent', () => {
  let component: SnakeGameComponent;
  let fixture: ComponentFixture<SnakeGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SnakeGameComponent]
    });
    fixture = TestBed.createComponent(SnakeGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
