<template>
  <div class="container">

    <section class="form">
      <form action="" class="text-center">
        <input v-model="nombre" @keyup.enter="crearPaciente" type="text" class="form-control" placeholder="Nombre">
        <input v-model="edad" @keyup.enter="crearPaciente" type="number" placeholder="Edad" class="form-control">

        <input @click="crearPaciente" type="button" value="Añadir" class="btn btn-success">
      </form>
    </section>

    <section class="data">
      <caption>Pacientes</caption>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(paciente, index) in pacientes" :key="paciente.id">
            <td>{{ paciente.id }}</td>
            <td>
              <span v-if="formActualizar && idActualizar === index">

                <input v-model="nombreActualizar" type="text" class="form-control">
              </span>
              <span v-else>
                <!-- Dato nombre -->
                {{ paciente.nombre }}
              </span>
            </td>
            <td>
              <span v-if="formActualizar && idActualizar === index">

                <input v-model="edadActualizar" type="number" class="form-control">
              </span>
              <span v-else>

                {{ paciente.edad }}
              </span>
            </td>
            <td>

              <span v-if="formActualizar && idActualizar === index">
                <button @click="guardarActualizacion(index)" class="btn btn-success">Guardar</button>
              </span>
              <span v-else>

                <button @click="verFormActualizar(index)" class="btn btn-warning">Actualizar</button>

                <button @click="borrarPaciente(index)" class="btn btn-danger">Borrar</button>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { usePacientesStore } from './stores/store';
import { ref, computed } from 'vue';

const store = usePacientesStore();

const nombre = ref('');
const edad = ref('');
const formActualizar = ref(false);
const idActualizar = ref(-1);
const nombreActualizar = ref('');
const edadActualizar = ref('');

const pacientes = computed(() => store.pacientes);

const crearPaciente = () => {
  store.crearPaciente({ nombre: nombre.value, edad: edad.value });
  nombre.value = '';
  edad.value = '';
};

const verFormActualizar = (paciente_id: number) => {
  idActualizar.value = paciente_id;
  nombreActualizar.value = store.pacientes[paciente_id].nombre;
  edadActualizar.value = String(store.pacientes[paciente_id].edad);
  formActualizar.value = true;
};

const borrarPaciente = (paciente_id: number) => {
  store.borrarPaciente(store.pacientes[paciente_id].id);
};

const guardarActualizacion = (paciente_id: number) => {
  store.actualizarPaciente({
    id: store.pacientes[paciente_id].id,
    nombre: nombreActualizar.value,
    edad: parseInt(edadActualizar.value),
  });
  formActualizar.value = false;
};
</script>


<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form {
  margin-bottom: 20px;
}

.form input[type="text"],
.form input[type="number"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

.data table {
  width: 100%;
  border-collapse: collapse;
}

.data table th,
.data table td {
  padding: 10px;
  text-align: left;
}

.data table th {
  background-color: #f0f0f0;
}

.data table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.data table tr:hover {
  background-color: #ddd;
}

.btn {
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
}

.btn-success {
  background-color: #4CAF50;
  color: white;
  border: none;
}

.btn-success:hover {
  background-color: #45a049;
}

.btn-warning {
  background-color: #ff9800;
  color: white;
  border: none;
}

.btn-warning:hover {
  background-color: #e68a00;
}

.btn-danger {
  background-color: #f44336;
  color: white;
  border: none;
}

.btn-danger:hover {
  background-color: #d32f2f;
}
</style>
