import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRef, useEffect } from 'react'

const validationSchema = Yup.object().shape({
    email: Yup
        .string()
        .email('Некорректный E-mail')
        .required('Поле обязательное для заполнения'),
    password: Yup
        .string()
        .min(6, 'Пароль должен содержать не меньше 6 символов')
        .required('Поле обязательное для заполнения'),
    confirmPassword: Yup
        .string()
        .oneOf([Yup.ref('password')], 'Пароли не совпадают')
        .required('Поле обязательное для заполнения')
})

export default function RegistrationForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'onChange'
    })

    const submitFormData = (formData) => {
        console.log(formData)
    }

    const buttonRef = useRef(null) 

    useEffect(() => {
        if (isValid) {
            buttonRef.current.focus()
        }
    })

    return (
        <>
            <form onSubmit={handleSubmit(submitFormData)}>
                <label htmlFor="email">
                    <input 
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        {...register('email')}
                    />
                </label>
                {errors.email && (<div style={{ color: "red" }}>{errors.email.message}</div>)}
                <br />
                <br />

                <label htmlFor="password">
                    <input 
                        type="password"
                        name="password"
                        placeholder="Password"
                        {...register('password')}
                    />
                </label>
                {errors.password && (<div style={{ color: "red" }}>{errors.password.message}</div>)}
                <br />
                <br />

                <label htmlFor="confirmPassword">
                    <input 
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        {...register('confirmPassword')}
                    />
                </label>
                {errors.confirmPassword && (<div style={{ color: "red" }}>{errors.confirmPassword.message}</div>)}
                <br />
                <br />

                <button 
                    type='submit'
                    disabled={!isValid}
                    ref={buttonRef}
                >
                    Зарегистрироваться
                </button>
            </form>
        </>
    )
}
