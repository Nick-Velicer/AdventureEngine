<script setup lang="ts">
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts';
import { NInput } from 'naive-ui';


const state = composedAppInjectionContexts.store();

</script>

<template>
    <section>
        <n-input
            type="text"
            placeholder="Username"
        />
        <div>
            Some password restrictions!
        </div>
		<n-input
            type="password"
            show-password-on="mousedown"
            placeholder="Password"
        />
        <n-input
            type="password"
            show-password-on="mousedown"
            placeholder="Confirm Password"
        />
        <RouterLink to="/Login">
            Regular Login
        </RouterLink>


	</section>
</template>

<style scoped>

</style>
