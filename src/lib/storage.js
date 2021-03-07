let storage = { getItem: () => {}, setItem: () => {} };
let session = { getItem: () => {}, setItem: () => {} };
if (typeof localStorage === 'object') {
    storage = localStorage;
}
if (typeof sessionStorage === 'object') {
    session = sessionStorage;
}
export default storage;
export { session };
