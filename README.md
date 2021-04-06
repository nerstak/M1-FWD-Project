# M1-FWD-Project

## Table of contents

- [Informations](#Informations)

- [Features](#Features)

- [Installation](#Installation)

## Informations

### Description

Website that provides the list of available activities in Paris and its close suburbs.

### Technologies used

Build with:

- HTML / CSS

- Typescript

Framework:

- Angular CLI 11.2.4

API

- [Que Faire à Paris API (V1)](https://opendata.paris.fr/explore/dataset/que-faire-a-paris-/information)

## Features

With this project, users are able to: 

- see the most recently updated activities (with an infinite loading)

- view activities by categories and subcategories

- search for activities using divers criterias (date, category, accessibility, etc.) or only a simple string query

- view the details of an activity

## Installation

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

The project does **not** requires any API key.

## Endpoints

- Homepage (list recent articles): `http://localhost:4200/`

- Category (list recent articles in this category/subcategory): `http://localhost:4200/category/:category`

- Article (see informations of an activity): `http://localhost:4200/article/:id`

- Simple search (search with a simple query): `http://localhost:4200/search/:query`

- Advanced search (search with a multiple conditions): `http://localhost:4200/adv-search/:params`
