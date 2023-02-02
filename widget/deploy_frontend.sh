#!/bin/bash

#Inicio sesion en Firebase
firebase login
#Preparo el proyecto para el ambiente de produccion
npm run build
#Deploy del proyecto en Firebase
firebase deploy
