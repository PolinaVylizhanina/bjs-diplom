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


function getStock() {

    ApiConnector.getStocks(callback => {
    if(callback.success === true) {
        rates.clearTable();
        rates.fillTable(callback.data);
        }
    });
}

setInterval(getStock, 60000);

// операции с деньгами

const moneyTransaction = new MoneyManager();

moneyTransaction.addMoneyCallback = data => {
    ApiConnector.addMoney(data, callback => {
        if(callback.success === true) {
            ProfileWidget.showProfile(callback.data);
            moneyTransaction.setMessage(callback.success, 'Кошелек успешно пополнен');
        } else {
            moneyTransaction.setMessage(callback.success, callback.error);
        }
    })
}

moneyTransaction.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, callback => {
        if(callback.success === true) {
            ProfileWidget.showProfile(callback.data);
            moneyTransaction.setMessage(callback.success, 'Валюта успешно сконвертирована');
        } else {
            moneyTransaction.setMessage(callback.success, callback.error);
        }
    })
}

moneyTransaction.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, callback => {
        if(callback.success === true) {
            ProfileWidget.showProfile(callback.data);
            moneyTransaction.setMessage(callback.success, 'Перевод осуществлен');
        } else {
            moneyTransaction.setMessage(callback.success, callback.error);
        }
    })
}

// работа с избранным

const favoritTab= new FavoritesWidget()

ApiConnector.getFavorites (callback => {
    if(callback.success === true) {
        favoritTab.clearTable();
        favoritTab.fillTable(callback.data);
        moneyTransaction.updateUsersList(callback.data);
    }
})


favoritTab.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, callback => {
        if(callback.success === true) {
            favoritTab.clearTable();
            favoritTab.fillTable(callback.data);
            moneyTransaction.updateUsersList(callback.data);
            favoritTab.setMessage(callback.success, 'Пользователь успешно добавлен');
        } else {
            favoritTab.setMessage(callback.success, callback.error);
        }
    })
}

favoritTab.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, callback => {
        if(callback.success === true) {
            favoritTab.clearTable();
            favoritTab.fillTable(callback.data);
            moneyTransaction.updateUsersList(callback.data);
            favoritTab.setMessage(callback.success, 'Пользователь успешно удален');
        } else {
            favoritTab.setMessage(callback.success, callback.error);
        }
    })
}