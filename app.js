const form = document.getElementById('leadForm');
const msg = document.getElementById('formMessage');
document.getElementById('year').textContent = new Date().getFullYear();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  if (data.startDate && data.endDate && data.endDate < data.startDate) {
    msg.textContent = 'Please choose an end date after the start date.';
    return;
  }

  const subject = `RV Quote Request - ${data.name || 'New Customer'}`;
  const body = [
    'Hello J&J Outdoors,',
    '',
    'I would like a quote for an RV rental.',
    '',
    `Name: ${data.name || ''}`,
    `Phone: ${data.phone || ''}`,
    `Email: ${data.email || ''}`,
    `People: ${data.people || ''}`,
    `Start date: ${data.startDate || ''}`,
    `End date: ${data.endDate || ''}`,
    `Trip details: ${data.details || ''}`,
    '',
    'Thank you.'
  ].join('\n');

  // Keep a local backup on the device for demo/testing.
  const leads = JSON.parse(localStorage.getItem('jjOutdoorsLeads') || '[]');
  leads.push({ ...data, createdAt: new Date().toISOString() });
  localStorage.setItem('jjOutdoorsLeads', JSON.stringify(leads));

  msg.textContent = 'Your request is ready. Opening your email app now…';
  window.location.href = `mailto:gorgymanso23@yahoo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
