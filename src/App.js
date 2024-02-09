import React, { useState } from "react";
import {
  Formulario,
  Label,
  ContenedorTerminos,
  ContenedorBotonCentrado,
  Boton,
  MensajeExito,
  MensajeError,
} from "./elementos/Formularios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Input from "./componentes/Input";

const App = () => {
  const [usuario, cambiarUsuario] = useState({ campo: "", valido: null });
  const [nombre, cambiarNombre] = useState({ campo: "", valido: null });
  const [password, cambiarPassword] = useState({ campo: "", valido: null });
  const [password2, cambiarPassword2] = useState({ campo: "", valido: null });
  const [correo, cambiarCorreo] = useState({ campo: "", valido: null });
  const [telefono, cambiarTelefono] = useState({ campo: "", valido: null });
  const [terminos, cambiarTerminos] = useState(false);
  const [formularioValido, cambiarFormularioValido] = useState(null);

  const expresiones = {
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, // De 4 a 16 caracteres alfanuméricos, guiones bajos y guiones medios
    nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s']+$/, // Letras y espacios, permitiendo letras acentuadas en español y la letra ñ
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // Al menos una letra mayúscula, una letra minúscula, un número, un carácter especial y al menos 8 caracteres de longitud
    correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Formato de correo electrónico válido
    telefono: /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, // Números de teléfono internacionales, de 7 a 15 dígitos
  };

  const validarPassword2 = () => {
    if (password.campo.length > 0) {
      if (password.campo !== password2.campo) {
        cambiarPassword2((prevState) => {
          return { ...prevState, valido: "false" };
        });
      } else {
        cambiarPassword2((prevState) => {
          return { ...prevState, valido: "true" };
        });
      }
    }
  };

  const onChangeTerminos = (e) => {
    cambiarTerminos(e.target.checked);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      usuario.valido === "true" &&
      nombre.valido === "true" &&
      password.valido === "true" &&
      password2.valido === "true" &&
      correo.valido === "true" &&
      telefono.valido === "true" &&
      terminos
    ) {
      cambiarFormularioValido(true);
      cambiarUsuario({ campo: "", valido: null });
      cambiarNombre({ campo: "", valido: null });
      cambiarPassword({ campo: "", valido: "null" });
      cambiarPassword2({ campo: "", valido: "null" });
      cambiarCorreo({ campo: "", valido: null });
      cambiarTelefono({ campo: "", valido: null });
    } else {
      cambiarFormularioValido(false);
    }
  };

  return (
    <main>
      <Formulario action="" onSubmit={onSubmit}>
        <Input
          estado={usuario}
          cambiarEstado={cambiarUsuario}
          tipo="text"
          label="Usuario"
          placeholder="jonh123"
          name="usuario"
          leyendaError="El usuario no puede contener mas de 15 digitos"
          expresionRegular={expresiones.usuario}
        />

        <Input
          estado={nombre}
          cambiarEstado={cambiarNombre}
          tipo="text"
          label="Nombre"
          placeholder="Santiago solano"
          name="nombre"
          leyendaError="El usuario no puede contener numeros"
          expresionRegular={expresiones.nombre}
        />

        <Input
          estado={password}
          cambiarEstado={cambiarPassword}
          tipo="password"
          label="Password"
          placeholder="Contraseña"
          name="Password"
          leyendaError="// Al menos una letra mayúscula, una letra minúscula, un número, un carácter especial y al menos 8 caracteres de longitud"
          expresionRegular={expresiones.password}
        />

        <Input
          estado={password2}
          cambiarEstado={cambiarPassword2}
          tipo="password"
          label="Password"
          placeholder="Contraseña"
          name="Password2"
          leyendaError="// Al menos una letra mayúscula, una letra minúscula, un número, un carácter especial y al menos 8 caracteres de longitud"
          funcion={validarPassword2}
        />

        <Input
          estado={correo}
          cambiarEstado={cambiarCorreo}
          tipo="email"
          label="Correo"
          placeholder="santiagosolano036@gmail.com"
          name="correo"
          leyendaError="El coreo ingresado no cumple con los formatos correspondientes"
          expresionRegular={expresiones.correo}
        />

        <Input
          estado={telefono}
          cambiarEstado={cambiarTelefono}
          tipo="text"
          label="Telefono"
          placeholder="Telefono"
          name="telefono"
          leyendaError="// Al menos una letra mayúscula, una letra minúscula, un número, un carácter especial y al menos 8 caracteres de longitud"
          expresionRegular={expresiones.telefono}
        />

        <ContenedorTerminos>
          <Label>
            <input
              type="checkbox"
              name="terminos"
              id="terminos"
              checked={terminos}
              onChange={onChangeTerminos}
            />
            Acepto los terminos y condiciones
          </Label>
        </ContenedorTerminos>
        {formularioValido === false && (
          <MensajeError>
            <p>
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <b>Error:</b> Por favor rellena el formulario correctamente.{" "}
            </p>
          </MensajeError>
        )}
        <ContenedorBotonCentrado>
          <Boton type="submit">Enviar</Boton>
          {formularioValido === true && (
            <MensajeExito>Formulario enviado Exitosamente</MensajeExito>
          )}
        </ContenedorBotonCentrado>
      </Formulario>
    </main>
  );
};

// const Formulario = styled.form`
// background: #ccc;
// `;

export default App;
