import { register } from "module";

export default {
    hello: 'bonjour le monde',
    to: 'sur',
    language: {
        fr: 'français',
        en: 'Anglais',
    },
    auth: {
        loginForm: {
            title: "Se connecter",
            subTitle: "Apprenez à travers les leçons, les compétitions et les entraînements",
            email: "Email",
            password: "Mot de passe",
            passwordPlaceholder: "Votre mot de passe",
            forgotPassword: "Mot de passe oublié?",
            createAccount: "Vous n'avez pas de compte?",
            register: "S'inscrire",
        },
        registerForm: {
            register: "S'inscrire",
            title: "Rejoindre",
            subTitle: "Créez votre compte compety pour découvrir toutes ses fonctionnalités",
            pseudo: "Pseudo",
            pseudoPlaceholder: "Votre pseudo",
            email: "Email",
            password: "Mot de passe",
            passwordPlaceholder: "Votre mot de passe",
            confirmPassword: "Confirmer",
            confirmPasswordPlaceholder: "Confirmez votre mot de passe",
            submit: "S'inscrire",
            haveAccount: "Vous avez déjà un compte?",
            login: "Se connecter",
        },
    }
} as const