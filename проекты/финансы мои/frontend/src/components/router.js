import { Add } from "./add.js";
import { InOut } from "./in-out.js";
import { InOutAdd } from "./in-out-add.js";
import { InOutReduct } from "./in-out-reduct.js";
import { In } from "./in.js";
import { Main } from "./main.js";
import { Registration } from "./registration.js";

export class Router {
  constructor() {
    this.routes = [
      {
        route: '#/in-add',
        title: 'Создание категории доходов',
        template: 'templates/add.html',
        load: () => {
          new Add('income')
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
        template: 'templates/redact-category.html',
        load: () => {
          new Add('redact-in')
        }
      },
      {
        route: '#/in',
        title: 'Доходы',
        template: 'templates/in.html',
        load: () => {
          new In('in')
        }
      },
      {
        route: '#/',
        title: 'Вход в аккаунт',
        template: 'templates/login.html',
        load: () => {
          new Registration()
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
        template: 'templates/add.html',
        load: () => {
          new Add('expense')
        }
      },
      {
        route: '#/out-red',
        title: 'Редактирование категории расхода',
        template: 'templates/redact-category.html',
        load: () => {
          new Add('redact-out')
        }
      },
      {
        route: '#/out',
        title: 'Расходы',
        template: 'templates/in.html',
        load: () => {
          new In('out')
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