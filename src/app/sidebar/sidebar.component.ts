import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    // { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
   // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
   // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
   // { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    { path: '/taskList',         title: 'Danh sách công việc',        icon:'nc-tile-56',    class: '' },

    { path: '/startProcess/Process_Nhap_kho',         title: 'Khởi tạo quy trình',        icon:'nc-delivery-fast',    class: '' },
    { path: '/listProcess',         title: 'Danh sách hồ sơ',        icon:'nc-tile-56',    class: '' },
   // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
