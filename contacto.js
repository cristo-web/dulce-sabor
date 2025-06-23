document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("form-contacto");

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const nombre = formulario.nombre.value;
    const correo = formulario.correo.value;
    const tipoPastel = formulario.tipo_pastel.value;
    const comentarios = formulario.comentarios.value;

    mostrarToastConfirmacion(nombre, correo, tipoPastel, comentarios);
  });

  // 🔄 NUEVO: Confirmación antes del envío
  function mostrarToastConfirmacion(nombre, correo, tipoPastel, comentarios) {
    const toast = document.createElement('div');
    toast.className = 'toast-exito';
    toast.innerHTML = `
      <div class="toast-body">
        <h3>📋 Confirmar información</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Pastel elegido:</strong> ${tipoPastel}</p>
        <p><strong>Comentario:</strong> ${comentarios || 'Sin comentarios'}</p>
        <p>¿Esta información es correcta?</p>
        <button class="btn-toast-aceptar">Aceptar</button>
        <button class="btn-toast-cancelar">Cancelar</button>
      </div>
    `;
    document.body.appendChild(toast);

    // Si el usuario ACEPTA → enviar
    toast.querySelector('.btn-toast-aceptar').addEventListener('click', () => {
      // Enviar usando EmailJS
      emailjs.sendForm('service_8scpuva', 'template_3zztkpm', formulario)
        .then(() => {
          toast.remove();
          mostrarToastExito(nombre, correo, tipoPastel, comentarios);
          formulario.reset();
        })
        .catch((error) => {
          toast.remove();
          console.error("❌ Error al enviar:", error);
          mostrarToastError();
        });
    });

    // Si el usuario CANCELA → no se envía
    toast.querySelector('.btn-toast-cancelar').addEventListener('click', () => {
      toast.remove();
    });
  }

  function mostrarToastExito(nombre, correo, tipoPastel, comentarios) {
  const toast = document.createElement('div');
  toast.className = 'toast-exito';
  toast.innerHTML = `
      <div class="toast-body">
        <h3>✅ Correo enviado</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Pastel elegido:</strong> ${tipoPastel}</p>
        <p><strong>Comentario:</strong> ${comentarios || 'Sin comentarios'}</p>
        <p>🎉 ¡Tu solicitud fue enviada con éxito!</p>
        <button class="btn-toast">Aceptar</button>
      </div>
    `;
  document.body.appendChild(toast);

  // ✅ Evento correcto
  toast.querySelector('.btn-toast').addEventListener('click', () => {
    toast.remove();
  });
}

  function mostrarToastError() {
    const toast = document.createElement('div');
    toast.className = 'toast-exito'; // Usa mismo estilo pero puedes crear otro si quieres
    toast.innerHTML = `
      <div class="toast-body">
        <h3>❌ Error</h3>
        <p>No se pudo enviar el correo. Intenta nuevamente.</p>
        <button class="btn-toast">Cerrar</button>
      </div>
    `;
    document.body.appendChild(toast);

    toast.querySelector('.btn-toast').addEventListener('click', () => {
    toast.remove();
    });
  }
});
