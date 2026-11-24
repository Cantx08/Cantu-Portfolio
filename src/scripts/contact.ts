/**
 * Formulario de contacto: validación en cliente + envío AJAX a Netlify Forms.
 * Netlify procesa cualquier POST url-encoded con `form-name` hacia una ruta estática.
 */

type FieldName = 'name' | 'email' | 'subject' | 'message';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validators: Record<FieldName, (value: string) => string | null> = {
  name: (v) => (v.length < 2 ? 'Ingresa tu nombre (mínimo 2 caracteres).' : null),
  email: (v) => (!v ? 'Ingresa tu email.' : !EMAIL_RE.test(v) ? 'Ingresa un email válido.' : null),
  subject: (v) => (!v ? 'Selecciona el tipo de proyecto.' : null),
  message: (v) => (v.length < 20 ? `Cuéntame un poco más (mínimo 20 caracteres, llevas ${v.length}).` : null),
};

export function initContactForm() {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!form) return;

  const success = document.querySelector<HTMLElement>('[data-form-success]')!;
  const formError = form.querySelector<HTMLElement>('[data-form-error]')!;
  const submitBtn = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const label = form.querySelector<HTMLElement>('[data-submit-label]')!;
  const loading = form.querySelector<HTMLElement>('[data-submit-loading]')!;
  const touched = new Set<FieldName>();

  const getField = (name: FieldName) =>
    form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

  const validateField = (name: FieldName): boolean => {
    const field = getField(name);
    const error = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`)!;
    const message = validators[name](field.value.trim());
    field.setAttribute('aria-invalid', String(!!message));
    error.textContent = message ?? '';
    error.classList.toggle('hidden', !message);
    return !message;
  };

  (Object.keys(validators) as FieldName[]).forEach((name) => {
    const field = getField(name);
    field.addEventListener('blur', () => {
      touched.add(name);
      validateField(name);
    });
    field.addEventListener('input', () => touched.has(name) && validateField(name));
    field.addEventListener('change', () => touched.has(name) && validateField(name));
  });

  const setLoading = (isLoading: boolean) => {
    submitBtn.disabled = isLoading;
    submitBtn.setAttribute('aria-busy', String(isLoading));
    label.hidden = isLoading;
    loading.hidden = !isLoading;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    formError.hidden = true;

    const names = Object.keys(validators) as FieldName[];
    names.forEach((n) => touched.add(n));
    const results = names.map(validateField);
    if (results.includes(false)) {
      getField(names[results.indexOf(false)]).focus();
      return;
    }

    const data = new FormData(form);
    // Honeypot: si un bot lo llenó, fingimos éxito sin enviar
    if (data.get('bot-field')) return showSuccess(String(data.get('name')));

    setLoading(true);
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      showSuccess(String(data.get('name')));
    } catch (err) {
      console.error('[contact] Error al enviar el formulario:', err);
      formError.hidden = false;
    } finally {
      setLoading(false);
    }
  });

  function showSuccess(name: string) {
    const firstName = name.trim().split(/\s+/)[0] || '';
    success.querySelector('[data-success-name]')!.textContent = firstName;
    form!.hidden = true;
    success.hidden = false;
    success.focus();
  }

  success.querySelector('[data-form-reset]')!.addEventListener('click', () => {
    form.reset();
    touched.clear();
    form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
    success.hidden = true;
    form.hidden = false;
    getField('name').focus();
  });
}

export function initCopyEmail() {
  const status = document.querySelector<HTMLElement>('[data-copy-status]');

  document.querySelectorAll<HTMLButtonElement>('[data-copy-email]').forEach((btn) => {
    const idle = btn.querySelector<HTMLElement>('[data-copy-idle]')!;
    const done = btn.querySelector<HTMLElement>('[data-copy-done]')!;
    let timer: number | undefined;

    btn.addEventListener('click', async () => {
      const email = btn.dataset.copyEmail!;
      try {
        await navigator.clipboard.writeText(email);
      } catch {
        // Fallback para navegadores sin Clipboard API o contextos no seguros
        const ta = Object.assign(document.createElement('textarea'), { value: email });
        ta.style.cssText = 'position:fixed;opacity:0';
        document.body.append(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      idle.hidden = true;
      done.hidden = false;
      if (status) status.textContent = 'Email copiado al portapapeles';
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        idle.hidden = false;
        done.hidden = true;
        if (status) status.textContent = '';
      }, 2000);
    });
  });
}
