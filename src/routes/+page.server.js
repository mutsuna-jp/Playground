import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export function load() {
    redirect(307, 'https://mutsuna.jp/reserve');
}
