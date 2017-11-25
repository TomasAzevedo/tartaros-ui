import { Component, Renderer, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MDBSpinningPreloader } from 'ng-mdb-pro';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private router: Router,
        private renderer: Renderer,
        private mdbSpinningPreloader: MDBSpinningPreloader) {

    }

    ngOnInit() {
        this.mdbSpinningPreloader.stop();
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }

    title = 'app';

    exibindoNavbar() {
        return this.router.url !== '/login';
    }

    onDeactivate() {
        this.renderer.setElementProperty(document.body, "scrollTop", 0);
    }
}
