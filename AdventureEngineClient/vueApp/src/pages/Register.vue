<script setup lang="ts">
import { ref } from 'vue';
import { composedAppInjectionContexts } from '../../../injections/composedInjectionContexts';
import { NInput, NForm, NFormItem, type FormItemRule, NButton, type FormInst, type FormValidationError, useMessage, type FormRules } from 'naive-ui';
import type { User } from '../../../types/appTypes/appTypes';
import { registerUser } from '../../../services/custom/AuthenticationService';
import { useRouter } from 'vue-router';
import Loader from '../components/Loader.vue';

const message = useMessage();
const router = useRouter();

//The controlled inputs for user should not be in the store,
//that will be reserved for the active user/session info

const formDefault = {
  username: undefined as string | undefined,
  password: undefined as string | undefined,
  secondaryPassword: undefined as string | undefined
};

const registrationFormBuffer = ref(formDefault);
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
    secondaryPassword: [
        {
            required: true,
            message: 'Re-entered password is required',
            trigger: ['input', 'blur']
        },
        {
            validator(rule: FormItemRule, value: string): boolean {
                return value === registrationFormBuffer.value.password
            },
            message: 'Password is not same as re-entered password!',
            trigger: ['blur', 'password-input']
        }
    ]
}

function attemptSubmittal(e: MouseEvent) {
    e.preventDefault();
    formRef.value?.validate((errors: Array<FormValidationError> | undefined) => {
        if (!errors) {
            attemptRegistration(registrationFormBuffer.value.username!, registrationFormBuffer.value.password!);
        }
        else {
            console.log(errors)
            message.error('Invalid Form State')
        }
    });
}

async function attemptRegistration(userName: string, password: string) {
    
    loginPending.value = true;
    try {
        await registerUser(userName, password);
        router.push('/Home');
    }
    catch (errors) {
        console.log(errors);
        message.error('Error Registering User');
        loginPending.value = false;
    }
}

</script>

<template>
    <div class="registrationFormWrapper">
        <NForm ref="formRef" :model="registrationFormBuffer" :rules="rules">
            <NFormItem label="Username" path="username">
                <NInput
                    v-model:value="registrationFormBuffer.username"
                    :disabled="loginPending"
                    type="text"
                    placeholder="Username"
                />
            </NFormItem>
            <NFormItem label="Password" path="password">
                <NInput
                    key="primaryPassword"
                    v-model:value="registrationFormBuffer.password"
                    :disabled="loginPending"
                    type="password"
                    show-password-on="mousedown"
                    placeholder="Password"
                />
            </NFormItem>
            <NFormItem label="Confirm Password" path="secondaryPassword">
                <NInput
                    key="secondaryPassword"
                    v-model:value="registrationFormBuffer.secondaryPassword"
                    :disabled="!registrationFormBuffer.password || loginPending"
                    type="password"
                    show-password-on="mousedown"
                    placeholder="Confirm Password"
                />
            </NFormItem>
        </NForm>
        <Loader variant="icon" v-if="loginPending"/>
        <div v-else class="flex justify-between w-full">
            <RouterLink to="/Login">
                <NButton
                    round
                    type="primary"
                >
                    Never mind!
                </NButton>
            </RouterLink>
            <NButton
                round
                type="primary"
                @click="attemptSubmittal"
            >
                Register
            </NButton>
        </div>
        
	</div>
</template>

<style scoped>
    .registrationFormWrapper {
        max-width: 24rem;
        width: fit-content;
        margin: auto;
    }
</style>
