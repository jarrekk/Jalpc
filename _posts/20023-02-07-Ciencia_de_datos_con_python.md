---
layout: post
title:  "Ciencia de datos con Python - Python"
date:   2023-02-07
desc: "Ciencia de datos con Python"
keywords: "Python, Pandas"
categories: [Python]
tags: [python, pandas]
icon: fa-brands fa-python
---
# Indroducción a Python
_Conceptos basicos_

En este cuaderno, encontrará los temas más importantes sobre el uso de Python en la ciencia de datos. Debe tener un conocimiento básico de programación para comprender completamente este cuaderno.

# Tipos de Datos

Python tiene varios tipos de datos, los mismos datos básicos que otros lenguajes: enteros, flotantes, strings y booleanos. Además, las listas son un tipo predefinido en el lenguaje, los diccionarios, tuplas y sets.

La funcion que se utiliza para determinar el tipo de datos es type()

Para escribir comentarios es utiliza el caracter numeral o gato #

# Números
Python puede ser usado de forma interactiva como una calculadora. Esto permite que el análisis de datos pueda ser realizado de forma interactiva, de forma similar a como pueden usarse otras herramientas como el lenguaje R o Matlab. A continuación se ejemplifican los cálculos aritméticos básicos.
```Python
2 + 3 #Suma
```
5
```
2 * 3 #Multiplicacion
```
6
```
7 / 2 #Division con respuesta de numero flotante
```
3.5
```
5//2 # parte entera de la division
```
2
```
2 ** 4 #Potenciacion
```
16
```
8 % 2 #Operacion Modulo
```
0
```
5 % 2 #Operacion Modulo
```
1
```
53 % 15
```
8

Orden específico para ralizar las operaciones y resolver fórmulas
 - Potencias y radicales
 - Multiplicación, división, división sesgada y módulo
 - Suma y resta


```
((2 + 3) * (5**2 + 5))/2 #Uso de varias operacion en la misma ecuacion
```
75.0

# type()
La funcion para conocer el tipo de dato
```
#funcion para determinar el tipo de dato numerico
type(3) # tipo entero (int)
```
int
```
type(3.0) # Tipo flotante, se determina por el uso del punto
```
float
```
type(2+2j)# Numero complejo
```
complex
```
type(5/2) # Numero flotante
```
float
```
type(5//2) # Numero entero
```
int

## Asignacion de valores Variables
Las variables en python no necesitan ser declaradas, simplemente se definen al ser utilizadas por primera vez. Además, (si bien no es recomendable) pueden cambiar de tipo volviendo a definir. la variables puede ser de cualqueire tipo de datos que maneja Python

```
# Los nombres NO pueden empezar con un número o un caracter especial
name_of_var = 2 #Asignacion de valores a una variable
type(name_of_var)
```
int
```
name_of_var = 5.3 #Asignacion de valores a una variable
type(name_of_var)
```
float
```
x = 2 # asignado valores a diferentes variables
y = 3
z = x + y # asignar la suma de dos variables
z
```
5
```
type(z) #tipo de dato
```
int
# Strings
```
'Comillas sencillas'
```
'Comillas sencillas'
```
"Comillas dobles"
```
'Comillas dobles'
```
" Se puede escribir 'Comillas' de esta forma"
```
" Se puede escribir 'Comillas' de esta forma"
```
" Científico de datos: Persona que sabe más de estadística que cualquier programador y que a la vez sabe más de programación que cualquier estadístico "
```
' Científico de datos: Persona que sabe más de estadística que cualquier programador y que a la vez sabe más de programación que cualquier estadístico '
```
"""
  Los strings de varias lineas pueden
  escribirse delimitándolos tres comillas 
  dobles y son usados corrientemente como
  comentarios
"""
```
'Los strings de varias lineas pueden
escribirse delimitándolos tres comillas 
dobles y son usados corrientemente como
comentarios'
```
a = "El Big data es como el sexo en la adolescencia: todo el mundo habla de ello, nadie sabe realmente cómo hacerlo, todos piensan que los demás lo están haciendo, así que todos dicen que también lo hacen..."
a
```
'El Big data es como el sexo en la adolescencia: todo el mundo habla de ello, nadie sabe realmente cómo hacerlo, todos piensan que los demás lo están haciendo, así que todos dicen que también lo hacen...'
```
type(a) # tipo de datos
```
str
```
# duplicar varias veces un string
"Ciencia de Datos "*4
```
'Ciencia de Datos Ciencia de Datos Ciencia de Datos Ciencia de Datos '
```
# Concatenar strings
palabra = "Amo "+"Programar "+"En Python"
palabra
```
'Amo Programar En Python'

