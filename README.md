<h1> <img width="24" src="https://github.com/habibGamal/casher_remaster/blob/master/public/images/logo.png" /> Casher Remaster</h1>
<p>This is a general POS system </p>

# Screenshots

# Sysetm Content
## Products
- [x] add products
- [x] product groups
- [ ] product details
- [ ] expired products
- [x] opening stocks
## Managing stocks
- [x] add stocks
- [ ] tracking stocks
- [ ] loss
- [ ] transfer between stocks
## Invoices
- [x] display invoices
- [x] create buying invoice
- [x] create selling invoice
- [x] return buying invoice
- [ ] return selling invoice
## Customers and suppliers
- Comming soon...
## Accounts
- Comming soon...
## Management
- Comming soon...
## Notification
- Comming soon...


# 🛠 Tech used:
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Inertia](https://img.shields.io/badge/inertia-%239554e9.svg?style=for-the-badge&logo=inertia&logoColor=black) ![PHP](https://img.shields.io/badge/php-%234d588e.svg?style=for-the-badge&logo=php&logoColor=white) ![Laravel](https://img.shields.io/badge/laravel-%23e3382b.svg?style=for-the-badge&logo=laravel&logoColor=white) ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white) ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Cypress](https://img.shields.io/badge/cypress-white.svg?style=for-the-badge&logo=cypress&logoColor=black) 

# 🎨 Design
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white) 

## How to use

1 - Clone this repo

### `git clone https://github.com/habibGamal/casher_remaster.git`

2 - Install deps

### `npm install`
### `composer install`

3 - Copy .env.example to .env

### `cp .env.example .env`

Note change the .env file to your suitable environment

4 - Run Migrations and seed database

### `php artisan migrate`
### `php artisan db:seed`

5 - Finally serve the app

### `php artisan serve`

if you want to edit frontend run the following command in another terminal
### `npm run dev`

<h1>Bugs</h1>

- [ ] sorting … when switch between on column and another
- [ ] when we open (عرض اصناف المجموعة) and make any pagination and click back button the url not restored to its original state that must return us to the main page
- [ ] change stock_item props from price to buying_price and selling_price
- [ ] table sorting should reset pagination position
- [ ] when delete product or any model ⇒ delete btn should be disabled after first click
- [ ] timezone fix
- [ ] barcode in product should be unique
- [ ] `productGroup.name` should be unique
- [ ] initial value of `selectsearch`
- [ ] model search not working when we press enter
