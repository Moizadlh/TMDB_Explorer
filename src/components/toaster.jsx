export default function ToastMessage({ type = 'info', title, message, duration = 4000 }) {
  let toastContainerElement = document.getElementById('toast-container');
  if (!toastContainerElement) {
    toastContainerElement = document.createElement('div');
    toastContainerElement.id = 'toast-container';
    toastContainerElement.className = 'fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none sm:top-6 sm:right-6 max-w-[calc(100vw-2rem)] sm:max-w-sm w-full';
    document.body.appendChild(toastContainerElement);
  }

  const themes = {
    success: {
      wrapper: 'bg-emerald-950/60 border-emerald-500/30',
      iconText: 'text-emerald-400',
      icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
    },
    error: {
      wrapper: 'bg-red-950/60 border-red-500/30',
      iconText: 'text-red-400',
      icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
    },
    info: {
      wrapper: 'bg-indigo-950/60 border-indigo-500/30',
      iconText: 'text-indigo-400',
      icon: `<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
    }
  };

  const currentTheme = themes[type] || themes.info;
  const toastElement = document.createElement('div');
  toastElement.className = `flex items-start p-4 rounded-2xl shadow-2xl backdrop-blur-md border pointer-events-auto transition-all duration-300 translate-x-[120%] opacity-0 ${currentTheme.wrapper}`;

  toastElement.innerHTML = `
    <div class="flex-shrink-0 mr-3 ${currentTheme.iconText}">
      ${currentTheme.icon}
    </div>
    <div class="flex-1 text-sm pt-0.5">
      ${title ? `<h4 class="font-semibold text-white mb-1 tracking-wide">${title}</h4>` : ''}
      <p class="text-slate-300 font-medium leading-relaxed">${message}</p>
    </div>
    <button class="flex-shrink-0 ml-4 text-slate-400 hover:text-white transition-colors focus:outline-none pt-0.5" aria-label="Close">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
  `;

  toastContainerElement.appendChild(toastElement);
  requestAnimationFrame(() => {
    toastElement.classList.remove('translate-x-[120%]', 'opacity-0');
    toastElement.classList.add('translate-x-0', 'opacity-100');
  });
  const closeToastButton = toastElement.querySelector('button');
  const closeToast = () => {
    toastElement.classList.remove('translate-x-0', 'opacity-100');
    toastElement.classList.add('translate-x-[120%]', 'opacity-0');
    setTimeout(() => {
      if (toastElement.parentNode) {
        toastElement.parentNode.removeChild(toastElement);
      }
    }, 300);
  };

  closeToastButton.addEventListener('click', closeToast);
  if (duration > 0) {
    setTimeout(closeToast, duration);
  }
}
