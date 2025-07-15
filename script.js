<script>
  document.getElementById('formFede').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const data = {
      nombre: form.nombre.value.trim(),
      edad: form.edad.value.trim(),
      objetivo: form.objetivo.value,
      turno: form.turno.value,
      lesion: form.lesion?.value || "No especificado",
      contacto: form.contacto.value.trim()
    };

    // Construir URL con query params (GET)
    const queryString = new URLSearchParams(data).toString();
    const url = "https://gonzalo420.app.n8n.cloud/webhook/formulario-entrenamiento?" + queryString;

    fetch(url, {
      method: "GET"
    })
      .then(response => response.json())
      .then(res => {
        alert(res.mensaje || "Formulario enviado con éxito!");
        form.reset();
      })
      .catch(error => {
        alert("Error de conexión. Intentá más tarde.");
        console.error(error);
      });
  });
</script>
