import React, { useState, useEffect } from 'react';
import { toast } from '../utils/toast';

const ToastContainer = () => {
    const [toasts, setToasts] = useState([]);
    const [confirmData, setConfirmData] = useState(null);

    useEffect(() => {
        // Subscribe to standard toasts
        const unsubscribeToast = toast.subscribe((message, type) => {
            const id = Date.now() + Math.random();
            setToasts(prev => [...prev, { id, message, type }]);
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, 4000);
        });

        // Subscribe to confirm dialog promises
        const unsubscribeConfirm = toast.subscribeConfirm((message) => {
            return new Promise((resolve) => {
                setConfirmData({ message, resolve });
            });
        });

        return () => {
            unsubscribeToast();
            unsubscribeConfirm();
        };
    }, []);

    const handleConfirmResponse = (value) => {
        if (confirmData) {
            confirmData.resolve(value);
            setConfirmData(null);
        }
    };

    return (
        <>
            {/* TOAST LIST */}
            <div style={{
                position: 'fixed',
                top: '24px',
                right: '24px',
                zIndex: 99999,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                maxWidth: '380px',
                width: '90%',
                pointerEvents: 'none'
            }}>
                {toasts.map(t => {
                    let bg, border, color, icon;
                    if (t.type === 'success') {
                        bg = 'rgba(255, 255, 255, 0.95)';
                        border = '1px solid rgba(16, 185, 129, 0.25)';
                        color = 'var(--text-primary)';
                        icon = (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        );
                    } else if (t.type === 'error') {
                        bg = 'rgba(255, 255, 255, 0.95)';
                        border = '1px solid rgba(239, 68, 68, 0.25)';
                        color = 'var(--text-primary)';
                        icon = (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        );
                    } else {
                        bg = 'rgba(255, 255, 255, 0.95)';
                        border = '1px solid rgba(79, 70, 229, 0.25)';
                        color = 'var(--text-primary)';
                        icon = (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="16" x2="12" y2="12" />
                                <line x1="12" y1="8" x2="12.01" y2="8" />
                            </svg>
                        );
                    }

                    return (
                        <div key={t.id} style={{
                            background: bg,
                            border: border,
                            color: color,
                            padding: '14px 18px',
                            borderRadius: '16px',
                            boxShadow: '0 15px 30px -10px rgba(79, 70, 229, 0.12), 0 5px 15px rgba(0,0,0,0.05)',
                            backdropFilter: 'blur(12px)',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            pointerEvents: 'auto',
                            animation: 'toast-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            transition: 'all 0.3s ease'
                        }}>
                            <div className="d-flex align-items-center justify-content-center bg-dark bg-opacity-5 rounded-circle p-1.5" style={{ flexShrink: 0 }}>
                                {icon}
                            </div>
                            <span style={{ flexGrow: 1, lineHeight: '1.4' }}>{t.message}</span>
                            <button 
                                onClick={() => setToasts(prev => prev.filter(item => item.id !== t.id))}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--text-muted)',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem',
                                    padding: 0,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    transition: 'color 0.2s',
                                    lineHeight: 1
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                            >
                                &times;
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* CONFIRMATION DIALOG MODAL */}
            {confirmData && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 99998,
                    background: 'rgba(15, 23, 42, 0.3)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'fade-in 0.25s ease'
                }}>
                    <div className="card p-4 shadow-lg text-center" style={{
                        maxWidth: '400px',
                        width: '90%',
                        animation: 'modal-zoom-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid rgba(99, 102, 241, 0.12)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.12)'
                    }}>
                        <div className="d-inline-flex align-items-center justify-content-center bg-danger bg-opacity-10 p-3 rounded-circle mb-3 border border-danger border-opacity-20" style={{ width: '56px', height: '56px' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                <line x1="12" y1="9" x2="12" y2="13" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                        </div>
                        <h4 className="fw-bold mb-2 text-dark" style={{ fontSize: '1.25rem' }}>Confirm Action</h4>
                        <p className="text-secondary mb-4" style={{ fontSize: '0.92rem', lineHeight: '1.5' }}>
                            {confirmData.message}
                        </p>
                        <div className="d-flex justify-content-center gap-3">
                            <button 
                                className="btn btn-outline-secondary py-2 px-4" 
                                style={{ borderRadius: '20px', fontSize: '0.85rem' }}
                                onClick={() => handleConfirmResponse(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className="btn btn-danger py-2 px-4" 
                                style={{ borderRadius: '20px', fontSize: '0.85rem' }}
                                onClick={() => handleConfirmResponse(true)}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ToastContainer;
