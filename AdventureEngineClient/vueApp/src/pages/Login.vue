<script setup lang="ts">
import { ref } from 'vue';
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts';
import { NInput, NForm, NButton, NFormItem, useMessage, type FormInst, type FormItemRule, type FormRules, type FormValidationError } from 'naive-ui';
import { loginUser } from '../../../services/custom/AuthenticationService';
import { useRouter } from 'vue-router';
import Loader from '../components/Loader.vue';


const message = useMessage();
const router = useRouter();

const formDefault = {
  username: undefined as string | undefined,
  password: undefined as string | undefined,
};

const loginFormBuffer = ref(formDefault);
const loginPending = ref(false);
const formRef = ref<FormInst | null>(null);

const rules: FormRules = {
    username: [
        {
            required: true,
            validator(rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('A username is required')
                }
                return true;
            },
            trigger: ['input', 'blur']
        }
    ],
    password: [
        {
            required: true,
            message: 'Password is required',
            trigger: ['input', 'blur']
        }
    ],
}

function attemptSubmittal(e: MouseEvent) {
    e.preventDefault();
    formRef.value?.validate((errors: Array<FormValidationError> | undefined) => {
        if (!errors) {
            attemptLogin(loginFormBuffer.value.username!, loginFormBuffer.value.password!);
        }
        else {
            console.log(errors)
            message.error('Invalid Form State')
        }
    });
}

async function attemptLogin(userName: string, password: string) {
    
    loginPending.value = true;
    try {
        await loginUser(userName, password);
        router.push('/Home');
    }
    catch (errors) {
        console.log(errors);
        message.error('Error Logging In');
        loginPending.value = false;
    }
}


</script>

<template>
    <div class="loginFormWrapper">
        <NForm ref="formRef" :model="loginFormBuffer" :rules="rules">
            <NFormItem label="Username" path="username">
                <NInput
                    v-model:value="loginFormBuffer.username"
                    :disabled="loginPending"
                    type="text"
                    placeholder="Username"
                />
            </NFormItem>
            <NFormItem label="Password" path="password">
                <NInput
                    v-model:value="loginFormBuffer.password"
                    :disabled="loginPending"
                    type="password"
                    show-password-on="mousedown"
                    placeholder="Password"
                />
            </NFormItem>
        </NForm>
        <Loader variant="icon" v-if="loginPending"/>
        <div v-else class="flex justify-between w-full">
            <NButton
                round
                type="primary"
                @click="attemptSubmittal"
            >
                Login
            </NButton>
            <RouterLink to="/Register">
                <NButton
                    round
                    type="primary"
                >
                    Register
                </NButton>
            </RouterLink>
        </div>
        
	</div>
</template>

<style scoped>

    .loginFormWrapper {
        max-width: 24rem;
        width: fit-content;
        margin: auto;
    }
</style>
