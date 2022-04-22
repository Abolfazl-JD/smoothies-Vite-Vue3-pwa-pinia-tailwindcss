import { ref } from 'vue'

export default function AlertFeedback() {
    const feedback = ref('')
    const showFeedback = (alertText : string) => {
        feedback.value = alertText
        setTimeout(() => {
            feedback.value = ''
        }, 3000);
    }
    return { feedback, showFeedback }
}