import { fullName } from "../services/userName.js";
import { BalanceMoneyInMenu } from "../services/how-many-money.js";
import { Accordion } from "../services/accordion.js";
import { PopupLogout } from "../services/popup-log-out.js";
import { Refresh } from "../services/refresh.js";
import { ActiveElement } from "./active-element-menu.js";

export class SidebarMenu {
  constructor() {
    new ActiveElement()
    new Accordion();
    new fullName()
    new BalanceMoneyInMenu()
    new Refresh()
    new PopupLogout
  }
}