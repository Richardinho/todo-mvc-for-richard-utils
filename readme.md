# MVC Framework Example
TodoMVC implementation of MVC framework in RichardUtils, my utility library.

The core of the framework is an publish subscription mechanism, where changes to the model object automatically result in previously registered handlers being called. This implements the data-binding system, commonly a feature of such frameworks. The model of the application is transformed into a Proxy object which hooks into the pub sub system allowing changes in the model to result in event handlers being fired.

Find the demo here: https://richardinho.github.io/todo-mvc-for-richard-utils/
## Credit

Created by [Richard Hunter](http://richardhunter.co.uk)

