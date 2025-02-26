<script lang="ts">
import { obterReceitas } from '@/http';
import type IReceita from '@/interfaces/IReceita';
import BotaoPrincipal from './BotaoPrincipal.vue';
import CardReceitas from './CardReceitas.vue';
import type { PropType } from 'vue';
import { itensListaReceitas } from '@/operacoes/listas';

export default {
    data() {
        return {
            receitasEncontradas: [] as IReceita[]
        };
    },
    async created() {
        try {
            const receitas = await obterReceitas();
            this.receitasEncontradas = receitas.filter((receita) => itensListaReceitas(receita.ingredientes, this.ingredientes));
        } catch (error) {
            console.error("Erro ao buscar receitas:", error);
        }
    },        
    props: {
        ingredientes: { type: Array as PropType<string[]>, required: true}
    },
    components: { BotaoPrincipal, CardReceitas },
    emits: ['editarReceitas']
}
</script>

<template>
    <section class="mostrar-receitas">
        <h1 class="cabecalho titulo-receitas"> Receitas </h1>

        <p class="paragrago-lg resultados-encontrados">
            Resultados Encontrados: {{ receitasEncontradas.length }}
        </p>
        
        <div v-if="receitasEncontradas.length" class="receitas-wrapper">
            <p class="paragrafo-lg informacoes">
                Vejas as opções de receitas que encontramos com os ingredientes que você selecionou!
            </p>

            <ul class="receitas">
                <li v-for="receita of receitasEncontradas" :key="receita.nome">
                    <CardReceitas :receita="receita" />
                </li>
            </ul>
        </div>

        <div v-else class="receitas-nao-encontradas">
            <p class="paragrafo-lg receitas-nao-encontradas__info">
                Ops, não foi possível encontrar receitas para os itens selecionados. Tente novamente.
            </p>

            <img src="../assets/images/sem-receitas.png" alt="Um ovo quebrado, com uma gema com uma exporessão triste.">
        </div>

        <BotaoPrincipal texto="Editar lista" @click="$emit('editarReceitas')" />
    </section>
</template>

<style scoped>
    .mostrar-receitas {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .titulo-receitas {
        color: var(--verde-medio, #3D6D4A);
        margin-bottom: 1.5rem;
    }

    .resultados-encontrados {
        color: var(--verde-medio, #3D6D4A);
        margin-bottom: 0.5rem;
    }

    .receitas-wrapper {
        margin-bottom: 3.5rem;
    }

    .informacoes {
        margin-bottom: 2rem;
    }

    .receitas {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        flex-wrap: wrap;
    }

    .receitas-nao-encontradas {
        margin-bottom: 2rem;
    }

    .receitas-nao-encontradas__info {
        margin-bottom: 0.5rem;
    }

    @media only screen and (max-width: 767px) {
        .receitas-wrapper {
            margin-bottom: 2rem;
        }
    }
</style>