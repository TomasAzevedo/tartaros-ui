import { Component, Renderer, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    }

    title = 'app';

    exibindoNavbar() {
        return this.router.url !== '/login';
    }

    onDeactivate() {
        this.renderer.setElementProperty(document.body, "scrollTop", 0);
    }
}
