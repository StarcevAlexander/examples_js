import { InAdd } from "./in-add.js";
import { InOut } from "./in-out.js";
import { InOutAdd } from "./in-out-add.js";
import { InOutReduct } from "./in-out-reduct.js";
import { InRed } from "./in-red.js";
import { In } from "./in.js";
import { Login } from "./login.js";
import { Main } from "./main.js";
import { OutAdd } from "./out-add.js";
import { OutRed } from "./out-red.js";
import { Out } from "./out.js";
import { Registration } from "./registration.js";

export class Router {
  constructor() {
    this.routes = [
      {
        route: '#/in-add',
        title: 'Создание категории доходов',
        template: 'templates/in-add.html',
        load: () => {
          new InAdd()
        }
      },
      {
        route: '#/in-out-add',
        title: 'Создание дохода/расхода',
        template: 'templates/in-out-add.html',
        load: () => {
          new InOutAdd()
        }
      },
      {
        route: '#/in-out-reduct',
        title: 'Редактирование дохода/расхода',
        template: 'templates/in-out-reduct.html',
        load: () => {
          new InOutReduct()
        }
      },
      {
        route: '#/in-out',
        title: 'Доходы и расходы',
        template: 'templates/in-out.html',
        load: () => {
          new InOut()
        }
      },
      {
        route: '#/in-red',
        title: 'Редактирование категории дохода',
        template: 'templates/in-red.html',
        load: () => {
          new InRed()
        }
      },
      {
        route: '#/in',
        title: 'Доходы',
        template: 'templates/in.html',
        load: () => {
          new In()
        }
      },
      {
        route: '#/',
        title: 'Вход в аккаунт',
        template: 'templates/login.html',
        load: () => {
          new Login()
        }
      },
      {
        route: '#/main',
        title: 'Главная',
        template: 'templates/main.html',
        load: () => {
          new Main()
        }
      },
      {
        route: '#/out-add',
        title: 'Добавление категории расходов',
        template: 'templates/out-add.html',
        load: () => {
          new OutAdd()
        }
      },
      {
        route: '#/out-red',
        title: 'Редактирование категории расхода',
        template: 'templates/out-red.html',
        load: () => {
          new OutRed()
        }
      },
      {
        route: '#/out',
        title: 'Расходы',
        template: 'templates/out.html',
        load: () => {
          new Out()
        }
      },
      {
        route: '#/registration',
        title: 'Регистрация',
        template: 'templates/registration.html',
        load: () => {
          new Registration()
        }
      }
    ]
  }
  async openRoute() {
    const newRoute = this.routes.find(item => { return item.route === window.location.hash.split('?')[0] })
    if (!newRoute) {
      window.location.href = '#/';
      return
    }

    if (window.location.href === '#/login' || window.location.href === '#/registration') {
      document.getElementById('sidebar').style.display = 'none';
    } else {
      document.getElementById('sidebar').style.display = 'flex';
    }

    document.getElementById('content').innerHTML = await fetch(newRoute.template).then(response => response.text());
    document.getElementById('title').innerText = newRoute.title;
    newRoute.load();
  }
}