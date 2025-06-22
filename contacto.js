document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("form-contacto");

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.sendForm('service_8scpuva', 'template_3zztkpm', this)
      .then(() => {
        mostrarToastExito();
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
      <p>Gracias por contactarnos. Pronto recibirás noticias dulces 🍰</p>
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
