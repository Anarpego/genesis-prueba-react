# PRUEBA EN REACT

## INSTRUCCIONES DE LA INSTALACIÓN

---

### Clonamos el repositorio e ingresamos al directorio:

```sh
git clone https://github.com/Anarpego/genesis-prueba-react.git
cd cd genesis-prueba-react/cinchos-genesis/
```

### Instalación de las dependencias

```sh
yarn install
```
---

### EJECUTAR LA APLICACIÓN
---

### Iniciar el frontend:

```sh
yarn run dev
```

> Vite inicia el frontend en el puerto 5173 asi que puedes ir a: http://localhost:5173

### Iniciar el servidor:

```sh
node server.cjs
```

> Esto iniciará el servidor en el puerto 3000

---

## OPCIONAL

## BASE DE DATOS (DOCKER)
---

### Se hace RUN/PULL de la imagen:


```sh
docker run --name {cambiar} -d \
    -p 3306:3306 \
    -e MYSQL_ROOT_PASSWORD={cambiar} \
    -v mysql:/var/lib/mysql \
    mysql:8
```

### Se ingresa al contenedor para crear la base de datos:

```sh
docker exec -it {nombre del contenedor} bash
```

### Se crea el archivo con  el scrip de la creación de la base de datos y tablas:

```sh
cat << EOF > {cambiar}.sql
{sql script}
EOF
```

### Se redirecciona al cliente de mysql para la creación de nuestra base de datos:


```sh
mysql -u root -p < {cambiar}.sql 
```

> Se le pedirá su contraseña y ya se podra usar un gestor como Tableplus o entrar desde el cliente para saber que todo se creo correctamente.


---

### DIAGRAMA ER MASTER-DETAIL

![cinchos_genesis_ER](https://github.com/Anarpego/genesis-prueba-react/assets/57972305/861de144-5063-4605-a4ae-f14e8529365f)


---
