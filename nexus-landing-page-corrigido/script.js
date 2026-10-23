'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const billingToggle = document.getElementById('billing-toggle');
  const monthlyLabel = document.getElementById('monthly-label');
  const annualLabel = document.getElementById('annual-label');
  const priceStarter = document.getElementById('price-starter');
  const pricePro = document.getElementById('price-pro');
  const periodStarter = document.getElementById('period-starter');
  const periodPro = document.getElementById('period-pro');
  const noteStarter = document.getElementById('note-starter');
  const notePro = document.getElementById('note-pro');

  const prices = {
    monthly: { starter: '39', pro: '89' },
    annual: { starter: '31,20', pro: '71,20' },
  };

  function updateBilling() {
    const annual = billingToggle.checked;
    priceStarter.textContent = annual ? prices.annual.starter : prices.monthly.starter;
    pricePro.textContent = annual ? prices.annual.pro : prices.monthly.pro;
    periodStarter.textContent = annual ? '/mês*' : '/mês';
    periodPro.textContent = annual ? '/mês*' : '/mês';
    noteStarter.textContent = annual ? 'Cobrança anual: R$ 374,40 (simulação).' : 'Cobrança mensal, sem fidelidade.';
    notePro.textContent = annual ? 'Cobrança anual: R$ 854,40 (simulação).' : 'Cobrança mensal, sem fidelidade.';
    monthlyLabel.classList.toggle('active', !annual);
    annualLabel.classList.toggle('active', annual);
  }

  billingToggle.addEventListener('change', updateBilling);

  // Accordion accessible: only one item stays open at a time.
  const faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const currentItem = button.closest('.faq-item');
      const shouldOpen = !currentItem.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach((item) => {
        item.classList.remove('active');
        const trigger = item.querySelector('.faq-question');
        trigger.setAttribute('aria-expanded', 'false');
        item.querySelector('.faq-answer').setAttribute('aria-hidden', 'true');
      });

      if (shouldOpen) {
        currentItem.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
        currentItem.querySelector('.faq-answer').setAttribute('aria-hidden', 'false');
      }
    });
  });

  // Responsive navigation.
  const menuToggle = document.getElementById('menu-toggle');
  const primaryNav = document.getElementById('primary-nav');
  function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    primaryNav.classList.remove('is-open');
  }
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    primaryNav.classList.toggle('is-open', !expanded);
  });
  primaryNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) closeMenu();
  });

  // Demo modal: no backend, no network requests, and no data persistence.
  const modal = document.getElementById('demo-modal');
  const modalPanel = modal.querySelector('.modal-panel');
  const openButtons = document.querySelectorAll('.open-modal');
  const closeButtons = modal.querySelectorAll('[data-close-modal]');
  const selectedPlan = document.getElementById('selected-plan');
  const form = document.getElementById('demo-form');
  const success = document.getElementById('form-success');
  const nameInput = document.getElementById('full-name');
  const emailInput = document.getElementById('email');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  let lastFocusedElement = null;

  function openModal(plan) {
    lastFocusedElement = document.activeElement;
    selectedPlan.textContent = plan || 'Pro';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    window.setTimeout(() => nameInput.focus(), 40);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  openButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      if (button.tagName === 'A') event.preventDefault();
      form.hidden = false;
      success.hidden = true;
      nameError.textContent = '';
      emailError.textContent = '';
      nameInput.removeAttribute('aria-invalid');
      emailInput.removeAttribute('aria-invalid');
      openModal(button.dataset.plan || 'Pro');
    });
  });
  closeButtons.forEach((button) => button.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    if (event.key === 'Tab' && modal.classList.contains('is-open')) {
      const focusable = modalPanel.querySelectorAll('button:not([disabled]), input:not([disabled]), a[href]');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  function showError(input, field, message) {
    input.setAttribute('aria-invalid', 'true');
    field.textContent = message;
  }
  function clearError(input, field) {
    input.removeAttribute('aria-invalid');
    field.textContent = '';
  }
  nameInput.addEventListener('input', () => clearError(nameInput, nameError));
  emailInput.addEventListener('input', () => clearError(emailInput, emailError));

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    clearError(nameInput, nameError);
    clearError(emailInput, emailError);
    if (name.length < 2) {
      showError(nameInput, nameError, 'Digite um nome com pelo menos 2 caracteres.');
      valid = false;
    }
    if (!emailLooksValid) {
      showError(emailInput, emailError, 'Digite um e-mail válido para testar o formulário.');
      valid = false;
    }
    if (!valid) {
      (name.length < 2 ? nameInput : emailInput).focus();
      return;
    }

    // Deliberately local-only for a portfolio demo.
    form.hidden = true;
    success.hidden = false;
    success.querySelector('strong').textContent = `Tudo certo, ${name.split(/\s+/)[0]}!`;
    success.focus();
  });

  document.getElementById('current-year').textContent = String(new Date().getFullYear());
  updateBilling();
});
