// Manejo del formulario de reserva

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formFede');
  const turnosOcupados = JSON.parse(localStorage.getItem('turnosOcupados')) || [];

  form.addEventListener('submit', async event => {
    event.preventDefault();

    if (!validarFormulario(form, turnosOcupados)) return;

    const data = recogerDatos(form);

    try {
      const response = await fetch(
        'https://gonzalo420.app.n8n.cloud/webhook/formulario-entrenamiento',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }
      );

      const resData = await response.json();
      alert(resData.mensaje || '¡Formulario enviado con éxito!');

      if (response.ok) {
        turnosOcupados.push(data.turno);
        localStorage.setItem('turnosOcupados', JSON.stringify(turnosOcupados));
        form.reset();
      }
    } catch (error) {
      alert('No se pudo enviar. Reintentá más tarde o escribile a Fede.');
      console.error('Error:', error);
    }
  });
});

function recogerDatos(form) {
  return {
    nombre: form.nombre.value.trim(),
    edad: form.edad.value.trim(),
    objetivo: form.objetivo.value,
    turno: form.turno.value,
    lesion: form.lesion?.value || 'No especificado',
    contacto: form.contacto.value.trim()
  };
}

function validarFormulario(form, turnos) {
  if (!form.nombre.value.trim()) {
    alert('Ingresá tu nombre.');
    return false;
  }

  const edad = form.edad.value.trim();
  if (edad && (edad < 10 || edad > 99)) {
    alert('La edad debe estar entre 10 y 99 años.');
    return false;
  }

  if (!form.objetivo.value) {
    alert('Seleccioná tu objetivo.');
    return false;
  }

  if (!form.turno.value) {
    alert('Elegí un turno.');
    return false;
  }

  if (turnos.includes(form.turno.value)) {
    alert('Ese turno ya está reservado. Por favor elegí otro.');
    return false;
  }

  if (!form.contacto.value.trim()) {
    alert('Ingresá un medio de contacto.');
    return false;
  }

  return true;
}
