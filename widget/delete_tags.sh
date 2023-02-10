#!/bin/bash

##Almaceno el listado de los tag en la variable Lista
LISTA=$(git tag) 

for x in $LISTA; do
	echo "--- Eliminando: $x"
	git tag -d $x
done

##Almaceno el nuevo listado
LISTA=$(git tag)

##Controlo si siguen existiendo tags

if [ -z $LISTA ]; then
	echo "¡Se eliminaron todos los tags de forma exitosa!"
else
	echo "Hubo un error a la hora de eliminar los tags"
fi

##Subo los cambios
git push --tags
