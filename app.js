const form = document.getElementById('leadForm');
const msg = document.getElementById('formMessage');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.startDate && data.endDate && data.endDate < data.startDate) {
      msg.textContent = 'Please choose an end date after the start date.';
      return;
    }

    msg.textContent = 'Sending your request...';

    try {
      const response = await fetch('https://formspree.io/f/xvkorwor', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        msg.textContent =
          'Thank you! Your quote request was sent successfully. We will contact you soon.';
        form.reset();
      } else {
        msg.textContent =
          'We could not send your request. Please call or text (346) 213-2558.';
      }
    } catch (error) {
      msg.textContent =
        'Connection error. Please call or text (346) 213-2558.';
    }
  });
}
