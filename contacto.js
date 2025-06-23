document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("form-contacto");

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const nombre = formulario.nombre.value;
    const correo = formulario.correo.value;
    const tipo_pastel = formulario.tipo_pastel.value;
    const comentarios = formulario.comentarios.value;

    emailjs.sendForm('service_8scpuva', 'template_3zztkpm', this)
      .then(() => {
        mostrarToastExito(nombre, correo, tipo_pastel, comentarios);
        formulario.reset();
      })
      .catch((error) => {
        console.error("❌ Error al enviar:", error);
        mostrarToastError();
      });
  });

  function mostrarToastExito() {
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
