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

    const queryString = new URLSearchParams(data).toString();
    const url = "https://hook.us2.make.com/jnr62ougscwxr2af24cmqs073xyvd5cg?" + queryString;

    fetch(url, {
      method: "GET"
    })
      .then(response => response.ok ? response.json() : Promise.reject("Error"))
      .then(res => {
        alert(res.mensaje || "✅ ¡Formulario enviado con éxito!");
        form.reset();
      })
      .catch(error => {
        alert("❌ No se pudo enviar. Reintentá más tarde o escribile a Fede.");
        console.error(error);
      });
  });
</script>
