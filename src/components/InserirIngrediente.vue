<script lang="ts">
import Tag from './Tag.vue';

export default {
    props: {
        ingrediente: { type: String, required: true }
    },
    data() {
        return {
            selecionado: false
        }
    },
    methods : {
        aoClicar(){
            this.selecionado = !this.selecionado;
            
            if(this.selecionado) {
                this.$emit('adicionarIngrediente', this.ingrediente);
            } else {
                this.$emit('removerIngrediente', this.ingrediente);
            }
        }
    },
    components: { Tag },
    emits: ['adicionarIngrediente', 'removerIngrediente']
}
</script>

<template>
    <button class="ingrediente" 
        @click="aoClicar" 
        :aria-pressed="selecionado"
    >
        <Tag :texto="ingrediente" :ativa="selecionado" />
    </button>
</template>

<style scoped>
    .ingrediente {
        cursor: pointer;
    }
</style>