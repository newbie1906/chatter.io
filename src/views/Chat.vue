<template>
    <div>abc</div>
</template>
<script>
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import router from '../router';

export default defineComponent({
    setup() {
        const router = useRouter()
        const getToken = () =>{
            const token = localStorage.getItem('user-token')
            return token ? token : null;
        }
        onMounted(() => {
            const token = getToken()
            if(!token){
                router.push('/login');
            }
        })
    },
})
</script>
