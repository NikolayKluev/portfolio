 document.getElementById('contactForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      const resMessage = document.getElementById('response');

      try {
        const response = await fetch('http://localhost:3000/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        resMessage.innerHTML =
          `<p style="color: ${result.status === 'success' ? 'green' : 'red'}">${result.message}</p>`;
        if (result.status === 'success') e.target.reset();
      } catch (error) {
        resMessage.innerHTML = '<p style="color: red">Ошибка сети</p>';
      }

      setTimeout(() => {
        resMessage.innerHTML = '';
      }, 3000)
    });