# Lab (Inventory) Manager

#### By Jon Cheng

#### This app is an inventory management system for tracking shared equipment and materials in the science laboratory. Users can search for items, log that they have taken it, and log that they have returned it. Tags can be added as categories to aid in finding items.

## Technologies Used

- _HTML_
- _CSS_
- _JavaScript_
- _TypeScript_
- _React.js_
- _Vite_
- _Firebase / Firestore_
- _Materials UI_
- _Bootstrap_
- _Node.js v18.17.1_
- _NPM v9.6.7_

## Description

_This app is a capstone project for my time at Epicodus. It's currently a work in progress. Its user interface is written with React.js and stores information with a Firebase/Firestore cloud database. This inventory management system was created to help my former workplace and co-workers keep track of shared equipment and materials in the science laboratory. Users must log in. The inventory list can be populated by adding individual entries, _

## Component Diagram

<img src="./src/images/component-diagram.jpg" width="100%">

## Setup/Installation Requirements

_1. Open your terminal (e.g., Terminal or GitBash)._

_2. Navigate to where you want to place the cloned directory._

_3. Clone the repository from the GitHub link by entering in this command:_

> ```bash
> $ git clone https://github.com/joncheng-dev/lab-inventory-tracker
> ```

- _In the command line, while in the project's root directory `lab-inventory-tracker`, run this command to install all packages and dependenies:_

> ```bash
> $ npm install
> ```

- _In the command line, while in the project's root directory `lab-inventory-tracker`, run this command to compile and execute the web application. This will host the application locally._

> ```bash
> $ npm run dev
> ```

- _Optionally, to compile this web app without running it, enter:_

> ```bash
> $ npm run build
> ```

## Known Bugs

- _Forms accept empty spaces as input in fields, bypassing 'required'._
- _Unintended effect: Upon successfully editing an item, the item changes position in the list of items displayed._
- _If you happen upon any, please report your find with a descriptive message to joncheng.dev@gmail.com_

## License

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Copyright (c) 2023 Jonathan Cheng
```

<a align=left href="#">Return to Top</a>