# Imprimir con formato
```
x = 'hello' # asignar varible tipo string
x #imprimir la variable en jupyter
```
'hello'
```
print(x) #impresion de una variable en python
```
hello
```
num = 3 # asignacion de variables
name = 'Matias'
```
```
# Impresion con formato, podemos omitir la posicion si las variables estan en orden
print('Me llamo: {}, y mi edad es: {}'.format(name,num))
```
Me llamo: Matias, y mi edad es: 3
```
# Nuevo desde python 3.6
#f-string o string literal format
print(f'Me llamo: {name}, y mi edad es: {num}')
```
Me llamo: Matias, y mi edad es: 3
## Entrada de datos del usuario
```
entrada = input('Como te llamas? ') # los datos sera tipo string
#Simular entrada de texto
entrada = 'Josue C'
```
```
type(entrada) #tipo de dato
```
str
```
print(f'Hola {entrada} te deseo lo mejor aprendiendo python para analisis de datos')
```
Hola Josue C te deseo lo mejor aprendiendo python para analisis de datos
# Listas
Las listas son una de las principales estructuras para almacenar información en Python.

 - En las listas podemos ingresar todo tipos de datos.
 - Se utilizan los corchetes '[ ]' para definir una lista y se separan usando coma.
 - Las listas son elementos Mutables (se pueden cambiar sus valores)
```

# definicion de listas
uno = [1,2,3] # las listas se crean delimitando sus elementos entre [ y ] y usando la , como separacion
uno
```
[1, 2, 3]
```
type(uno) #tipo de datos
```
list
```
#Una lista puede tener diferentes tipos de datos
['hi',1,[1,2,3]] #Esta lista tiene uns string, un numero y una lista como sus elementos
```
['hi', 1, [1, 2, 3]]
```
my_list = ['a','b','c'] #creacion de una lista
```
```
my_list
```
['a', 'b', 'c']

## Indexacion en Listas y Strings
En Python, las listas son vectores; el primer elemento ocupa la posición 0, el segundo la 1 y así sucesivamente. Los índices negativos (iniciando en -1) se usan para indicar la posición contando desde atrás. Por ejemplo:

 +---+---+---+---+---+---+
 | P | y | t | h | o | n |
 +---+---+---+---+---+---+
   0   1   2   3   4   5   
  -6  -5  -4  -3  -2  -1
**NOTA IMPORTANTE:** En python la numeracion de las posiciones empieza en cero 0

Para acceder a algun elemento de la lista, se utilizan corchetes, Ejemplo
```
lista_vble = [45,23,38,2,8,17] #creacion de una lista
lista_vble[2] # accediendo al valor que esta en la posicion 3
>> 38
```
Los strings tienen un comportamiento similar a las List, pero los strings son variables inmutables, mientras que las listas si son mutables.
```
# La indexacion y slicing de litas y strings es igual
# La primera posicion es en 0
word = 'Python'
word[0]    # Caracter en la posición 0
```
'P'
```
word[5]    # Caracter en la posición 5
```
'n'
```
word[-1]  # Último caracter
```
'n'
```
word[-2]  # Antepenúltimo caracter
```
'o'
```
word[-6]   # Primer caracter en este ejemplo
```
'P'

## Seleccion de varios elementos (Slicing)
El operador : se usa para indicar rangos, [inicio:final-1], no se incluye el final

 +---+---+---+---+---+---+
 | P | y | t | h | o | n |
 +---+---+---+---+---+---+
   0   1   2   3   4   5   
  -6  -5  -4  -3  -2  -1

```
word[0:2]  # El operador `:` se usa para indicar rangos, [inicio:final-1], no se incluye el final
```
'Py'
```
word[:2]   # ':2' indica desde el principio hasta la posición 2 (sin incluirla)
```
'Py'
```
word[2:5]  # [inicio:final-1], no se incluye el final
```
'tho'
```
word[2:]   # Desde la posición 2 hasta el final
```
'thon'
```
word[1:6:2] # [inicio:final-1:paso], Ej inicio = 1, final-1 = 5, paso cada 2 elementos
```
'yhn'
```
word[::2]
```
'Pto'
```
word[:2] + word[2:]  # Concatenacion de strings
```
'Python'
```
word[:4] + word[2:] # Concatenacion de strings
```
'Pyththon'
```
word[-2:]  # desde la posición -2 hasta el final, o sea, los últimos dos caracteres.
```
'on'
```
word[:] # desde el primero hasta el último caracter.
```
'Python'
```
# Asignaciones a una posicion especifica en las listas
# Se podra hacer esta asignacion en los strings?
#word[2] = 'e'
```
las listas son estructuras de datos mutables, entonces se pueden reescribir.

