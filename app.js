const form = document.getElementById('leadForm');
const msg = document.getElementById('formMessage');
document.getElementById('year').textContent = new Date().getFullYear();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const leads = JSON.parse(localStorage.getItem('rvBusinessLeads') || '[]');
  leads.push({ ...data, createdAt: new Date().toISOString() });
  localStorage.setItem('rvBusinessLeads', JSON.stringify(leads));
  msg.textContent = 'Request saved. RV Business V1 captured this lead successfully.';
  form.reset();
});
