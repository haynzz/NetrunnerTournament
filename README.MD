# Android Netrunner
## A LCG by Fantasy Flight Games

# Netrunner Tournament

Netrunner Tournament is a tool to quickly start a toutnment and create parings. Tracking prestige and adgendas scored for the current tournament and historicaly.


Netrunner Tournament is a Node.js project. The goal for using Node.js to allow for easier set up.

To install Node.js follow the instrunction on http://nodejs.org/

To install the dependencies:

npm install

to start the server

$ node ./app 

to view the results

http://localhost:8888

To send coments please email Edward Grant at themasternone@gmail.com with the subject "Netrunner Tournament"

TODO:
* Create Players -- DONE
* Create Tournment -- DONE
* Assign Players to Tournament
* Generate Inital Paring
** Use Historical data to craft inital parings
* Next Round's Parings
** Use tiebreakers to sead the round
** Minimise the number of players that are playing each other again
* Determin the optiomal number of rounds to have a winner