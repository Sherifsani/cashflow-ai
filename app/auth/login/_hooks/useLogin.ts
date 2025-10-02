import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormData {
    email: string;
    password: string;
}

interface FormValidationErrors {
    email?: string;
    password?: string;
    submit?: string;
}

export const useLogin = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errors, setErrors] = useState<FormValidationErrors>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const { email, password } = Object.fromEntries(formData) as unknown as FormData;

        if (!validateForm({ email, password })) return;

        setLoading(true);

        try {
            // Simulate API call for demo
            await new Promise(resolve => setTimeout(resolve, 2000));

            // For demo purposes, accept any valid email/password
            if (email && password.length >= 6) {
                // Store demo token
                localStorage.setItem("token", "demo_token_" + Date.now());
                localStorage.setItem("userEmail", email);

                // Success - redirect to dashboard
                router.push("/dashboard");
            } else {
                throw new Error("Invalid credentials. Please try again.");
            }
        } catch (err) {
            setErrors({ submit: (err as Error).message });
        } finally {
            setLoading(false);
        }
    };

    function validateForm (formData: FormData): boolean {
        const newErrors: FormValidationErrors = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        // Clear error when user starts typing
        if (errors[name as keyof FormValidationErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    return { handleSubmit, handleInputChange, loading, errors, showPassword, setShowPassword }

}