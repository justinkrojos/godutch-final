# Go Dutch

## Overview
Go Dutch is an app that allows you to track who you owe and who owes you as well as managing group budgeting.  


## Quick start guide

The current project is not deployed and must be run locally:

### Required Tools

You will need `expo-cli` and `yarn` to run this project (as well as necessary tools to run react)
You will also need to install **'Expo Go'** to run this app.  

**Note**: this is for ANDROID. This has not been tested on iOS due to resource limitations and *will also not work in the Web*

### Install dependencies 

```
yarn install
```  

### Run Go Dutch

```
yarn start
```

The app will run in your default browser and then scan the generated QR code in Expo Go or run on an Android Emulator

## App Features

to view an example with existing groups, use the following login credentials:

Email: godutchtest@gmail.com
Password: godutch123

### Home

Upon logging in, you will be brought to the homepage. Here you will see two lists. A list of people you owe, and a list of people that owe you.  
Each list item will show you the individual's name and the total amount they owe you/you owe. If you tap on the item, it will expand and shows the reciepts of the expenses.  
The expanded state on an item in the 'You Owe' section will contain a 'Repay' button. Clicking on this button will assume you paid in full and delete all the transactions and the item.  

The top box shows the *Total* amount that you owe/owe you. i.e (Sum of totals people owe you) - (Sum of totals you owe people)  
If you owe someone, the text will be *red*. If someone owes you, the text will appear *blue*.  

### Groups

This page will show you the list of groups that you are apart of. Each card shows you the total amount you owe/owes you *within* that group. You can tap on a card to view details and take actions within the group OR tap on the last card with the '+' icon to either Join or Create a group.

**Join/Create group**

Upon tapping the 'add' card, you can enter a join code or click on the create button to create your own group. You can then enter a group name, and optionally add a group budget. A group budget will set an overall budget for that group and will be deducted from everytime someone in the group makes logs an expense.

### Group

Upon tapping on a group card, you will be taken to the specific group page where you will see a similar list as you saw in the home page. The same concepts are borrowed except 
it will show the expenses *within* that group (the home page shows the expenses *accross* all groups). The group budget will also be shown at the top.  
In the top right, you can tap on the 'i' icon to:
- View the invite code (which can be copied into the clipboard by tapping the copy icon)
- Edit the group name and group budget
- View group members

You can also add an expense from this page which will have the current group pre-selected


### Account Info

From the home page, by tapping the top left user icon, you can:
- View the user's name
- View the user's email
- *Toggle between light and dark mode*
- log out

## Tools used in this project

### React Native
Everyone had no experience with React Native at the beginning of this project. We used the combination of Andrew's lectures and React Native docs to build our app. 

For component styling, we used 'Styled Components' to design custom components and reuse them through the app. We also took advantage of the theme provider to have light and dark mode.  

To handle navigation within the app, we used React navigation.

## Firebase
For authentication and data storage, we used Firebase and Firebase Database. This allows for easy email and password authentication and a free database.

**NOTE**: Because we are on the free Firestore plan, we have limited reads. If there are TOO MANY requests, it will NOT WORK as we will run out.

## Testing

Unfortunately, there was no way for us to get Jest/unit testing or any automated testing set up due to compatability issues.  
Therefore, we had to do manual testing (UAT). Everytime we would push a new feature or change, we would go through all the possible actions within that page and type in all the edge cases. By using this method, we were able to find multiple bugs. 




