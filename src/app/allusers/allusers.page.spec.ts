import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllusersPage } from './allusers.page';

describe('AllusersPage', () => {
  let component: AllusersPage;
  let fixture: ComponentFixture<AllusersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllusersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllusersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
