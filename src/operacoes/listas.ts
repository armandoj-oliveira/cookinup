export function itensListaReceitas(lista1: unknown[], lista2: unknown[]): boolean {
    return lista1.every((itemLista1) => lista2.includes(itemLista1));
}