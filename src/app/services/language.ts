import { Injectable, signal, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Language {
  private platformId = inject(PLATFORM_ID);

  private allLanguages = [
    "English",
    "Russian - Русский",
    "Spanish - Español",
    "Italian - Italiano",
    "German - Deutsch",
    "Arabic - عربي",
    "French - Français",
    "Persian - فارسی",
    "Turkish - Türkçe",
    "Hungarian - magyar",
    "Polish - Polski",
    "Portuguese - Português",
    "Czech - čeština",
    "Slovak - Slovák",
    "Indonesian",
    "Vietnamese - Tiếng Việt",
    "Uzbek - o'zbek"
  ];

  private rtlLanguages = ['Arabic - عربي', 'Persian - فارسی'];



  private translations: Record<string, Record<string, string>> = {
    English: {
      Email: "Email",
      Password: "Password",
      "Log In": "Log In",
      Welcome: "Welcome",
      Country: "Country",
      Mobile: "Mobile",
      "to Mission Town": "to Mission Town",
      "Remember me": "Remember me",
      "Forgot password": "Forgot password?",
      "Don't have an account": "Don't have an account?",
      "Sign Up": "Sign Up"
    },
    "Russian - Русский": {
      Email: "Электронная почта",
      Password: "Пароль",
      "Log In": "Войти",
      Welcome: "Добро пожаловать",
      Country: "Страна",
      Mobile: "Мобильный",
      "to Mission Town": "в Mission Town",
      "Remember me": "Запомнить меня",
      "Forgot password": "Забыли пароль?",
      "Don't have an account": "Нет учетной записи?",
      "Sign Up": "Зарегистрироваться"
    },
    "Spanish - Español": {
      Email: "Correo electrónico",
      Password: "Contraseña",
      "Log In": "Iniciar sesión",
      Welcome: "Bienvenido",
      Country: "País",
      Mobile: "Móvil",
      "to Mission Town": "a Mission Town",
      "Remember me": "Recuérdame",
      "Forgot password": "¿Olvidaste tu contraseña?",
      "Don't have an account": "¿No tienes una cuenta?",
      "Sign Up": "Regístrate"
    },
    "Italian - Italiano": {
      Email: "Email",
      Password: "Password",
      "Log In": "Accedi",
      Welcome: "Benvenuto",
      Country: "Paese",
      Mobile: "Cellulare",
      "to Mission Town": "a Mission Town",
      "Remember me": "Ricordami",
      "Forgot password": "Hai dimenticato la password?",
      "Don't have an account": "Non hai un account?",
      "Sign Up": "Iscriviti"
    },
    "German - Deutsch": {
      Email: "E-Mail",
      Password: "Passwort",
      "Log In": "Anmelden",
      Welcome: "Willkommen",
      Country: "Land",
      Mobile: "Handy",
      "to Mission Town": "nach Mission Town",
      "Remember me": "Angemeldet bleiben",
      "Forgot password": "Passwort vergessen?",
      "Don't have an account": "Noch kein Konto?",
      "Sign Up": "Registrieren"
    },
    "Arabic - عربي": {
      Email: "البريد الإلكتروني",
      Password: "كلمة المرور",
      "Log In": "تسجيل الدخول",
      Welcome: "مرحباً",
      Country: "البلد",
      Mobile: "الهاتف المحمول",
      "to Mission Town": "إلى Mission Town",
      "Remember me": "تذكرني",
      "Forgot password": "هل نسيت كلمة المرور؟",
      "Don't have an account": "ليس لديك حساب؟",
      "Sign Up": "سجّل الآن"
    },
    "French - Français": {
      Email: "E-mail",
      Password: "Mot de passe",
      "Log In": "Connexion",
      Welcome: "Bienvenue",
      Country: "Pays",
      Mobile: "Portable",
      "to Mission Town": "à Mission Town",
      "Remember me": "Souviens-toi de moi",
      "Forgot password": "Mot de passe oublié ?",
      "Don't have an account": "Pas de compte ?",
      "Sign Up": "S'inscrire"
    },
    "Persian - فارسی": {
      Email: "ایمیل",
      Password: "رمز عبور",
      "Log In": "ورود",
      Welcome: "خوش آمدید",
      Country: "کشور",
      Mobile: "موبایل",
      "to Mission Town": "به Mission Town",
      "Remember me": "مرا به خاطر بسپار",
      "Forgot password": "رمز عبور را فراموش کرده‌اید؟",
      "Don't have an account": "حساب کاربری ندارید؟",
      "Sign Up": "ثبت نام"
    },
    "Turkish - Türkçe": {
      Email: "E-posta",
      Password: "Şifre",
      "Log In": "Giriş yap",
      Welcome: "Hoşgeldiniz",
      Country: "Ülke",
      Mobile: "Mobil",
      "to Mission Town": "Mission Town'a",
      "Remember me": "Beni hatırla",
      "Forgot password": "Şifrenizi mi unuttunuz?",
      "Don't have an account": "Hesabınız yok mu?",
      "Sign Up": "Kaydol"
    },
    "Hungarian - magyar": {
      Email: "Email",
      Password: "Jelszó",
      "Log In": "Bejelentkezés",
      Welcome: "Üdvözöljük",
      Country: "Ország",
      Mobile: "Mobil",
      "to Mission Town": "a Mission Townhoz",
      "Remember me": "Emlékezz rám",
      "Forgot password": "Elfelejtette a jelszavát?",
      "Don't have an account": "Nincs fiókja?",
      "Sign Up": "Regisztráció"
    },
    "Polish - Polski": {
      Email: "E-mail",
      Password: "Hasło",
      "Log In": "Zaloguj się",
      Welcome: "Witamy",
      Country: "Kraj",
      Mobile: "Telefon",
      "to Mission Town": "do Mission Town",
      "Remember me": "Zapamiętaj mnie",
      "Forgot password": "Nie pamiętasz hasła?",
      "Don't have an account": "Nie masz konta?",
      "Sign Up": "Zarejestruj się"
    },
    "Portuguese - Português": {
      Email: "E-mail",
      Password: "Senha",
      "Log In": "Entrar",
      Welcome: "Bem-vindo",
      Country: "País",
      Mobile: "Celular",
      "to Mission Town": "para Mission Town",
      "Remember me": "Lembrar-me",
      "Forgot password": "Esqueceu a senha?",
      "Don't have an account": "Não tem uma conta?",
      "Sign Up": "Inscrever-se"
    },
    "Czech - čeština": {
      Email: "E-mail",
      Password: "Heslo",
      "Log In": "Přihlásit se",
      Welcome: "Vítejte",
      Country: "Země",
      Mobile: "Mobil",
      "to Mission Town": "do Mission Town",
      "Remember me": "Zapamatovat si mě",
      "Forgot password": "Zapomněli jste heslo?",
      "Don't have an account": "Nemáte účet?",
      "Sign Up": "Zaregistrovat se"
    },
    "Slovak - Slovák": {
      Email: "E-mail",
      Password: "Heslo",
      "Log In": "Prihlásiť sa",
      Welcome: "Vitajte",
      Country: "Krajina",
      Mobile: "Mobil",
      "to Mission Town": "do Mission Town",
      "Remember me": "Zapamätaj si ma",
      "Forgot password": "Zabudli ste heslo?",
      "Don't have an account": "Nemáte účet?",
      "Sign Up": "Zaregistrovať sa"
    },
    Indonesian: {
      Email: "Email",
      Password: "Kata sandi",
      "Log In": "Masuk",
      Welcome: "Selamat datang",
      Country: "Negara",
      Mobile: "Ponsel",
      "to Mission Town": "ke Mission Town",
      "Remember me": "Ingat saya",
      "Forgot password": "Lupa kata sandi?",
      "Don't have an account": "Belum punya akun?",
      "Sign Up": "Daftar"
    },
    "Vietnamese - Tiếng Việt": {
      Email: "Email",
      Password: "Mật khẩu",
      "Log In": "Đăng nhập",
      Welcome: "Chào mừng",
      Country: "Quốc gia",
      Mobile: "Di động",
      "to Mission Town": "đến Mission Town",
      "Remember me": "Ghi nhớ tôi",
      "Forgot password": "Quên mật khẩu?",
      "Don't have an account": "Chưa có tài khoản?",
      "Sign Up": "Đăng ký"
    },
    "Uzbek - o'zbek": {
      Email: "Elektron pochta",
      Password: "Parol",
      "Log In": "Kirish",
      Welcome: "Xush kelibsiz",
      Country: "Mamlakat",
      Mobile: "Mobil",
      "to Mission Town": "Mission Townga",
      "Remember me": "Eslab qol",
      "Forgot password": "Parolingizni unitdingizmi?",
      "Don't have an account": "Hisobingiz yo‘qmi?",
      "Sign Up": "Ro‘yxatdan o‘tish"
    }
  };



  private currentLang = signal<string>('English');
  private currentDirection = signal<'ltr' | 'rtl'>('ltr');


  constructor() {
    const savedLang = this.safeGetLocalStorage('app_lang');
    const savedDir = this.safeGetLocalStorage('app_dir');

    if (savedLang && this.allLanguages.includes(savedLang)) {
      this.currentLang.set(savedLang);
    }

    if (savedDir === 'rtl' || savedDir === 'ltr') {
      this.currentDirection.set(savedDir as 'rtl' | 'ltr');
    } else {
      this.setDirectionByLanguage(this.currentLang());
    }

    this.applyDirection(this.currentDirection());

  }

  get languages() {
    return this.allLanguages;
  }

  get currentLanguage() {
    return this.currentLang();
  }

  get direction() {
    return this.currentDirection();
  }

  setLanguage(lang: string) {
    if (this.allLanguages.includes(lang)) {
      this.currentLang.set(lang);
      this.safeSetLocalStorage('app_lang', lang);
      this.setDirectionByLanguage(lang);
    }
  }

  private setDirectionByLanguage(lang: string) {
    const isRTL = this.rtlLanguages.includes(lang);
    const dir = isRTL ? 'rtl' : 'ltr';
    this.currentDirection.set(dir);
    this.safeSetLocalStorage('app_dir', dir);
    this.applyDirection(dir);
  }

  private applyDirection(dir: 'ltr' | 'rtl') {
    if (isPlatformBrowser(this.platformId)) {
      const htmlTag = document.documentElement;
      htmlTag.setAttribute('dir', dir);
      htmlTag.setAttribute('lang', this.currentLang());
      document.body.style.direction = dir;
    }
  }

  translate(key: string): string {
    const lang = this.currentLang();
    return this.translations[lang]?.[key] ?? key;
  }

  private safeGetLocalStorage(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    }
    return null;
  }

  private safeSetLocalStorage(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(key, value);
      } catch {
        console.warn('Unable to access localStorage');
      }
    }
  }
}