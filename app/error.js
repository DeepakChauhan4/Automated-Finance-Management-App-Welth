'use client';

import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state to show fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error to an error reporting service here
        console.error('ErrorBoundary caught an error', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Render fallback UI
            return (
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <h1>Something went wrong.</h1>
                    <p>Please try again later.</p>
                </div>
            );
        }

        return this.props.children;
    }
}
