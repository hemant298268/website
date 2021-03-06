import { Component, OnDestroy} from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HomeSvcService } from '../home-svc.service';
import { SeoServiceService } from '../seo-service.service';
import { Router, NavigationEnd } from '@angular/router';
import { map } from 'rxjs/operators';
import { interval } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-view',
  templateUrl: './about-view.component.html',
  styleUrls: ['./about-view.component.css'],
  animations: [
    trigger('myTrigger', [
      state('invisible', style({
        'opacity' : '0'
      })),
      state('visible', style({
        'opacity' : '1'
      })),
      transition('invisible => visible', animate('600ms ease-in'))
    ])
  ]
})
export class AboutViewComponent {
  title = 'About Us';
  router:  Router;
  state = 'visible';
  route = 'about';
  pagetitle = 'About Us';
  txtlist; // stores the list of text files for current route
  txtcounter = 0; // maintains the counter of text displayed
  txtlimit;
  imgcounter = 0;
  imglist;
  imglimit;
  bckimg;
  // fiximage = '../../assets/image/home/h1(1).jpg';
  // fiximage = '../../assets/image/home/h1.jpg';
  image = '../../assets/image/about/h1.jpg'; // default image
  txt1: any;
  filename = 'h1.txt'; // default name forfile content
  t1; t2; t3; t4; t5; t6; t7; t8; t9; t10;
  timer;
  objtxtlist;
  objimglist;
  objtext;
  keywords = 'about keyword, about keywords';
  description = 'about page description';
// [ngStyle]="{'background-image':'url(' + image + ')'}"
  constructor(private homeSvc: HomeSvcService, private meta: Meta, private tit: Title) {
    tit.setTitle(this.title);
    meta.updateTag({name: 'keywords', content: this.keywords});
    meta.updateTag({name: 'description', content: this.description});
    this.txtlist = this.getTextList();
    this.imglist = this.getImgList();
    this.timer = setInterval(() => {
      this.state = 'invisible';
      this.change('change');
      this.setImg('change');
    }, 5000);
  }

    getTextList() {
      this.objtxtlist = this.homeSvc.getTextList(this.route).subscribe(value => {
        console.log('text list ' + value);
        this.txtlist = value;
        this.txtlimit = Object.keys(this.txtlist).length;
      });
    }

    getImgList() {
      this.objtxtlist = this.homeSvc.getImgList(this.route).subscribe(value => {
        console.log('image list ' + value);
        this.imglist = value;
        this.imglimit = Object.keys(this.imglist).length;
      });
    }

    change(mode: string) {
      if (mode === 'change') {
      if (this.txtcounter < (this.txtlimit - 1)) {
        this.filename = this.txtlist[this.txtcounter];
        this.getText();
        this.txtcounter++;
      } else {
        this.filename = this.txtlist[this.txtcounter];
        this.getText();
        this.txtcounter = 0;
      }
    } else if (mode === 'init') {
      this.getText();
      this.txtcounter++;
    }
    }

    animate_img() {
      this.state = (this.state === 'visible' ?  'invisible' : 'visible');
    }

    set_visible($event) {
      this.state = 'visible';
    }

    setImg(mode: string) {
      this.bckimg = document.getElementById('home_mid_img');
      if (mode === 'change') {
      if (this.imgcounter < (this.imglimit - 1)) {
        this.image = '../../assets/image/' + this.route + '/' + this.imglist[this.imgcounter];
        this.bckimg.backgroundImage = 'url("' + this.image + '")';
        this.imgcounter++;
        console.log(this.image);
      } else {
        this.image = '../../assets/image/' + this.route + '/' + this.imglist[this.imgcounter];
        this.bckimg.style.backgroundImage = 'url(' + this.image + ')';
        this.imgcounter = 0;
        console.log(this.image);
      }
    } else if (mode === 'init') {
      // this.image = '../../assets/image/' + this.route + '/' + this.imglist[this.imgcounter];
      this.bckimg.backgroundImage = 'url("' + this.image + '")';
      this.imgcounter++;
    }
    }

    getText() {
      this.objtext = this.homeSvc.getText(this.route, this.filename).subscribe(value => {
        console.log('text ' + value);
        this.t1 = value.l1;
        this.t2 = value.l2;
        this.t3 = value.l3;
        this.t4 = value.l4;
        this.t5 = value.l5;
        this.t6 = value.l6;
        this.t7 = value.l7;
        this.t8 = value.l8;
        this.t9 = value.l9;
        this.t10 = value.l10;
      });
    }

    // tslint:disable-next-line:use-life-cycle-interface
     ngOnInit() {
        this.change('init');
        this.setImg('init');
        // this.seoServ.updateTitle('Demo Title');
        // seoService.updateDescription('Test Keywords, hemant rocks');
        /* this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            console.log('about tab selected');
            this.seoServ.updateTitle('Demo Title');
            this.seoServ.updateDescription('Test Keywords, hemant rocks');
          }
        }); */
      }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnDestroy() {
      if (this.objtext != null) {
        this.objtext.unsubscribe();
      }
      if (this.objtxtlist != null) {
        this.objtxtlist.unsubscribe();
      }
      if (this.objimglist != null) {
        this.objimglist.unsubscribe();
      }
      if (this.timer != null) {
        clearInterval(this.timer);
      }

    }

}
