<script setup lang="ts">
import { ref } from 'vue';
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts';
import { NInput, NForm, NButton, NFormItem, useMessage, type FormInst, type FormItemRule, type FormRules, type FormValidationError } from 'naive-ui';
import { loginUser } from '../../../services/custom/AuthenticationService';


const message = useMessage();

const formDefault = {
  username: undefined as string | undefined,
  password: undefined as string | undefined,
};

const loginFormBuffer = ref(formDefault);

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
            try {
                loginUser(loginFormBuffer.value.username!, loginFormBuffer.value.password!)
            }
            catch (errors) {
                console.log(errors)
                message.error('Login Error')
            }
            message.success('Valid')
        }
        else {
            console.log(errors)
            message.error('Invalid')
        }
    });
}


</script>

<template>
    <div class="loginFormWrapper">
        <NForm ref="formRef" :model="loginFormBuffer" :rules="rules">
            <NFormItem label="Username" path="username">
                <NInput
                    v-model:value="loginFormBuffer.username"
                    type="text"
                    placeholder="Username"
                />
            </NFormItem>
            <NFormItem label="Password" path="password">
                <NInput
                    key="primaryPassword"
                    v-model:value="loginFormBuffer.password"
                    type="password"
                    show-password-on="mousedown"
                    placeholder="Password"
                />
            </NFormItem>
        </NForm>
        <div class="flex justify-between w-full">
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
