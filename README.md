# Spots for Rocks

A [website](http://spotsfor.rocks) for finding the perfect place to bring your Pet Rock.

---

This is a side project that I am creating to help me learn and understand how to build a full-stack web application.

Users will be able to register, login, create/edit/delete (that they own) Spots, add/edit/delete comments (that they own), and view Spots.

The stack that I will be using is the MEN (Mongo, Express, Node) stack. In addition, I will also be using ReSTful routes and api to build the application.

The website is hosted on AWS Elastic BeanStalk with a domain taken from Route 53.

Lastly, I am also using Bootstrap 4 and EJS to style the site.

---

## Features That Can Be Implemented

- :ballot_box_with_check: Implement https
- :ballot_box_with_check: Comments
- :ballot_box_with_check: Dynamic date on comments and Submissions
- :black_square_button: Add Places to Visit
- :black_square_button: Verifiable Accounts
- :black_square_button: Likes/Dislikes (Ratings)
- :black_square_button: Replies to comments
- :black_square_button: User Profile and Settings
- :black_square_button: Gallery for pictures
- :black_square_button: Popup Login
- :black_square_button: Flash Errors

## Pages

- :ballot_box_with_check: Landing
- :ballot_box_with_check: Show Spots
- :ballot_box_with_check: Create Spots
- :ballot_box_with_check: Show info about a Spot
- :ballot_box_with_check: Edit spot
- :ballot_box_with_check: User registration
- :ballot_box_with_check: Login

---

## ReSTful Routes Cheatsheet for this project

| Route Name | URL             | HTTP Verb | Description                          |
| :--------: | :-------------- | :-------- | :----------------------------------- |
|   Index    | /spots          | GET       | display all spots                    |
|    New     | /spots/new      | GET       | show form to make new spot           |
|   Create   | /spots          | POST      | add new spot to db then redirect     |
|    Show    | /spots/:id      | GET       | show info about one spot             |
|    Edit    | /spots/:id/edit | GET       | show edit form of one spot           |
|   Update   | /spots/:id      | PUT       | update a specific spot then redirect |
|  Destroy   | /spots/:id      | DELETE    | delete a specific spot then redirect |
