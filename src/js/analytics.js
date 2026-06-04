(() => {
    const API_URL = 'https://ext.api.boringsoft.io/api/data/event';

    const EXT_ID = 's2_dwnldwspdf';
    // const EXT_ID = 'TEST_boringsoft-io';

    function isDevelopment() {
        const host = window.location.hostname;
        return (
            host === 'localhost' ||
            host === '127.0.0.1' ||
            host.endsWith('.local')
        );
    }

    async function sendAnalytics() {
        try {
            const currentUrl = window.location.href;
            const referrer = document.referrer || 'direct';

            const payload = {
                eventType: 'page-open',
                timestamp: new Date().toISOString(),
                sysLang: navigator.language,
                domain: referrer,
                payload: currentUrl
            };

            if (isDevelopment()) {
                console.log('[Analytics DEV]', payload);
                return;
            }

            await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${EXT_ID}`,
                },
                body: JSON.stringify(payload),
                keepalive: true,
                mode: 'cors'
            });
        } catch (e) {
            console.warn('[Analytics] Failed', e);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', sendAnalytics);
    } else {
        sendAnalytics();
    }
})();
