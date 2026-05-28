class ToastManager {
  listeners = [];
  confirmListener = null;

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  subscribeConfirm(callback) {
    this.confirmListener = callback;
    return () => {
      this.confirmListener = null;
    };
  }

  show(message, type = 'info') {
    this.listeners.forEach(l => l(message, type));
  }

  success(message) {
    this.show(message, 'success');
  }

  error(message) {
    this.show(message, 'error');
  }

  info(message) {
    this.show(message, 'info');
  }

  confirm(message) {
    if (this.confirmListener) {
      return this.confirmListener(message);
    }
    return Promise.resolve(window.confirm(message));
  }
}

export const toast = new ToastManager();
