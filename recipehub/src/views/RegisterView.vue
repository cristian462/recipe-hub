<template>
    <div class="container-md mt-5">
      <div class="header p-5 pb-4 border-bottom-0">
        <h1 class="fw-bold mb-0 fs-2 mb-4">Registrarse gratuitamente</h1>
      </div>
      <div class="body p-5 pt-0">
        <form @submit.prevent="submitForm" enctype="multipart/form-data">
          <div class="mb-3 d-flex align-items-center justify-content-center flex-column">
            <label for="f_perfil">Selecciona una foto de perfil:</label>
            <input class="d-none" type="file" id="f_perfil" @change="handleFileChange" />
            <label for="f_perfil" class="imagePreviewContainer">
              <img v-if="imagePreview" :src="imagePreview" id="imagePreview" />
            </label>
          </div>

          <div class="container d-flex justify-content-end my-2">
            <small class="text-body-secondary">Los campos con * son obligatorios</small>
          </div>

          <div class="input-group">
            <span class="input-group-text">@</span>
            <div class="form-floating">
              <input type="text" class="form-control" placeholder="Nombre" v-model="formData.nombre" required />
              <label for="nombre">Username</label>
            </div>
          </div>

          <div id="nombreMal" class="mb-3 text-danger mx-5"></div>

          <div class="form-floating">
            <input type="email" class="form-control rounded-3" placeholder="name@example.com" v-model="formData.mail" required />
            <label for="mail">Correo Electrónico*</label>
          </div>

          <div id="mailMal" class="mb-3 text-danger"></div>

          <div class="form-floating">
            <input type="password" class="form-control rounded-3" placeholder="Password" v-model="formData.pass" required />
            <label for="pass">Contraseña*</label>
          </div>

          <div class="mb-3 mx-5-md mx-5-lg">
            La contraseña debe contener: <span id="mayus">1 Mayúscula</span>, <span id="minus">1 minúscula</span>, <span id="num">1 número</span>, <span id="especial">1 carácter especial</span>.
            <span id="longitud">Entre 8 y 16 caracteres</span>
          </div>

          <div class="form-floating">
            <input type="password" class="form-control rounded-3" placeholder="Password" v-model="formData.pass2" required />
            <label for="pass2">Repita Contraseña*</label>
          </div>

          <div id="pass2Mal" class="mb-3 text-danger"></div>

          <button class="w-100 my-2 btn btn-lg rounded-3 btn-primary" type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  </template>

  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        formData: {
          nombre: '',
          mail: '',
          pass: '',
          pass2: '',
        },
        file: null,
        imagePreview: null
      };
    },
    methods: {
      handleFileChange(event) {
        const file = event.target.files[0];
        this.file = file;
        if (file) {
          const reader = new FileReader();
          reader.onload = e => {
            this.imagePreview = e.target.result;
          };
          reader.readAsDataURL(file);
        } else {
          this.imagePreview = null;
        }
      },
      async submitForm() {
        try {
          const formData = new FormData();
          formData.append('nombre', this.formData.nombre);
          formData.append('email', this.formData.mail);
          formData.append('pass', this.formData.pass);
          if (this.file) {
            formData.append('foto', this.file);
          }

          const response = await axios.post('users/register', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  </script>

  <style scoped>
  .imagePreviewContainer {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 20px;
    border: 2px solid #ccc;
    cursor: pointer;
    background-color: #333;
  }
  </style>
