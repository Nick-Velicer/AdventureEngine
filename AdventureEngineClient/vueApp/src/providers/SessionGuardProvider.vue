<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { extractRouteBase, type ExtractRouteBase, type routes } from '../utils/routes';
import { onMounted, ref } from 'vue'
import { getActiveUser } from '../../../services/custom/AuthenticationService';
import { NCard, NModal } from 'naive-ui';
import Loader from '../components/Loader.vue'; 
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts';
import Button from '../components/Button.vue';

const route = useRoute();
const router = useRouter();
const userQuery = composedAppInjectionContexts.queries.useGetActiveUserQuery();

const showModal = ref(false);
const timeout = ref(5000);

function attemptRedirect() {
    if (route.path.includes("Login") || route.path.includes("Register")) {
        return;
    }

    if (timeout.value <= 0) {
        showModal.value = false;
        timeout.value = 5000;
        router.push('/Login');
    }
    else {
        timeout.value -= 1000;
        setTimeout(attemptRedirect, 1000);
    }
}

</script>

<template>
    <NModal :show="typeof userQuery?.error?.value === 'string' && !(route.path.includes('Login') || route.path.includes('Register'))">
        <NCard
            style="width: 600px"
            title="Session Timeout"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
            @vue:mounted="() => attemptRedirect()"
        >
        <div>
            The user session timed out or was invalidated.
        </div>
        <div>
            Redirecting in {{ timeout / 1000 }}s...
        </div>
        </NCard>
    </NModal>
    <slot></slot>
</template>

<style scoped>
</style>