Los strings NO son mutables
```
# Las Listas son Variables Mutables
H = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
P = H # copiar todo el contenido de Ha a P
P[0] = 333
print("Observar el que ocurre con 'H' cuando se cambia el valor de 'P', si P = H")
print(f'P = {P}') # uso de f-strings para imprimir los resultados
print(f'H = {H}') # uso de f-strings para imprimir los resultados
```
Observar el que ocurre con 'H' cuando se cambia el valor de 'P', si P = H
P = [333, 2, 3, 4, 5, 6, 7, 8, 9, 10]
H = [333, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
id(P)
```
140079831399488
```
id(H)
```
140079831399488
```
id(word)
```
140079928559408

Las listas no se copian al asignarlas a otra variable, ¡es un puntero a la lista original! ¡Esto evita problemas de memoria! pero puede llevar a errores en la programacion, entonces la copia se debe hacer explicita.
```
# Las Listas son Variables Mutables
H = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
P = H[:] # copiar todo el contenido de H a P
P[0] = 333
print("Observar el que ocurre con 'H' cuando se cambia el valor de 'P', si P = H[:]")
print(f"P = {P}") # uso de f-strings para imprimir los resultados
print(f"H = {H}") # uso de f-strings para imprimir los resultados
```
Observar el que ocurre con 'H' cuando se cambia el valor de 'P', si P = H[:]
P = [333, 2, 3, 4, 5, 6, 7, 8, 9, 10]
H = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
id(P)
```
140079822691328
```
id(H)
```
140079822797184
## Indexacion anidada
```
nest = [1,2,3,[4,5,['target']]] # Lista con otra lista al interior
nest
```
[1, 2, 3, [4, 5, ['target']]]
```
nest[3] # Cuarto Elemento de la lista, lo que se retorna es una lista
```
[4, 5, ['target']]
```
nest[3][2] # De la lista que es el elemento 4, obtener el elemento 3
# el tipo de resultado es una lista
```
['target']
```
# obtener el string
nest[3][2][0] # De la lista que es el elemento 4, obtener el elemento 3, y obtener el valor de esa lista
```
'target'
```
nest[3][2][0][:2] # De la lista que es el elemento 4, obtener el elemento 3, y obtener el valor de esa lista
```
'ta'
```
# obtener otro elemento de la lista
nest[3][:2][1]
```
5
## Agregar datos en una lista
Agregar elementos a una lista se hace con los metodos: .insert() .append()

# .insert()
list.insert(i, x): Inserta un ítem x en una posición i, los otros elementos despues de la posicion se mueven hacia la derecha.
```
nest = [1,2,3,[4,5,['target']]] # Lista con otra lista al interior
nest
```
[1, 2, 3, [4, 5, ['target']]]
```
nest.insert(2,'Amo Python')
nest
```
[1, 2, 'Amo Python', 3, [4, 5, ['target']]]
# .append()
Agrega los elementos al final de la lista
```
# se agrega un dato al final de la lista utilizando el metodo append()
nest[4][2].append(8)
nest
```
[1, 2, 'Amo Python', 3, [4, 5, ['target', 8]]]
```
nest[4].append('Pandas')
nest
```
[1, 2, 'Amo Python', 3, [4, 5, ['target', 8], 'Pandas']]
### Asignar valores a una posición
```
nest[2] = 'Casa' # reasignar el valor a una posicion de una lista
nest
```
[1, 2, 'Casa', 3, [4, 5, ['target', 8], 'Pandas']]
```
len(nest) #obtener el tamaño de la lista
```
5
### Borrar Elementos de una lista
```
nest[1:3] = [] # Borrar elementos de una lista
nest
```
[1, 3, [4, 5, ['target', 8], 'Pandas']]
```
# Borrar elementos de una lista conociendo su index

del(nest[2][2][0]) 
nest # observar que el valor esta dentro de una lista
```
[1, 3, [4, 5, [8], 'Pandas']]

### Concatenar listas
```
print(nest)
print(my_list)
```
[1, 3, [4, 5, [8], 'Pandas']]
['a', 'b', 'c']
```
# Concatenar listas
new_list = nest + my_list
new_list
```
[1, 3, [4, 5, [8], 'Pandas'], 'a', 'b', 'c']
```
# agregar una lista al final
nest.append(my_list)
nest
```
[1, 3, [4, 5, [8], 'Pandas'], ['a', 'b', 'c']]
```
# Repetir varias veces una lista
repetida = my_list*4
repetida
```
['a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c', 'a', 'b', 'c']
```
new_list
```
[1, 3, [4, 5, [8], 'Pandas'], 'a', 'b', 'c']
# Diccionarios
Se utilizan las llaves { } para su definicion, Un Diccionario es una estructura de datos con características especiales que nos permite almacenar cualquier tipo de valor como numeros, strings, listas e incluso otras funciones. Estos diccionarios nos permiten además identificar cada elemento por una clave (Key). Las claves son únicas dentro de un diccionario, es decir que no puede haber un diccionario que tenga dos veces la misma clave, si se asigna un valor a una clave ya existente, se reemplaza el valor anterior.

**Nota:** El algoritmo que usa Python internamente para buscar un elemento en un diccionario es muy distinto que el que utiliza para buscar en listas. los elementos en los diccionarios no tienen un orden determinado.

Para buscar en las listas, se utiliza un algoritmos de comparación que tarda cada vez más a medida que la lista se hace más larga. En cambio, para buscar en diccionarios se utiliza un algoritmo llamado hash, que se basa en realizar un cálculo numérico sobre la clave del elemento, y tiene una propiedad muy interesante: sin importar cuántos elementos tenga el diccionario, el tiempo de búsqueda es siempre aproximadamente igual.

Este algoritmo de hash es también la razón por la cual las claves de los diccionarios deben ser inmutables, ya que la operación hecha sobre las claves debe dar siempre el mismo resultado, y si se utilizara una variable mutable esto no sería posible.
```
# Crear un diccionario
d = {'key1':'item1','key2':'item2'}
```
```
d
```
{'key1': 'item1', 'key2': 'item2'}
```
type(d)
```
dict
```
d['key1'] #acceder al elemento que tiene la clave `key1`
```
'item1'
```
# Un ejemplo de uso de los diccionarios
pepito = {'edad':20,'nombre':'Pepito','Apellido':'Perez','estatura':1.77}
pepito
```
{'edad': 20, 'nombre': 'Pepito', 'Apellido': 'Perez', 'estatura': 1.77}
```
print(pepito['nombre'])
print(pepito['Apellido']) #Observar que esta clave empieza con Mayuscula, Python es case sensitive
print(pepito['edad'])
print(pepito['estatura'])
```
Pepito
Perez
20
1.77
```
print (f"El nombre del paciente es {pepito['nombre']} {pepito['Apellido']}, tiene {pepito['edad']} años y una estatura de {pepito['estatura']} ")
```
El nombre del paciente es Pepito Perez, tiene 20 años y una estatura de 1.77 
```
pepito.keys()
```
dict_keys(['edad', 'nombre', 'Apellido', 'estatura'])
```
# Que ocurre si quiero obtener todos los valores del diccionario?
# pepito[:]
```
## Booleans (Logicos)
```
# las palabras True y False son palabras restringidas
# valor Verdadero
True
```
True
```
# valor Falso
False
```
False
```
v1 = True
v2 = False

print(f"Valor de v1 = {v1} y v2 = {v2}")
```
Valor de v1 = True y v2 = False
```
type(v1) # tipo de dato
```
bool

# Tuples

Las tuplas son como las listas (se indexan de la misma forma), pero al igual que los strings no se pueden modificar (son inmutables). Son como unas listas de sólo lectura. Se crean con () (paréntesis) en lugar de '[ ]' (corchetes). Una vez se crea una tupla, no se puede cambiar ni su contenido ni su tamaño, a menos que hagas una copia de la tupla.
```
fecha = (25, "Mayo", 1810)
fecha
```
(25, 'Mayo', 1810)
```
type(fecha)
```
tuple
```
fecha[0]
```
25
```
# Se puede hacer?
#fecha[1] = 'Julio'
```
## Casting
Cambio entre tipos de datos
```
#Conversion de float a entero
int(5.789)
```
5
```
#Conversion de entero a float
float(3)
```
3.0
```
# conversion de numero a string
palabra = str(78345.345) 
print(type(palabra))
palabra
```
<class 'str'>





'78345.345'
```
# conversion de string a numero, si el string es un numero
numero = int('3456') # recordar que los strings se escriben entre comillas simples o dobles
print(type(numero))
numero
```
<class 'int'>





3456
```
#conversion de lista a tuple
tup = ('Python','Pandas',3.0,2018)
lista = list(tup)
type(lista)
```
list
```
# conversion de tuple a lista
lista2 = [1,2,3,4,5,6,7,8]
tup2 = tuple(lista2)
type(tup2)
```
tuple
```
# Conversion de un numero a Boolean
# Cualquier numero diferente de cero sera True
print(bool(4))
print(bool(1.65))
print(bool(-3))
print(bool(-5678))
```
True
True
True
True
```
# La conversion ser False si el numero es cero
print(bool(0))
```
False
```
# Conversion de Boolean a Numerico
int(True)
```
1
```
# Conversion de Boolean a Numerico
int(False)
```
0
# Operadores de Comparacion y Logicos
## Operadores de Comparacion
Python tiene los típicos operadores de comparación:

Operador	Funcion
==	Igual que
!=	Diferente a
<	Menor que
|> Mayor que
<=  Menor o igual que
|>=  Mayor o igual que

Sus respuestas son del tipo Boolean
```
1 > 2 # Mayor que
```
False
```
1 < 2 # Menor que
```
True
```
1 >= 1 # Mayor o igual que
```
True
```
1 <= 4 # Menor o igual que
```
True
```
1 == 1 # Igual igual
```
True
```
2 != 4 # Diferente
```
True
```
'Hola' == 'Adios' #Comparacion de igualdad
```
False
```
'Hola' != 'Adios' # Comparacion de diferencia
```
True
```
'Hola' == 'hola' # Comparacion de igualdad
```
False
## Operadores Logicos
Python implementa todos los operadores usuales de la lógica booleana.

Se usan las palabras en inglés and, or, not en lugar de símbolos (||, &&, !, etc)
```
(1 > 2) and (2 < 3) # Operador and
```
False
```
(1 > 2) or (2 < 3) # operador or
```
True
```
not(2 < 3) or (1 > 2) # operador not
```
False
```
(1 == 2) or (2 == 3) or (4 == 4)
```
True
# Programacion con Python
Condicionales if, elif, else
En Python no hay llaves { } ni begin...end para marcar el comienzo y fin de un bloque, sino que eso se logra con la indentación. La indentación por defecto son 4 espacios en blanco.

Entonces va a ser necesario indentar correctamente para utilizar sentencias if, for o para definir funciones.

El if es como el de otros lenguajes, pero no pide paréntesis y termina con : Su sintaxis es:
```
if condicion : #se finaliza con dos puntos :
    codigo a realizar#(indentado con 4 espacios)
elif condicion:
    codigo a realizar #(indentando con 4 espacios)
elif condicion:
    codigo a realizar #(indentando con 4 espacios)    
else:
    codigo a realizar #(indentado con 4 espacios)
```
```
if 1 < 2:
    print('Viva la Musica!')
```
Viva la Musica!
```
if 1 > 2:
    print('Viva la Musica!')
if 1 < 2:
    print('Primero')
else:
    print('Ultimo')
```
Primero
```
if 1 > 2:
    print('Primero')
else:
    print('Ultimo')
```
Ultimo
```
if 1 == 2:
    print('Primero')
elif 3 == 3:
    print('Mitad')
else:
    print('Ultimo')
```
Mitad
# Ciclos for
Los for son parecidos a los if, pero tienen la sintaxis

for variable in lista:. En este caso, variable es la variable que va a ir cambiando, y lista es una lista de python (o un iterable que es parecido)
```
seq = [1,2,3,4,5] #lista de valores
seq
```
[1, 2, 3, 4, 5]
```
for item in seq: # en este ciclo item tomara cada uno de los valores que esta en seq uno por uno
    print(item)
```
1
2
3
4
5
```
for item in seq:
    print('Viva la Musica!')
```
Viva la Musica!
Viva la Musica!
Viva la Musica!
Viva la Musica!
Viva la Musica!
```
for casa in seq:
    print(casa+casa)
```
2
4
6
8
10
```
# Imprimir los strings de mi_lista por separado
mi_lista=["img","python","numpy","pandas"]
for s in mi_lista:
    print(s)    # este print va con indentación
```
img
python
numpy
pandas
# Ciclos while
```
i = 1
while i < 5:
    print(f'i es: {i}')
    i = i+1
```
i es: 1
i es: 2
i es: 3
i es: 4
## Control de ciclos break y continue
Los comandos break y continue son utilizados para terminar/salir de un ciclos for o while.

break
Termina la iteracion actual y continua con la ejecución de la siguiente instrucción
```
for letra in "Python":
    if letra == "h":
        break
    print (f"Letra actual : {letra} ")
    
print('Uso del comando break')    
```
Letra actual : P 
Letra actual : y 
Letra actual : t 
Uso del comando break
continue
Regresa al comienzo del ciclo, ignorando todos los commandos que quedan en la iteración actual del ciclo e inicia la siguiente iteración.
```
for letra in "Python":
    if letra == "h":
        continue
    print(f"Letra actual : {letra} ")
    
print('Uso del comando continue')  
```
Letra actual : P 
Letra actual : y 
Letra actual : t 
Letra actual : o 
Letra actual : n 
Uso del comando continue

# List comprehension
Las comprensiones de listas proveen una forma de escribir bucles for más concisamente. Pueden ser muy útiles para crear nuevas listas a partir de listas existentes o iterables, ademas tambien se puede poner condiciones. Link para mas ejemplos
```
# Para elevar cada termino al cuadrado de una lista se deberia hacer asi:
# Funcion para elevar al cuadrado cada uno de los elementos de una lista
x = [1,2,3,4,5] #lista de valores

out = []  # crear lista vacia
for item in x:
    out.append(item**2)
print(out)
```
[1, 4, 9, 16, 25]
```
# Usando List comprehension
# *resultado*  = [*operacion*  *iteracion*  *condicion* ]
out = [item**2 for item in x]
out
```
[1, 4, 9, 16, 25]
```
# Funcion para elevar al cuadrado cada uno de los elementos de una lista
# Solo si el elemento es mayor que 3
out = []
for item in x:
    if item >= 3:
        out.append(item**2)
print(out)
```
[9, 16, 25]
```
# *resultado*  = [*operacion*  *iteracion*  *condicion*  ]
resultado = [item**2 for item in x if item >= 3]
resultado
```
[9, 16, 25]
# Funciones
Las funciones se definen con la palabra clave ´def´ y tienen la sintaxis

def nombre_funcion(parametros): pasos de la funcion

Para devolver un valor utilizamos la palabra clave return.
```
def my_func(): # el caracter `:` es obligatorio
    """                        # el cuerpo de la función esta definido por la identación (espacios en blanco) 
    Docstring va aca.       
    """
    print('Hola Python')
```
```
my_func()
```
Hola Python
```
def square(x):   # el caracter `:` es obligatorio
    return x**2  # el cuerpo de la función esta definido por la identación (espacios en blanco)
                 # es obligatorio usar `return` para devolver valores
```
```
out = square(2)
out # Para imprimir en jupyter (IPython) no es necesario la funcion print
```
4
```
# Esta funcion recibe una lista y devuelve la suma de sus elementos
def sumar_todos(lista):
    suma=0             # recordar la identacion en Python, se recomienda 4 espacios
    for v in lista:
        #suma = suma +v
        suma+=v        # Se identa nuevamente ya que esta dentro de un for
    return suma
```
```
mi_lista=[54,12,99,15]
la_suma = sumar_todos(mi_lista)
print(f"Los elementos de la lista suman = {la_suma}")
```
Los elementos de la lista suman = 180
# Funciones basicas de python
Son funciones que incluye python desde su instalacion, Built-in Functions, estas son palabras restringidas NO USAR

.	.	.	.	.
abs()   	dict()  	help()  	min()   	setattr()
all()	dir()	hex()	next()	slice()
any()	divmod()	id()	object()	sorted()
ascii()	enumerate()	input()	oct()	staticmethod()
bin()	eval()	int()	open()	str()
bool()	exec()	isinstance()	ord()	sum()
bytearray()	filter()	issubclass()	pow()	super()
bytes()	float()	iter()	print()	tuple()
callable()	format()	len()	property()	type()
chr()	frozenset()	list()	range()	vars()
classmethod()	getattr()	locals()	repr()	zip()
compile()	globals()	map()	reversed()	import()
complex()	hasattr()	max()	round()	
delattr()	hash()	memoryview()	set()	
```
# la funcion 'dir' Retorna un listado de atributos y metodos que tiene el tipo de datos especico
dir('casa') #en este caso el tipo de datos es un string
```
['__add__',
 '__class__',
 '__contains__',
 '__delattr__',
 '__dir__',
 '__doc__',
 '__eq__',
 '__format__',
 '__ge__',
 '__getattribute__',
 '__getitem__',
 '__getnewargs__',
 '__gt__',
 '__hash__',
 '__init__',
 '__init_subclass__',
 '__iter__',
 '__le__',
 '__len__',
 '__lt__',
 '__mod__',
 '__mul__',
 '__ne__',
 '__new__',
 '__reduce__',
 '__reduce_ex__',
 '__repr__',
 '__rmod__',
 '__rmul__',
 '__setattr__',
 '__sizeof__',
 '__str__',
 '__subclasshook__',
 'capitalize',
 'casefold',
 'center',
 'count',
 'encode',
 'endswith',
 'expandtabs',
 'find',
 'format',
 'format_map',
 'index',
 'isalnum',
 'isalpha',
 'isascii',
 'isdecimal',
 'isdigit',
 'isidentifier',
 'islower',
 'isnumeric',
 'isprintable',
 'isspace',
 'istitle',
 'isupper',
 'join',
 'ljust',
 'lower',
 'lstrip',
 'maketrans',
 'partition',
 'replace',
 'rfind',
 'rindex',
 'rjust',
 'rpartition',
 'rsplit',
 'rstrip',
 'split',
 'splitlines',
 'startswith',
 'strip',
 'swapcase',
 'title',
 'translate',
 'upper',
 'zfill']
 ```
'casa'.capitalize()
```
'Casa'
```
'casa'.__class__
```
str
```
dir(8)
```
['__abs__',
 '__add__',
 '__and__',
 '__bool__',
 '__ceil__',
 '__class__',
 '__delattr__',
 '__dir__',
 '__divmod__',
 '__doc__',
 '__eq__',
 '__float__',
 '__floor__',
 '__floordiv__',
 '__format__',
 '__ge__',
 '__getattribute__',
 '__getnewargs__',
 '__gt__',
 '__hash__',
 '__index__',
 '__init__',
 '__init_subclass__',
 '__int__',
 '__invert__',
 '__le__',
 '__lshift__',
 '__lt__',
 '__mod__',
 '__mul__',
 '__ne__',
 '__neg__',
 '__new__',
 '__or__',
 '__pos__',
 '__pow__',
 '__radd__',
 '__rand__',
 '__rdivmod__',
 '__reduce__',
 '__reduce_ex__',
 '__repr__',
 '__rfloordiv__',
 '__rlshift__',
 '__rmod__',
 '__rmul__',
 '__ror__',
 '__round__',
 '__rpow__',
 '__rrshift__',
 '__rshift__',
 '__rsub__',
 '__rtruediv__',
 '__rxor__',
 '__setattr__',
 '__sizeof__',
 '__str__',
 '__sub__',
 '__subclasshook__',
 '__truediv__',
 '__trunc__',
 '__xor__',
 'as_integer_ratio',
 'bit_length',
 'conjugate',
 'denominator',
 'from_bytes',
 'imag',
 'numerator',
 'real',
 'to_bytes']
### len()
Nos entrega la longitud de los elementos que hay en una lista, diccionario, string, etc
```
mi_lista=[54,12,99,15]
len(mi_lista)
```
4
### range()
Cuando no tenemos una lista y queremos hacer un for “común” y que la variable que cambia sea un número que va incrementándose, podemos utilizar la función range.

En Python los índices comienzan en 0, y por eso los rangos también
```
range(5) #funcion range de 0 hasta 5 (sin incluir el 5)
```
range(0, 5)
```
list(range(5)) #se obtiene una lista de numeros enteros desde 0 hasta 5 (sin incluir el 5)
```
[0, 1, 2, 3, 4]
```
# Si se usa en un FOR no es necesario convertirlo en un a lista
for i in range(5): # Este es el uso mas comun de la funcion range
    print(i)
```
0
1
2
3
4
```
#También se puede comenzar el rango en otro valor en lugar de 0
print("- for de 2 a 5:")
for j in range(2,6): # range de 2 hasta 5
    #aca va el codigo
    print(j)
```
- for de 2 a 5:
    2
    3
    4
    5
# enumerate()
```
mi_lista = ['apple', 'banana', 'grapes', 'pear'] # listado con frutas

# funcion enumerate para obtener el numero de la iteracion 
# y el valor de la lista que estoy iterando

for itera, valor in enumerate(mi_lista): 
    print(f"En la iteracion {itera} tiene el valor asignado de {valor}" )
```
En la iteracion 0 tiene el valor asignado de apple
En la iteracion 1 tiene el valor asignado de banana
En la iteracion 2 tiene el valor asignado de grapes
En la iteracion 3 tiene el valor asignado de pear
NOTA: Se recomienda leer sobre las funciones (map, filter, lambda y reduce) que actuan sobre listas, y que permiten reemplazar los ciclos for

http://www.pythondiario.com/2017/10/programacion-funcional-lambda-map.html

# Metodos
Python permite definir clases y crear objetos de esas clases, pero esos temas están fuera de este tutorial. Los métodos se invocan de la siguiente forma objeto.metodo(parametro1,parametro2,…).

## Metodos en strings
Existen varios tipos de metodos para los strings, estos se utilizan mucho para hacer la preparacion de datos categoricos, para mas informacion:

Metodos completos para strings
```
st = 'Hola mi nombre es Josue'
```
```
len(st) #funcion que determina la longitud de 'st' tambien sirve con listas
```
24
### Metodos de Formato
.lower()
devuelve el string en minusculas
```
st.lower() #devuelve el string en minusculas
```
'hola mi nombre es josue'
```
st # la operacion no es inplace
```
'Hola mi nombre es Josue'
.upper()
devuelve el string en Mayusculas
```
st.upper() #devuelve el string en Mayusculas
```
'HOLA MI NOMBRE ES JOSUE'
```
st # la operacion no es inplace
```
'Hola mi nombre es Josue'
```
.swapcase()
```
una copia de la cadena convertidas las mayúsculas en minúsculas y viceversa.
```
st
```
'Hola mi nombre es Josue'
```
st.swapcase()
```
'hOLA MI NOMBRE ES jOSUE'
```
.capitalize()
```
una copia de la cadena con la primera letra en mayúsculas.
```
st = 'hola mi nombre es josue'
st.capitalize()
```
'Hola mi nombre es josue'

.zfill()
Retorna una copia de la cadena rellena con ceros a la izquierda hasta alcanzar la longitud final indicada.
```
id_upb = '5789'
id_upb.zfill(9)
```
'000005789'
### Metodos de Busqueda
.count()
Retorna un entero representando la cantidad de apariciones de subcadena dentro de cadena
```
st
```
'hola mi nombre es josue'
```
st.count('e') # numero de veces que esta la letra 'e'
```
3
.find()
Retorna: un entero representando la posición donde inicia la subcadena dentro de cadena. Si no la encuentra, retorna -1.
```
st
```
'hola mi nombre es josue'
```
st.find('nombre')
```
8
### Metodos de Sustiticion
.replace()
Reemplazar texto en una cadena
```
'hola mi nombre es josue'.replace('josue','Josue C')
```
'hola mi nombre es Josue C'
```
st.replace('josue','Josue C')
```
'hola mi nombre es Josue'
```
.strip()
```
Eliminar caracteres a la izquierda y derecha de una cadena
```
st_esp = '   hola mi nombre es josue           '# cadena de caracteres con muchos espacios
st_esp
```
'   hola mi nombre es josue           '
```
st_esp.strip()  # Eliminar por predeterminado los espacios de izquierda y derecha
```
'hola mi nombre es josue'
```
st_esp = '------hola mi nombre es josue----'# cadena de caracteres con muchos guiones
st_esp
```
'------hola mi nombre es josue----'
```
st_esp.strip('-')# Eliminar los guiones de izquierda y derecha
```
'hola mi nombre es josue'

.lstrip()
Eliminar caracteres a la izquierda de una cadena

st_esp = 'www.kaggle.com'
st_esp
'www.kaggle.com'
st_esp.lstrip('w.') # Eliminar desde el inicio de la cadena incluido los caracteres definidos
'kaggle.com'
'0000083746'.lstrip('0')
'83746'

.rstrip()
Eliminar caracteres a la derecha de una cadena
```
st_esp.rstrip('.com') # Eliminar desde el inicio de la cadena incluido los caracteres definidos
```
'www.kaggle'

### Metodos de Union y Division
.join()
Retorna la cadena unida con el elemento que se desee
```
formato_numero_factura = ("Nº 0000-0", "-0000 (ID: ", ")")
```
```
numero = "275"
```
```
numero_factura = numero.join(formato_numero_factura) 
numero_factura
```
'Nº 0000-0275-0000 (ID: 275)'


.split()
Retorna una lista con todos elementos encontrados al dividir la cadena por un separador.
```
palabras = "python, guia, curso, tutorial".split(", ") 
palabras
```
['python', 'guia', 'curso', 'tutorial']
```
st
```
'hola mi nombre es jsoue'
```
st.split() #divide el string en 'espacios en blanco por defecto' y devuelve una lista
```
['hola', 'mi', 'nombre', 'es', 'josue']
```
tweet = 'Viva el Rock and Roll! #Musica #Concierto' # creando un string
tweet
```
'Viva el Rock and Roll! #Musica #Concierto'
```
tweet.split('#') # dividir el string y el elemnto de division es #
```
['Viva el Rock and Roll! ', 'Musica ', 'Concierto']
```
tweet.split('#')[1]
```
'Musica '
```
['hola','como','estas']
```
['hola', 'como', 'estas']
```
'hola como estas'.split()
```
['hola', 'como', 'estas']
### Metodos en listas
Existen varios tipos de metodos para las listas, para mas informacion: Metodos completos para listas

 - list.append(x): Agrega un ítem al final de la lista. Equivale a lst[len(lst):] = [x]

 - list.insert(i, x): Inserta un ítem en una posición dada. El primer argumento es el índice del ítem delante del cual se insertará, por lo tanto a.insert(0, x) inserta al principio de la lista, y lst.insert(len(lst), x) equivale a lst.append(x)

 - list.remove(x): Quita el primer ítem de la lista cuyo valor sea x. Es un error si no existe tal ítem.

 - list.pop([i]): Quita el ítem en la posición dada de la lista, y lo devuelve. Si no se especifica un índice, a.pop() quita y devuelve el último ítem de la lista. (Los corchetes que encierran a i en la firma del método denotan que el parámetro es opcional, no que deberías escribir corchetes en esa posición. Verás esta notación con frecuencia en la Referencia de la Biblioteca de Python.)

 - list.clear(): Quita todos los elementos de la lista. Equivalente a del lst[:].

 - list.index(x[, start[, end]]): Devuelve el índice basado de la lista del primer ítem cuyo valor sea x. Levanta una excepción ValueError si no existe tal ítem. Los argumentos opcionales start y end son interpetados como la notación de slicing y se usan para limitar la búsqueda a una subsecuencia particular de la lista. El index retornado se calcula de manera relativa al inicio de la secuencia completa en lugar de con respecto al argumento start.

 - list.count(x): Devuelve el número de veces que x aparece en la lista.

 - list.sort(key=None, reverse=False): Ordena los ítems de la lista in situ (los argumentos pueden ser usados para personalizar el orden de la lista, ve sorted() para su explicación).

 - list.reverse(): Invierte los elementos de la lista in situ.

 - list.copy(): Devuelve una copia superficial de la lista. Equivalente a lst[:].

Las mas usadas son:
```
lst = [8,2,3,45,24,53,785,98,1,3,6,9,2,1] # lista
lst
```
[8, 2, 3, 45, 24, 53, 785, 98, 1, 3, 6, 9, 2, 1]
```
len(lst) # numero de elementos de la lista
```
14
.append(x):
Agrega un ítem al final de la lista. Equivale a lst[len(lst):] = [x]
```
lst.append(37) # Agrega este valro al final de la lista
lst
```
[8, 2, 3, 45, 24, 53, 785, 98, 1, 3, 6, 9, 2, 1, 37]

.pop([i]):
Quita el ítem en la posición dada de la lista, y lo devuelve. Si no se especifica un índice, lst.pop() quita y devuelve el último ítem de la lista. (Los corchetes que encierran a i en la firma del método denotan que el parámetro es opcional, no que deberías escribir corchetes en esa posición. Verás esta notación con frecuencia en la Referencia de la Biblioteca de Python.)
```
aa = lst.pop() # saca el ultimo elemento de la lista, para siempre
aa
```
37
```
lst
```
[8, 2, 3, 45, 24, 53, 785, 98, 1, 3, 6, 9, 2, 1]
```
aa = lst.pop(4) # saca el 4 elemento de la lista, para siempre
aa
```
24
```
lst
```
[8, 2, 3, 45, 53, 785, 98, 1, 3, 6, 9, 2, 1]


.copy():
Devuelve una copia superficial de la lista. Equivalente a list[:]
```
# Hacer una copia de la lista,
new_lst = lst.copy()
new_lst
# tambien puede ser new_lst=lst[:]
```
[8, 2, 3, 45, 53, 785, 98, 1, 3, 6, 9, 2, 1]

.sort(reverse=False):
Ordena los ítems de la lista in situ o inplace
```
lst.sort() #ordena la lista de menor a mayor
lst
```
[1, 1, 2, 2, 3, 3, 6, 8, 9, 45, 53, 98, 785]
```
lst.sort(reverse=True) #ordena la lista de mayor a menor
lst
```
[785, 98, 53, 45, 9, 8, 6, 3, 3, 2, 2, 1, 1]
### Identificar Elementos en la lista
```
'x' in [1,2,3] # identificar si un elemento esta en una lista
```
False
```
'x' in ['x','y','z'] # identificar si un elemento esta en una lista
```
True
# Instalar Paquetes o Librerias
El repositorio Principal de donde se encuentran las librerias de Python es:

Pypi: https://pypi.org/

Si Ha realizado la instalacion con Anaconda, las librerias se encuentran en:

Anaconda Repo - https://anaconda.org/anaconda/repo

## Instalacion en Linea de comando
PIP
pip install [nombre_paquete] #sin corchetes

Ejemplo: pip install pandas

CONDA
Solo si se realizo una instalacion con Anaconda

conda install -c [canal] [nombre_paquete] #sin corchetes

Ejemplo: conda install -c anaconda pandas

Instalacion en Jupyter Notebook
PIP
!python -m pip install [nombre_paquete] #sin corchetes

Usar este para Google Collaboratory

Ejemplo: !python -m pip install pandas

CONDA
!conda install -c [canal] [nombre_paquete] #sin corchetes

Ejemplo: !conda install -c anaconda pandas
