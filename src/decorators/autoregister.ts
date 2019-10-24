/**
 * @deprecated since version 3.0.0
 */
export function Autoregister() {
    return (target): any => {
        console.warn(`@Autoregister() decorator has been deprecated (as it's no longer needed) and will be removed in v3.0.0.`);
    };
}
