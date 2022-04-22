import { ref } from 'vue'

export default function FormInput(){
    const firstInputForm = ref<HTMLInputElement | null>(null)
    const focusForm = () => {
        setTimeout(() => {
            firstInputForm.value?.focus()
        }, 10)
    }
    return { firstInputForm, focusForm }
}