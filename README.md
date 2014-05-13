expensetrackr
=============

A web application example using Apache Cordova, WinJS, Bootstrap, jQuery, Azure Mobile Services, and Bing Maps REST API.

The following are links to more detailed information for each piece of technology used:
* [Apache Cordova](http://cordova.apache.org/docs/en/3.4.0/guide_overview_index.md.html#Overview)
* [WinJS](http://try.buildwinjs.com)
* [Bootstrap](http://getbootstrap.com)
* [Azure Mobile Sevices](http://azure.microsoft.com/en-us/develop/mobile/)
* [Bing Maps REST Services](http://msdn.microsoft.com/en-us/library/ff701713.aspx)

#Prerequisites
##Apache Cordova and Platform SDKs
Please follow these directions for installing Apache Cordova and the necessary platform SDK's for your environment:
* [Apache Cordova: The Command-Line Interface](http://cordova.apache.org/docs/en/3.4.0/guide_cli_index.md.html#The%20Command-Line%20Interface)

##Services API keys and URLs
This project relies on having obtained API keys and urls for the following services
* Azure Mobile Services
* Bing Maps REST Services

Please add the respective API keys and urls to the following file before you run the application:
* [servicesInfo.js](https://github.com/pgills/expensetrackr/blob/master/www/js/core/services/servicesInfo.js)

After you create your Azure Mobile Service, create a new table called "expenses" through the Data Tab -> Create button.  
#Tested Environments
The following section outlines the current set of tested platforms configurations for this application example.

##Windows 8
Windows 8.1 device running Windows 8 Cordova Application

###Expense Page
![Windows 8 - Expenses](https://github.com/pgills/expensetrackr/wiki/screenshots/Windows8Expenses.png)

###Expense Page - Snapped
![Windows 8 - Expenses Snapped](https://github.com/pgills/expensetrackr/wiki/screenshots/Windows8ExpensesSnapped.png)

##Android
Nexus 10 with Android 4.4 running Cordova Application

###Expense Page
![Nexus 10 - Expenses](https://github.com/pgills/expensetrackr/wiki/screenshots/Nexus10Expenses.png)

###New Expense Page
![Nexus 10 - New Expense](https://github.com/pgills/expensetrackr/wiki/screenshots/Nexus10NewExpense.png)

##iOS
iPad and iPhone 4s running iOS 7

### iPad - Expenses Page
![iPad - Expenses](https://github.com/pgills/expensetrackr/wiki/screenshots/iPadExpenses.PNG)

### iPad - New Expense Page
![iPad - New Expense](https://github.com/pgills/expensetrackr/wiki/screenshots/iPadNewExpense.png)

### iPhone - Expenses Page
![iPhone - Expenses](https://github.com/pgills/expensetrackr/wiki/screenshots/iPhone4sExpenses.png)


