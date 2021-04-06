import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EdituserPage } from './edituser.page';

describe('EdituserPage', () => {
  let component: EdituserPage;
  let fixture: ComponentFixture<EdituserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdituserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EdituserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
