import { defineStore } from 'pinia';

export const usePacientesStore = defineStore({
  id: 'pacientes',
  state: () => ({
    pacientes: [] as Array<{ id: number; nombre: string; edad: number }>, 
  }),
  actions: {

    crearPaciente(paciente: { nombre: string; edad: string }) {
      this.pacientes.push({
        id: +new Date(),
        nombre: paciente.nombre,
        edad: parseInt(paciente.edad),
      });
    },

    borrarPaciente(id: number) {
      const index = this.pacientes.findIndex((paciente) => paciente.id === id);
      if (index !== -1) {
        this.pacientes.splice(index, 1);
      }
    },

    actualizarPaciente(paciente: { id: number; nombre: string; edad: number }) {
      const index = this.pacientes.findIndex((p) => p.id === paciente.id);
      if (index !== -1) {
        this.pacientes[index].nombre = paciente.nombre;
        this.pacientes[index].edad = paciente.edad;
      }
    },
  },
});
