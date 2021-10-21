'use strict'

//выход из ЛК
const logoutBut = new LogoutButton();

logoutBut.action = () => ApiConnector.logout(callback => {
    if(callback.success === true) {
        window.location.reload();
    }
});

//текущий пользователь
ApiConnector.current(callback => {
    if(callback.success === true) {
        ProfileWidget.showProfile(callback.data)
    }
});

//курсы валют
const rates = new RatesBoard();

ApiConnector.getStocks(callback => {
    if(callback.success === true) {
        rates.clearTable();
        rates.fillTable(callback.data);
    }
});

setInterval(() => {ApiConnector.getStocks}, 60000);